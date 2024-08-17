import React, { useState } from "react";
import Button from "@mui/joy/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HubIcon from "@mui/icons-material/Hub";
import SummaryModal from "./1_SummaryModal";
import { loginUser, createAccount } from "@/app/api/api";
import { components } from "@/src/lib/api/v1";
import styles from "./styles.module.css";

type CreateAccountPayload = components["schemas"]["CreateAccountPayload"];
type LoginPayload = components["schemas"]["LoginPayload"];

interface TopBarProps {
  isMobile: boolean;
  loggedIn: boolean;
  logInUser: () => void;
  logOutUser: () => void;
  summaryResponse: any; // Replace `any` with the appropriate type if known
}

const style = {
  position: "absolute" as const,
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

const TopBar: React.FC<TopBarProps> = (props) => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [creatingAccount, setCreatingAccount] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [createdAccountOpen, setCreatedAccountOpen] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const [dangerAlertOpen, setDangerAlertOpen] = useState(false);
  const [accountFailedOpen, setAccountFailedOpen] = useState(false);
  const [summaryModalOpen, setSummaryModalOpen] = useState(false);
  const [errMessage, setErrMessage] = useState<string | null>(null);

  async function handleLogin() {
    if (userName === "" || password === "") {
      setDangerAlertOpen(true);
      return;
    }
    setLoggingIn(true);
    const loginData: LoginPayload = {
      username: userName,
      password: password,
    };
    const { data, error } = await loginUser(loginData);
    console.log("data", data);
    console.log("error, ", error);
    if (error) {
      setErrMessage(error.detail);
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
    localStorage.setItem("userName", data.username);
    localStorage.setItem("password", data.password);
    localStorage.setItem("account_id", data.id);
    setOpen(true);
    props.logInUser();
    cancelModal();
  }

  async function createAccountForUser() {
    if (userName === "" || password === "") {
      setAccountFailedOpen(true);
      return;
    }
    setLoggingIn(true);
    const createAccountData: CreateAccountPayload = {
      username: userName,
      password: password,
    };
    const { data, error } = await createAccount(createAccountData);
    if (error) {
      setErrMessage(error.detail);
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
    localStorage.setItem("account_id", data.id);
    setCreatedAccountOpen(true);
    props.logInUser();
    cancelModal();
  }

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleCloseCreate = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setCreatedAccountOpen(false);
  };

  const handleCloseDanger = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setDangerAlertOpen(false);
  };

  const handleCloseFailedCreate = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
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
    const element = document.getElementsByClassName(styles.basicContainer)[0];
    element.classList.add(styles.fade);
    setTimeout(() => {
      setCreatingAccount(true);
      setTimeout(() => {
        const secondElement = document.getElementsByClassName(
          styles.basicContainer1
        )[0];
        secondElement.classList.add(styles.fadeIn);
      }, 10);
    }, 1000);
  }

  function closeCreateDiv() {
    const element = document.getElementsByClassName(styles.basicContainer1)[0];
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
          onClick={openSummaryModal}
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
                onClick={props.logOutUser}
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
                />
              </div>
              <div className={styles.inputLabel}>Password</div>
              <input
                className={styles.basicInput}
                type="password"
                value={password}
                placeholder="enter password..."
                spellCheck="false"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                onClick={createAccountForUser}
                sx={{ borderRadius: "20px", marginTop: "20px" }}
                fullWidth
                disabled={loggingIn}
              >
                Create account
              </Button>
              <IconButton className={styles.backArrow} onClick={closeCreateDiv}>
                <ArrowBackIcon />
              </IconButton>
            </div>
          ) : (
            <div className={styles.basicContainer}>
              <h1 className={styles.callOut}>Sign in</h1>
              <div className={styles.subMessageHolder}>
                <div className={styles.subMessage}>
                  Welcome back to the track and field hub!
                </div>
                <div className={styles.subMessageWithMargin}>
                  Enter your details below to get started.
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
                />
              </div>
              <div className={styles.inputLabel}>Password</div>
              <input
                className={styles.basicInput}
                type="password"
                placeholder="enter password..."
                spellCheck="false"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                onClick={handleLogin}
                sx={{ borderRadius: "20px", marginTop: "20px" }}
                fullWidth
                disabled={loggingIn}
              >
                Login
              </Button>
              <div
                className={styles.createAccountButton}
                onClick={openCreateDiv}
              >
                Don't have an account? Sign up here.
              </div>
            </div>
          )}
        </Box>
      </Modal>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <MuiAlert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Successfully logged in.
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={createdAccountOpen}
        autoHideDuration={3000}
        onClose={handleCloseCreate}
      >
        <MuiAlert
          onClose={handleCloseCreate}
          severity="success"
          sx={{ width: "100%" }}
        >
          Successfully created account.
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={dangerAlertOpen}
        autoHideDuration={3000}
        onClose={handleCloseDanger}
      >
        <MuiAlert
          onClose={handleCloseDanger}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errMessage || "Enter both username and password"}
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={accountFailedOpen}
        autoHideDuration={3000}
        onClose={handleCloseFailedCreate}
      >
        <MuiAlert
          onClose={handleCloseFailedCreate}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errMessage || "Failed to create account. Try again"}
        </MuiAlert>
      </Snackbar>
      {summaryModalOpen && (
        <SummaryModal
          open={summaryModalOpen}
          closeSummaryModal={closeSummaryModal}
          summaryResponse={props.summaryResponse}
        />
      )}
    </div>
  );
};

export default TopBar;
