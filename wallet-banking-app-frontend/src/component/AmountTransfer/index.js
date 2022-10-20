import React, { useState } from "react";
import Layout from "../Layout";
import { Row, Col, Container, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { amountTransfer } from "../../actions/amountTransfer.action";
import { getBalance } from "../../reducers/balance.reducer";

const AmountTransfer = () => {
  const [amount, setAmount] = useState();
  const [email, setEmail] = useState("");
  const [amountErr, setAmountErr] = useState("");
  const [isAmountSufficient, setIsAmountSufficient] = useState("");

  const dispatch = useDispatch();
  const balance = useSelector(getBalance);
  const userEmail = localStorage.getItem("email");

  const confirmAmountTransfer = (e) => {
    e.preventDefault();
    if (amount <= 0) {
      setIsAmountSufficient("");
      setAmountErr("Please enter a valid amount");
    } else if (amount > balance.amount) {
      setAmountErr("");
      setIsAmountSufficient("Insufficient Amount");
    } else {
      const amountDetails = {
        email: userEmail,
        amount: amount,
        creditToEmail: email,
        currentAmount: balance.amount,
      };
      dispatch(amountTransfer(amountDetails));
    }
  };

  return (
    <Layout sidebar>
      <Container className="container">
        <Row md={12}>
          <Col>
            <div className="heading">Transfer Amount</div>
            <Form
              data-testid="form"
              className="form"
              onSubmit={(e) => confirmAmountTransfer(e)}
            >
              <label>Email</label>
              <br />

              <input
                data-testid="emailInputBox"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              ></input>
              <br />

              <label>Amount</label>
              <br />

              <input
                data-testid="amountInputBox"
                type="text"
                placeholder="1000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              ></input>
              <br />
              {amountErr && (
                <p data-testid="error-msg" className="text-danger">
                  {amountErr}
                </p>
              )}
              {isAmountSufficient && (
                <p data-testid="insufficient-amount" className="text-danger">
                  Insufficient Amount
                </p>
              )}

              <Button data-testid="button" type="variant">
                Transfer Amount
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default AmountTransfer;
