import React, { useState, useEffect} from "react";
import "./itemList.css";
import Spinner from "../spinner/spinner";


function ItemList({getData, onItemSelected, renderItem}) {
    //!Переработка нашего ItemList с помощью Hooks
    const [itemList, updateList] = useState([]);
    //Добавляем состояние, которое было раньше в state

    useEffect(() => {
        //getData мы теперь вытягиваем из props в аргументах функции
        //?Данный хук заменяет нам componentDidMount() в классовом компоненте
        getData().then((data) => {
            updateList(data); //при помощи этой функции будем изменять данные
                              // которые есть в itemList
        });
    }, []); //Передаем пустой массив во второй аргумент. Это говорит что эффект
            // нужно сделать во время появления эффекта и его исчезновения

    function renderItems(arr) {
        return arr.map((item) => {
            const {id} = item;
            const label = renderItem(item);
            return (
                <li
                    key={Math.random()}
                    className="list-group-item"
                    onClick={() => {
                        onItemSelected(id);
                    }}
                >
                    {label || "No info in API data"}
                </li>
            );
        });
    }

    if (!itemList) {
        return <Spinner/>;
    }
    const items = renderItems(itemList);
    return <ul className="item-list list-group"> {items} </ul>;
}

export default ItemList;
