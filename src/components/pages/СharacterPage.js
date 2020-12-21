import React, { Component } from "react";
import ItemList from "../ItemList";
import ErrorMessage from "../errorMessage/errorMessage";
import GotService from "../../services/gotService";
import RowBlock from "../RowBlock/rowBlock";
import ItemDetails, {Field} from "../ItemDetails";

export default class CharacterPage extends Component {
  gotService = new GotService();
  state = {
    selectedChar: 130,
    error: false,
  };
  onItemSelected = (id) => {
    this.setState({
      selectedChar: id,
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
        getData={this.gotService.getAllCharacters}
        renderItem={({ name, gender }) => `${name} (${gender})`}
      />
    );

    const charDetails = (
        <ItemDetails
            itemId={this.state.selectedChar}
            getData={this.gotService.getCharacter}
        >
          <Field field="gender" label='Gender' />
          <Field field="born" label='Born' />
          <Field field="died" label='Died' />
          <Field field="culture" label='Culture' />
        </ItemDetails>
    );

    return <RowBlock left={itemList} right={charDetails} />;
  }
}
