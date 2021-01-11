import React, { Component } from "react";
import GotService from "../../services/gotService";
import ErrorMessage from "../errorMessage/errorMessage";
import Spinner from "../spinner/spinner";
import "./randomChar.css";

export default class RandomChar extends Component {
  gotService = new GotService();
  //Новый формат
  state = {
    char: {},
    loading: true,
    error: false,
  };

  componentDidMount() {
    //Когда будет создан конструктор, сразу произойдет вызов updateChar
    this.updateChar();

    //? Вызываем наш апдейт каждые полторы секунды. Чтобы не терять контекст updateChar превращаем в стрелочную функцию
    this.timerId = setInterval(this.updateChar, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  onCharLoaded = (char) => {
    this.setState({ char, loading: false });
  };

  onError = (err) => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  updateChar = () => {
    const id = Math.floor(Math.random() * 140 + 25); //от 25 до 140. Не берем первые 10 т.к в АПИ не заполнена информация по первым 10 персонажам
    //Вызываем наш конструктор, с функцией необходимой для поиска персонажей, в нее передаем наш ID. Получаем
    // промис. Методом then мы его обрабатnpываем и устанавливаем состояние нашего обьекта куда передаем необходимые
    // элементы
    this.gotService
      .getCharacter(id)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  render() {
    // Вытаскиваем значения из state
    const { char, loading, error } = this.state;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View char={char} /> : null;
    return (
      <div className="random-block rounded">
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}

const View = ({ char }) => {
  const { name, gender, born, died, culture } = char;
  return (
    <>
      <h4>Random Character: {name || "Api got no info"}</h4>
      <ul className="list-group list-group-flush">
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Gender </span>
          <span>{gender}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Born </span>
          <span>{born || "no info"}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Died </span>
          <span>{died || "no information"}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Culture </span>
          <span>{culture || "Api got no info"}</span>
        </li>
      </ul>
    </>
  );
};
