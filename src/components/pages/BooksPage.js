import React, { Component } from "react";
import ItemList from "../ItemList";
import ErrorMessage from "../errorMessage/errorMessage";
import GotService from "../../services/gotService";
import { withRouter } from "react-router-dom";

class BooksPage extends Component {
  gotService = new GotService();
  state = {
    error: false,
  };

  componentDidCatch() {
    //! хук который обрабатывает ошибки в нашем приложении. Если происходит
    // ошибка то можно отрубить текущий компонент вместо всего приложения
    this.setState({
      error: true,
    });
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }

    //Возвращаем только список книг, для того, чтобы по клику на них
    // происходил роутенг на страницу книги
    return (
      <ItemList
        onItemSelected={(itemId) => {
          this.props.history.push(`/books/${itemId}`);
        }}
        getData={this.gotService.getAllBooks}
        renderItem={({ name }) => `${name}`}
      />
    );
  }
}

export default withRouter(BooksPage);
