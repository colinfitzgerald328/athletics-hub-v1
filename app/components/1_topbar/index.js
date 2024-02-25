import React, { use, useState } from "react";
import Button from "@mui/joy/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styles from "./styles.module.css";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HubIcon from "@mui/icons-material/Hub";
import * as API from "/app/api/api.js";
import SummaryModal from "./1_SummaryModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  height: 550,
  bgcolor: "background.paper",
  boxShadow: 24,
  paddingTop: "30px",
  paddingBottom: "30px",
  paddingLeft: "30px",
  paddingRight: "30px",
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
  const [accountFailedOpen, setAccountFailedOpen] = useState(false);
  const [summaryModalOpen, setSummaryModalOpen] = useState(false);

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
    if (userName == "" || password == "") {
      setAccountFailedOpen(true);
      return;
    }
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

  const handleCloseFailedCreate = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAccountFailedOpen(false);
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

  function openCreateDiv() {
    var element = document.getElementsByClassName(styles.basicContainer)[0];
    element.classList.add(styles.fade);
    setTimeout(() => {
      setCreatingAccount(true);
      setTimeout(() => {
        var secondElement = document.getElementsByClassName(
          styles.basicContainer1,
        )[0];
        secondElement.classList.add(styles.fadeIn);
      }, 10);
    }, 1000);
  }

  function closeCreateDiv() {
    var element = document.getElementsByClassName(styles.basicContainer1)[0];
    element.classList.remove(styles.fadeIn);
    setTimeout(() => {
      setCreatingAccount(false);
    }, 1000);
  }

  function openSummaryModal() {
    setSummaryModalOpen(true);
  }

  function closeSummaryModal() {
    setSummaryModalOpen(false);
  }

  return (
    <div className={styles.topBarHolder}>
      <div className={styles.pageIcon}>
        <HubIcon sx={{ color: "#1095E5", fontSize: "30px" }} />
      </div>
      <div className={styles.leftItems}>
        <div className={styles.pageLabel}>athletics hub</div>
        <div className={styles.pageAction}>
          Stay up to date on your favorite track and field athletes
        </div>
        <Button sx={{"marginLeft": "15px", "borderRadius": "25px"}} variant="soft" color="primary" onClick={() => openSummaryModal()}>
          Daily Summary
        </Button>
      </div>
      <div className={styles.rightItems}>
        <div className={styles.textItems}>
          {props.loggedIn && (
            <div className={styles.welcomeForUser}>
              Welcome{" "}
              <div className={styles.userName}>
                {localStorage.getItem("userName")}
              </div>
            </div>
          )}
        </div>
        <div className={styles.button}>
          {props.loggedIn ? (
            <Button
            sx={{"borderRadius": "25px"}}
              onClick={() => props.logOutUser()}
              type="primary"
            >
              Log out
            </Button>
          ) : (
            <Button
            sx={{"borderRadius": "25px"}}
              onClick={openModal}
              type="primary"
            >
              Sign in
            </Button>
          )}
        </div>
      </div>
      <Modal
        className={styles.modalWithHeight}
        open={loginModalOpen}
        onClose={cancelModal}
      >
        <Box sx={style}>
          <div className={styles.baseIcon}>
            <HubIcon sx={{ color: "#1095E5", fontSize: "50px" }} />
          </div>
          {creatingAccount ? (
            <div className={styles.basicContainer1}>
              <h1 className={styles.callOut}>Sign up</h1>
              <div className={styles.subMessageHolder}>
                <div className={styles.subMessage}>
                  Welcome to the athletics hub!
                </div>
                <div className={styles.subMessageWithMargin}>
                  Enter your details below to create your account and get
                  started.
                </div>
              </div>
              <div className={styles.inputContainer}>
                <div className={styles.inputLabel}>Username</div>
                <input
                  className={styles.basicInput}
                  placeholder="enter username..."
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  spellCheck="false"
                ></input>
              </div>
              <div className={styles.inputLabel}>Password</div>
              <input
                className={styles.basicInput}
                type="password"
                value={password}
                placeholder="enter password..."
                spellCheck="false"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
              <Button
                onClick={createAccount}
                className={styles.fullWidth}
                type="primary"
                loading={loggingIn}
              >
                {loggingIn ? "Creating your account" : "Create account"}
              </Button>
              <IconButton
                size="small"
                sx={{
                  padding: 1,
                  marginTop: "10px",
                  borderRadius: "25px",
                }}
                className={styles.fullWidthBackButton}
                onClick={() => closeCreateDiv()}
              >
                <ArrowBackIcon />
              </IconButton>
            </div>
          ) : (
            <div className={styles.basicContainer}>
              <h1 className={styles.callOut}>Welcome back</h1>
              <div className={styles.subMessageHolder}>
                <div className={styles.subMessage}>
                  Glad to see you again 👋
                </div>
                <div className={styles.subMessage}>
                  Login to your account below
                </div>
              </div>
              <div className={styles.inputContainer}>
                <div className={styles.inputLabel}>Username</div>
                <input
                  className={styles.basicInput}
                  placeholder="enter username..."
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  spellCheck="false"
                ></input>
              </div>
              <div className={styles.inputLabel}>Password</div>
              <input
                className={styles.basicInput}
                type="password"
                value={password}
                placeholder="enter password..."
                spellCheck="false"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
              <Button
                loading={loggingIn}
                onClick={handleLogin}
                className={styles.fullWidth}
                type="primary"
              >
                {loggingIn ? "Logging you in" : "Log in"}
              </Button>
              <div className={styles.noAccountYet}>
                Don&apos;t have an account?
                <div
                  onClick={() => openCreateDiv()}
                  className={styles.signUpButton}
                >
                  Sign up
                </div>
              </div>
            </div>
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
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={accountFailedOpen}
        autoHideDuration={3000}
        onClose={handleCloseFailedCreate}
      >
        <Alert
          onClose={handleCloseFailedCreate}
          severity="error"
          sx={{ width: "100%" }}
        >
          Error creating account. Please enter a username and password and try
          again.
        </Alert>
      </Snackbar>
      <SummaryModal
        summaryModalOpen={summaryModalOpen}
        closeSummaryModal={closeSummaryModal}
        dailySummary={props.dailySummary}
      />
    </div>
  );
}
