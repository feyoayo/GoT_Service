import React from "react";
import "./ItemDetails.css";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/errorMessage";

const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    );
};
export {Field};

const ItemDetails = (props) => {

    const [item, setItem] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false)

    const {getData, itemId} = props


    const kostyl = [itemId]

    const updateItem = () => {
        getData(itemId)
            .then((res) => setItem(res))
            .catch(() => setError(true))
            .finally(() => setLoading(false))
    }

    React.useEffect(() => {
        updateItem()
    }, kostyl)


    if (!itemId) {
        setLoading(true)
    }
    if (loading) {
        return (
            <Spinner/>
        );
    }
    //Проверим что у нас есть данные, если нет то вернем компонент  с ошибкой
    if (!item && error) {
        return <ErrorMessage/>;
    }


    return (
        <div className="item-details rounded">
            <h4>{item.name}</h4>
            <ul className="list-group list-group-flush">
                {React.Children.map(props.children, (child) => {
                    return React.cloneElement(child, {item})
                })}
            </ul>
        </div>
    );

}

export default ItemDetails;
