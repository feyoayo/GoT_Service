import React, { Component } from "react";
import "./ItemDetails.css";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/errorMessage";

const Field = ({ item, field, label }) => {
  return (
    <li className="list-group-item d-flex justify-content-between">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  );
};
export { Field };

export default class ItemDetails extends Component {
  state = {
    item: null,
    loading: true,
    error: false,
  };

  componentDidMount() {
    //! Хук проверят что наш компонент запустился есть еще unmount который говорит о том что компонент закончился
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    //! Хук проверяет что компонент обновился, запустился setState
    //Принимает в себя prevProps (предыдущие пропсы) и их мы проверим на соответствие тем просам что пришли к нам сейчас
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    }
  }
  componentDidCatch() {
    this.setState({
      item: null,
      error: true,
    });
  }
  onItemDetailsLoaded = (item) => {
    this.setState({
      item,
      loading: false,
    });
  };
  updateItem() {
    const { getData, itemId } = this.props;
    if (!itemId) {
      return;
    }

    this.setState({
      loading: true,
    });

    getData(itemId).then(this.onItemDetailsLoaded);
    //this.gotService.getCharacter(charId)
  }

  render() {
    //Проверим что у нас есть данные, если нет то вернем компонент  с ошибкой
    if (!this.state.item && this.state.error) {
      return <ErrorMessage />;
    }

    //Проверим что стейт загрузки изменился. Если не изменился то будет показывать Спиннер пока не будут получены данные
    if (this.state.loading) {
      return (
        <div className="item-details rounded">
          <Spinner />
        </div>
      );
    }

    const { item } = this.state;
    const { name } = item;
    return (
      <div className="item-details rounded">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          {React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, { item });
          })}
        </ul>
      </div>
    );
  }
}
