import React from "react";
import { Col, Row, Container } from "reactstrap";
import Header from "../header";
import RandomChar from "../randomChar";
import "./app.css";
import ErrorMessage from "../errorMessage/errorMessage";
import CharacterPage from "../characterPage/characterPage";
import GotService from "../../services/gotService";
import ItemList from "../itemList";
import CharDetails from "../charDetails";

export default class App extends React.Component {
  gotService = new GotService();

  state = {
    showRandomChar: true,
    error: false,
  };
  componentDidCatch() {
    console.log("error");
    this.setState({
      error: true,
    });
  }

  toggleRandomHandler = () => {
    const { showRandomChar } = this.state;
    this.setState({
      showRandomChar: !showRandomChar,
    });
  };

  render() {
    const { showRandomChar } = this.state;
    const TogglerButton = () => {
      return (
        <button className="toggler-button" onClick={this.toggleRandomHandler}>
          Toggle this container
        </button>
      );
    };
    const toggleButton = showRandomChar ? <RandomChar /> : null;

    if (this.state.error) {
      return <ErrorMessage />;
    }
    return (
      <>
        <Container>
          <Header />
        </Container>
        <Container>
          <Row>
            <Col lg={{ size: 5, offset: 0 }}>
              <TogglerButton />
              {toggleButton}
            </Col>
          </Row>
          <CharacterPage />
          <Row>
            <Col md="6">
              <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllBooks}
                renderItem={(item) => item.name}
              />
            </Col>
            <Col md="6">
              <CharDetails charId={this.state.selectedChar} />
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllHouses}
                renderItem={(item) => item.name}
              />
            </Col>
            <Col md="6">
              <CharDetails charId={this.state.selectedChar} />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
