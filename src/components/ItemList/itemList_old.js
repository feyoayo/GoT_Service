import React, { Component, useState, useEffect } from "react";
import "./itemList.css";
import GotService from "../../services/gotService";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/errorMessage";

class ItemList_old extends Component {
  gotService = new GotService();

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
    const { data } = this.props;
    return <ul className="item-list list-group">{this.renderItems(data)}</ul>;
  }
}

const withData = (View) => {
  return class extends React.Component {
    state = {
      //Создаем начальное значение чтобы сюда из промиса можно было затем передать список итемов
      data: null,
      error: false,
    };

    componentDidMount() {
      const { getData } = this.props;
      //Вместо прямого вызова нашего сервиса, чтобы не дублировать передаем уровнем выше через пропс функцию, в которой уже вызываем необходимый сервис ( книги, персонажи, дома), ну а дальше работаем с ней, как с обычным промисом
      getData().then((data) => {
        this.setState({ data });
      });
    }
    componentDidCatch() {
      //хук который обрабатывает ошибки
      this.setState({
        error: true,
      });
    }

    render() {
      const { data, error } = this.state;
      if (error) {
        return <ErrorMessage />;
      }

      if (!data) {
        return (
          <ul className="item-list list-group">
            <li className="list-group-item">
              <Spinner />
            </li>
          </ul>
        );
      }
      return <View {...this.props} data={data} />;
    }
  };
};

withData(ItemList_old);