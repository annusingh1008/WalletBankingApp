import { Route, Switch, useHistory } from "react-router-dom";
import Home from "./component/Home/";
import Signin from "./component/Signin";
import Signup from "./component/Signup";
import WalletRecharge from "./component/WalletRecharge";
import AmountTransfer from "./component/AmountTransfer";
import Transactions from "./component/Transactions";
import { Redirect } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "./actions/getUserDetails.actions";
import { isUserLoggedIn } from "./actions/auth.actions";
import CheckBalance from "./component/CheckBalance";
import Cashback from "./component/Cashback";

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // useEffect(() => {

  //   if (auth.authenticate) {
  //     const email = localStorage.getItem('email')
  //     dispatch(getUserDetails(email));
  //   }

  // }, [auth.authenticate])

  useEffect(() => {
    return () => {
      if (window.performance.navigation.type == 1) {
        localStorage.clear();
        window.location.href = "/signin";
      }
    };
  }, []);

  return (
    <div className="App">
      <Switch>
        {/* <Route path='/' exact component={Home} /> */}

        <Route
          exact
          path="/"
          component={() => {
            const isUserLoggedIn = localStorage.getItem("email");

            if (isUserLoggedIn) {
              return <Home />;
            } else {
              return <Redirect to={`/signin`} />;
            }
          }}
        />

        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />

        <Route
          path="/recharge"
          component={() => {
            const isUserLoggedIn = localStorage.getItem("email");

            if (isUserLoggedIn) {
              return <WalletRecharge />;
            } else {
              return <Redirect to={`/signin`} />;
            }
          }}
        />

        <Route
          path="/transfer"
          component={() => {
            const isUserLoggedIn = localStorage.getItem("email");

            if (isUserLoggedIn) {
              return <AmountTransfer />;
            } else {
              return <Redirect to={`/signin`} />;
            }
          }}
        />

        <Route
          path="/transactions"
          component={() => {
            const isUserLoggedIn = localStorage.getItem("email");

            if (isUserLoggedIn) {
              return <Transactions />;
            } else {
              return <Redirect to={`/signin`} />;
            }
          }}
        />

        <Route
          path="/checkBalance"
          component={() => {
            const isUserLoggedIn = localStorage.getItem("email");

            if (isUserLoggedIn) {
              return <CheckBalance />;
            } else {
              return <Redirect to={`/signin`} />;
            }
          }}
        />

        <Route
          path="/cashback"
          component={() => {
            const isUserLoggedIn = localStorage.getItem("email");

            if (isUserLoggedIn) {
              return <Cashback />;
            } else {
              return <Redirect to={`/signin`} />;
            }
          }}
        />
      </Switch>
    </div>
  );
}

export default App;
