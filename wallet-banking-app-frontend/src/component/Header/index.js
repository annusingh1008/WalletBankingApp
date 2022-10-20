import React, { useState } from "react";
import { Navbar, Container, Nav, Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { signout } from "../../actions/auth.actions";
import { getUserEmail } from "../../helper/localStorageHelper";

const Header = () => {
  const dispatch = useDispatch();
  const [confirmModal, setConfirmModal] = useState(false);

  const logout = () => {
    dispatch(signout());
  };

  const confirmSignout = (e) => {
    e.preventDefault();
    setConfirmModal(true);
  };

  const isUserLoggedIn = getUserEmail("email") !== null ? true : false;

  return (
    <Navbar
      collapseOnSelect
      fixed="top"
      expand="lg"
      bg="dark"
      variant="dark"
      style={{ zIndex: 2 }}
    >
      <Container fluid>
        <Link to="/" className="navbar-brand">
          Wallet Banking
        </Link>
      </Container>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        {!isUserLoggedIn ? (
          <Nav>
            <li className="nav-item">
              <NavLink to="signin" className="nav-link">
                Signin
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="signup" className="nav-link">
                Signup
              </NavLink>
            </li>
          </Nav>
        ) : (
          <Nav>
            <li className="nav-item">
              <span
                data-tesid="signout-btn"
                className="nav-link"
                onClick={confirmSignout}
              >
                Signout
              </span>
            </li>
          </Nav>
        )}

        {confirmModal && (
          <Modal
            data-testid="confirm-modal"
            show={confirmModal}
            // onHide={() => {
            //   setConfirmModal(false);
            // }}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header>
              <Modal.Title>Confirm</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure, you want to Signout</Modal.Body>
            <Modal.Footer>
              <Button
                data-testid="set-modal"
                variant="secondary"
                onClick={() => setConfirmModal(false)}
              >
                Close
              </Button>
              <Button
                data-testid="confirm-signout-btn"
                variant="primary"
                onClick={logout}
              >
                Confirm
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
