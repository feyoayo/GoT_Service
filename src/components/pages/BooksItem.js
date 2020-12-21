import React from "react";
import GotService from "../../services/gotService";
import ItemDetails, { Field } from "../ItemDetails";

export default class BooksItem extends React.Component {
  gotService = new GotService();
  render() {
    console.log(this.props);
    return (
      <ItemDetails itemId={this.props.bookId} getData={this.gotService.getBook}>
        <Field field="publisher" label="Publisher" />
        <Field field="released" label="Released" />
        <Field field="numberOfPages" label="Number of pages" />
      </ItemDetails>
    );
  }
}
