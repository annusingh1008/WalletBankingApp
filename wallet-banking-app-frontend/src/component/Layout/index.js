import React from "react";
import Header from "../Header";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./style.css";

const Layout = (props) => {
  return (
    <>
      <Header />
      {props.sidebar ? (
        <Container fluid>
          <Row>
            <Col md={3} className="sidebar">
              <ul>
                <li>
                  <NavLink exact to={`/`}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/recharge`}>Recharge Wallet</NavLink>
                </li>
                <li>
                  <NavLink to={`/transfer`}>Amount Transfer</NavLink>
                </li>
                <li>
                  <NavLink to={`/transactions`}>Account Statement</NavLink>
                </li>

                <li>
                  <NavLink to={`/cashback`}>Cashback</NavLink>
                </li>
                <li>
                  <NavLink to={`/checkBalance`}>Check Balance</NavLink>
                </li>
              </ul>
            </Col>
            <Col md={10} style={{ marginLeft: "50px", paddingTop: "60px" }}>
              {props.children}
            </Col>
          </Row>
        </Container>
      ) : (
        props.children
      )}
    </>
  );
};

export default Layout;
