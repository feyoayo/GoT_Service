import React from "react";
import { Col, Row, Container } from "reactstrap";
import Header from "../header";
import RandomChar from "../randomChar";
import "./app.css";
import ErrorMessage from "../errorMessage/errorMessage";
import GotService from "../../services/gotService";
import CharacterPage from "../pages/СharacterPage";
import BooksPage from "../pages/BooksPage";
import HousesPage from "../pages/HousesPage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import BooksItem from "../pages/BooksItem";

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
    const ToggleButton = () => {
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
      <Router>
        <div className="app">
          <Container>
            <Header />
          </Container>
          <Container>
            <Row>
              <Col lg={{ size: 5, offset: 0 }}>
                <ToggleButton />
                {toggleButton}
              </Col>
            </Row>
            <Route path="/characters" component={CharacterPage} />
            <Route path="/houses" component={HousesPage} />
            <Route path="/books" exact component={BooksPage} />
            <Route
              path="/books/:id"
              render={({ match }) => {
                console.log(match.params.id);
                const id = match.params.id;
                return <BooksItem bookId={id} />;
              }}
            />
          </Container>
        </div>
      </Router>
    );
  }
}
