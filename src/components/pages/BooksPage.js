import React, { Component } from "react";
import ItemList from "../ItemList";
import ErrorMessage from "../errorMessage/errorMessage";
import GotService from "../../services/gotService";
import RowBlock from "../RowBlock/rowBlock";
import ItemDetails, { Field } from "../ItemDetails";

export default class BooksPage extends Component {
  gotService = new GotService();
  state = {
    selectedBook: 1,
    error: false,
  };
  onItemSelected = (id) => {
    this.setState({
      selectedBook: id,
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
        getData={this.gotService.getAllBooks}
        renderItem={({ name }) => `${name}`}
      />
    );

    const bookDetails = (
      <ItemDetails
        itemId={this.state.selectedBook}
        getData={this.gotService.getBook}
      >
        <Field field="publisher" label="Publisher" />
        <Field field="released" label="Released" />
        <Field field="numberOfPages" label="Number of pages" />
      </ItemDetails>
    );

    return <RowBlock left={itemList} right={bookDetails} />;
  }
}
