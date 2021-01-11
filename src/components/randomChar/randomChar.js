import React, { useState, useEffect, useMemo } from "react";
import GotService from "../../services/gotService";
import ErrorMessage from "../errorMessage/errorMessage";
import Spinner from "../spinner/spinner";
import "./randomChar.css";

function RandomChar() {
  const gotService = useMemo(() => new GotService(), []);
  const [char, setChar] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const updateChar = () => {
    const id = Math.floor(Math.random() * 140 + 25); //Получаем id персонажа в определенных промежутках чисел
    gotService
      .getCharacter(id)
      .then((char) => setChar(char))
      //! Выше была ошибка, надо быть внимательнее. then сначала принимает аргумент (char) а затем => setChar(char) устанавливаем в стейт его
      //Передал функцию без
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    updateChar();
    let timer = setInterval(updateChar, 5000);
    //!И тут была ошибка. Передал просто setChar - т.е передал setState, а надо функцию которая конкретно будет отрисовывать на странице то, что мне необходимо первым аргументом, и как часто (5сек в моем случае), вторым аргументом

    return () => {
      clearInterval(timer);
    };
  }, []);

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
  if (error) return <ErrorMessage />;
  return (
    <div className="random-block rounded">
      {loading ? <Spinner /> : <View char={char} />}
    </div>
  );
}

export default RandomChar;
