import React, { Component } from "react";
import "./itemList.css";
import GotService from "../../services/gotService";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/errorMessage";

export default class ItemList extends Component {
  gotService = new GotService();

  state = {
    //Создаем начальное значение чтобы сюда из промиса можно было затем передать список итемов
    itemList: null,
    error: false,
  };

  componentDidMount() {
    const { getData } = this.props;

    //Вместо прямого вызова нашего сервиса, чтобы не дублировать передаем уровнем выше через пропс функцию, в которой уже вызываем необходимый сервис ( книги, персонажи, дома), ну а дальше работаем с ней, как с обычным промисом
    getData().then((itemList) => {
      this.setState({ itemList });
    });
  }

  componentDidCatch() {
    //хук который обрабатывает ошибки
    this.setState({
      error: true,
    });
  }

  renderItems(arr) {
    //Будем брать массив данных полученных из сервиса. Рендерит элементы на странице
    return arr.map((item) => {
      const { id } = item;
      const label = this.props.renderItem(item);
      return (
        <li
          key={Math.random()}
          className="list-group-item"
          onClick={() => {
            this.props.onItemSelected(id);
          }}
        >
          {label || "No info in API data"}
        </li>
      );
    });
  }

  render() {
    const { itemList, error } = this.state;
    if (error) {
      return <ErrorMessage />;
    }

    if (!itemList) {
      return (
        <ul className="item-list list-group">
          <li className="list-group-item">
            <Spinner />
          </li>
        </ul>
      );
    }
    return (
      <ul className="item-list list-group">{this.renderItems(itemList)}</ul>
    );
  }
}
