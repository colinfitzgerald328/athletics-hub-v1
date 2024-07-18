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
import { loginUser } from "/app/api/api.js";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  height: 570,
  bgcolor: "background.paper",
  boxShadow: 24,
  paddingTop: "30px",
  paddingBottom: "100px",
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
  const [errMessage, setErrMessage] = useState(null);

  async function handleLogin() {
    if (userName === "" || password === "") {
      setDangerAlertOpen(true);
      return;
    }
    setLoggingIn(true);
    const result = await loginUser(userName, password)
    if (result.detail) {
      setErrMessage(result.detail);
      setLoggingIn(false);
      setDangerAlertOpen(true);
      setTimeout(() => {
          setDangerAlertOpen(false);
          setTimeout(() => {
            setErrMessage(null);
          }, 2000);
        }, 2000);
        return;
    }
    localStorage.setItem("userName", userName);
    localStorage.setItem("password", password);
    localStorage.setItem("account_id", result["id"]);
    setOpen(true);
    props.logInUser();
    cancelModal();
  }

  async function createAccount() {
    if (userName == "" || password == "") {
      setAccountFailedOpen(true);
      return;
    }
    setLoggingIn(true);
    const result = await createAccount(userName, password)
    if (result.detail) {
      setErrMessage(result.detail);
      setAccountFailedOpen(true);
      setLoggingIn(false);
      setTimeout(() => {
          setAccountFailedOpen(false);
          setTimeout(() => {
            setErrMessage(null);
          }, 2000);
        }, 2000);
        return;
    }
    setLoggingIn(false);
    localStorage.setItem("userName", userName);
    localStorage.setItem("password", password);
    localStorage.setItem("account_id", data["id"]);
    setCreatedAccountOpen(true);
    props.logInUser();
    cancelModal();
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
      <div className={styles.leftItems}>
        <div className={props.isMobile ? styles.mobileLabel : styles.pageLabel}>
          Track and Field Hub
        </div>
        <Button
          sx={{
            marginLeft: "15px",
            borderRadius: "25px",
            marginTop: "auto",
            marginBottom: "auto",
          }}
          variant="soft"
          color="primary"
          onClick={() => openSummaryModal()}
        >
          Daily News
        </Button>
      </div>
      <div className={styles.rightItems}>
        <div className={styles.textItems}>
          {props.loggedIn && (
            <div className={styles.welcomeForUser}>
              {!props.isMobile && (
                <div className={styles.userName}>
                  Welcome {localStorage.getItem("userName")}
                </div>
              )}
            </div>
          )}
        </div>
        {!props.isMobile && (
          <div className={styles.button}>
            {props.loggedIn ? (
              <Button
                sx={{ borderRadius: "25px" }}
                onClick={() => props.logOutUser()}
                type="primary"
              >
                Log out
              </Button>
            ) : (
              <Button
                sx={{ borderRadius: "25px" }}
                onClick={openModal}
                type="primary"
              >
                Sign in
              </Button>
            )}
          </div>
        )}
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
                  Welcome to the track and field hub!
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
                loading={loggingIn}
                variant="solid"
                sx={{
                  width: "100%",
                  marginTop: "20px",
                  borderRadius: "25px",
                  height: "50px",
                }}
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
                variant="soft"
                sx={{
                  width: "100%",
                  marginTop: "20px",
                  borderRadius: "25px",
                  height: "50px",
                }}
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
          {errMessage || "Please type in your username and password"}
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
          {errMessage || "Please choose a username and password first"}
        </Alert>
      </Snackbar>
      <SummaryModal
        summaryModalOpen={summaryModalOpen}
        closeSummaryModal={closeSummaryModal}
        summaryResponse={props.summaryResponse}
        isMobile={props.isMobile}
      />
    </div>
  );
}
