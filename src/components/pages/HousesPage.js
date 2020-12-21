import React, { Component } from "react";
import ItemList from "../ItemList";
import ErrorMessage from "../errorMessage/errorMessage";
import GotService from "../../services/gotService";
import RowBlock from "../RowBlock/rowBlock";
import ItemDetails, { Field } from "../ItemDetails";

export default class HousesPage extends Component {
  gotService = new GotService();
  state = {
    selectedHouse: 1,
    error: false,
  };
  onItemSelected = (id) => {
    this.setState({
      selectedHouse: id,
    });
  };

  componentDidCatch() {
    //! хук который обрабатывает ошибки в нашем приложении. Если происходит ошибка то можно отрубить текущий компонент вместо всего приложения
    this.setState({
      error: true,
    });
  }
  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }

    const itemList = (
      <ItemList
        onItemSelected={this.onItemSelected}
        getData={this.gotService.getAllHouses}
        renderItem={({ name }) => `${name}`}
      />
    );

    const houseDetails = (
      <ItemDetails
        itemId={this.state.selectedHouse}
        getData={this.gotService.getHouse}
      >
        <Field field="region" label="Region" />
        <Field field="words" label="Words" />
        <Field field="titles" label="Titles" />
      </ItemDetails>
    );

    return <RowBlock left={itemList} right={houseDetails} />;
  }
}
