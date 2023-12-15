import React, { use, useState } from "react";
import { Button } from "antd";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styles from "./styles.module.css";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import * as API from "/app/api/api.js";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  innerHeight: 100,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
  outline: "none",
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function TopBar(props) {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [creatingAccount, setCreatingAccount] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = React.useState(false);
  const [createdAccountOpen, setCreatedAccountOpen] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const [dangerAlertOpen, setDangerAlertOpen] = useState(false);

  function handleLogin() {
    setLoggingIn(true);
    setTimeout(() => {
      API.loginUser(userName, password, (data) => {
        if (data["operation"] === "success") {
          localStorage.setItem("userName", userName);
          localStorage.setItem("password", password);
          localStorage.setItem(
            "account_id",
            data["account_data"]["account_id"],
          );
          setOpen(true);
          props.logInUser();
          cancelModal();
        } else {
          setDangerAlertOpen(true);
          setLoggingIn(false);
        }
      });
    }, 1000);
  }

  function createAccount() {
    setLoggingIn(true);
    setTimeout(() => {
      API.createAccount(userName, password, (data) => {
        if (data["operation"] === "success") {
          setLoggingIn(false);
          localStorage.setItem("userName", userName);
          localStorage.setItem("password", password);
          localStorage.setItem("account_id", data["account_id"]);
          setCreatedAccountOpen(true);
          props.logInUser();
          cancelModal();
        }
      });
    }, 1000);
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleCloseCreate = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setCreatedAccountOpen(false);
  };

  const handleCloseDanger = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setDangerAlertOpen(false);
  };

  function openModal() {
    setLoginModalOpen(true);
  }

  function cancelModal() {
    setLoginModalOpen(false);
    setCreatingAccount(false);
    setUserName("");
    setPassword("");
    setLoggingIn(false);
  }

  return (
    <div className={styles.topBarHolder}>
      <div className={styles.leftItems}>
        <div className={styles.pageLabel}>athletics hub</div>
        <div className={styles.pageAction}>
          Stay up to date on your favorite track and field athletes
        </div>
      </div>
      {props.loggedIn ? (
        <div className={styles.userLoggedIn}>
          <div className={styles.userName}>
            Welcome, {localStorage.getItem("userName")}
          </div>
          <Button onClick={() => props.logOutUser()} type="primary">
            Log out
          </Button>
        </div>
      ) : (
        <Button onClick={openModal} type="primary">
          Log in to save collections :)
        </Button>
      )}
      <Modal open={loginModalOpen} onClose={cancelModal}>
        <Box sx={style}>
          <h1>{creatingAccount ? "Create Account" : "Log in"}</h1>
          <input
            className={styles.basicInput}
            placeholder="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            spellCheck="false"
          ></input>
          <input
            className={styles.basicInput}
            type="password"
            value={password}
            placeholder="password"
            spellCheck="false"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          {!creatingAccount && (
            <Button
              loading={loggingIn}
              onClick={handleLogin}
              className={styles.fullWidth}
              type="primary"
            >
              {loggingIn ? "Logging you in" : "Log in"}
            </Button>
          )}
          {creatingAccount && (
            <Button
              onClick={createAccount}
              className={styles.fullWidth}
              type="primary"
              loading={loggingIn}
            >
              {loggingIn ? "Creating your account" : "Create account"}
            </Button>
          )}
          {!creatingAccount && (
            <Button
              onClick={() => setCreatingAccount(true)}
              className={styles.fullWidth}
            >
              New here? Click to create an account
            </Button>
          )}
          {creatingAccount && (
            <Button
              onClick={() => setCreatingAccount(false)}
              className={styles.fullWidth}
            >
              Back to login
            </Button>
          )}
        </Box>
      </Modal>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Login success!
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={createdAccountOpen}
        autoHideDuration={3000}
        onClose={handleCloseCreate}
      >
        <Alert
          onClose={handleCloseCreate}
          severity="success"
          sx={{ width: "100%" }}
        >
          Account created and now logged in!
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={dangerAlertOpen}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleCloseDanger}
          severity="error"
          sx={{ width: "100%" }}
        >
          Error logging you in. Please check your username and password.
        </Alert>
      </Snackbar>
    </div>
  );
}
