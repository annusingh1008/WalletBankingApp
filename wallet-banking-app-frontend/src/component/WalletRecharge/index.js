import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { recharge } from "../../actions/recharge.actions";
import { getBalance } from "../../reducers/balance.reducer";
import Layout from "../Layout";
import "./style.css";

const WalletRecharge = () => {
  const [amount, setAmount] = useState();
  const [amountErr, setAmountErr] = useState("");

  const dispatch = useDispatch();
  // const balance = useSelector((state) => state.balance);
  const balance = useSelector(getBalance);

  const userEmail = localStorage.getItem("email");

  const walletRecharge = (e) => {
    e.preventDefault();
    if (amount <= 0) {
      setAmountErr("Enter a valid amount");
    }

    const rechargeDetails = {
      email: userEmail,
      amount: amount,
      currentAmount: balance.amount,
    };

    dispatch(recharge(rechargeDetails));
  };

  return (
    <Layout sidebar>
      <Container className="container">
        <Row md={12}>
          <Col>
            <div className="heading">Wallet Recharge</div>
            <Form
              data-testid="form"
              className="form"
              onSubmit={(e) => walletRecharge(e)}
            >
              <label>Amount</label>
              <br />
              <input
                data-testid="amountInputBox"
                type="number"
                placeholder="1000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              ></input>
              <br />
              {amountErr && (
                <p data-testid="error-msg" className="text-danger">
                  Please enter a valid amount
                </p>
              )}
              <Button data-testid="button" type="submit">
                Recharge
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default WalletRecharge;
