import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const MainPage = styled.div`
  padding: 10px;
  width: 70%;
  background: white;
  margin: 0 auto;
`;

const LinksList = styled.li`
  list-style-type: none;
  color: teal;
  font-size: 30px;
`;

const HomePage = () => {
  return (
    <MainPage className="list-group">
      <h1>Welcome to Game of Thrones Data Base</h1>
      <h2>Lorem ipsum dolor sit amet.</h2>
      <ul>
        <Link to="/books">
          <LinksList>Books about GOT</LinksList>
        </Link>
        <Link to="/houses">
          <LinksList>Houses in GOT</LinksList>
        </Link>
        <Link to="/characters">
          <LinksList>All charachers in GOT</LinksList>
        </Link>
      </ul>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aut,
        earum esse in iusto nisi optio repellendus saepe veritatis voluptatibus?
      </p>
    </MainPage>
  );
};

export default HomePage;
