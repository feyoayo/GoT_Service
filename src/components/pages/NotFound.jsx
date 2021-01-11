import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NotFoundBlock = styled.div`
  margin: 0 auto;
  color: white;
  width: 70%;
`;

const NotFound = () => {
  return (
    <NotFoundBlock className="list-group">
      <h2>Sorry, you travel to unavailable page, check the other ones</h2>
      <Link to="/">
        <button className="btn btn-info">Homepage</button>
      </Link>
    </NotFoundBlock>
  );
};

export default NotFound;
