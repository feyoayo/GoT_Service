import React, { Component } from "react";
import "./charDetails.css";
import GotService from "../../services/gotService";
import Spinner from "../spinner/spinner";
import CharTemplate from "./charTemplate";
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

export default class CharDetails extends Component {
  gotService = new GotService();

  state = {
    char: null,
    loading: true,
    error: false,
  };

  componentDidMount() {
    //! Хук проверят что наш компонент запустился есть еще unmount который говорит о том что компонент закончился
    this.updateChar();
  }

  componentDidUpdate(prevProps) {
    //! Хук проверяет что компонент обновился, запустился setState
    //Принимает в себя prevProps (предыдущие пропсы) и их мы проверим на соответствие тем просам что пришли к нам сейчас
    if (this.props.charId !== prevProps.charId) {
      this.updateChar();
    }
  }
  componentDidCatch() {
    this.setState({
      char: null,
      error: true,
    });
  }
  onCharDetailsLoaded = (char) => {
    this.setState({
      char,
      loading: false,
    });
  };
  updateChar() {
    const { charId } = this.props;
    if (!charId) {
      return;
    }

    this.setState({
      loading: true,
    });

    this.gotService.getCharacter(charId).then(this.onCharDetailsLoaded);
  }

  render() {
    //Проверим что у нас есть данные, если нет то вернем компонент  с ошибкой
    if (!this.state.char && this.state.error) {
      return <ErrorMessage />;
    }

    //Проверим что стейт загрузки изменился. Если не изменился то будет показывать Спиннер пока не будут получены данные
    if (this.state.loading) {
      return (
        <div className="char-details rounded">
          <Spinner />
        </div>
      );
    }
    console.log(this.state.char);

    return (
      <div className="char-details rounded">
        {/* <CharTemplate charInfo={this.state.char} /> */}
        <h4>{this.state.char.name}</h4>
        <ul className="list-group list-group-flush">{this.props.children}</ul>
      </div>
    );
  }
}
