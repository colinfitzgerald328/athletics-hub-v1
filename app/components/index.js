"use client";
import React from "react";
import TopBar from "./1_topbar";
import LeftSide from "./2_leftSide";
import AthleteBreakDown from "./3_Middle";
import RightSide from "./4_RightSide";
import Collections from "./5_Collections";
import styles from "./styles.module.css";
import Head from "next/head";
import LinearProgress from "@mui/material/LinearProgress";
import {
  getAthleteById,
  getCollectionsForAccount,
  getRandomDoc,
  getLetsRunDailySummary,
} from "../api/api";

export default class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      athlete: null,
      athlete_data: [],
      athlete_accolades: [],
      similar_athletes: [],
      top_competitors: [],
      summaryResponse: null,
      width: null,
      height: null,
      pageLoaded: false,
      loggedIn: false,
      showingCollections: false,
      user_collections: [],
      loadingCollections: true,
      shouldFadeOut: false,
    };
  }

  componentDidMount() {
    if (
      localStorage.getItem("userName") &&
      localStorage.getItem("password") &&
      localStorage.getItem("account_id")
    ) {
      this.logInUser();
    }
    window.addEventListener("resize", this.updateWindowDimensions.bind(this));
    this.updateWindowDimensions();
    this.fetchRandomAthlete();
    this.getLetsRunDailySummary();
  }

  async getCollectionsForUser() {
    const { data, error } = await getCollectionsForAccount();
    this.setState({
      user_collections: data,
      loadingCollections: false,
    });
  }

  logInUser() {
    this.setState({ loggedIn: true });
    this.getCollectionsForUser();
  }

  logOutUser() {
    this.setState({ loggedIn: false, showingCollections: false });
    window.localStorage.clear();
  }

  async fetchRandomAthlete() {
    this.setState({
      loadingNewAthlete: true,
    });
    this.setState({ fetching: true });
    const { data, error } = await getRandomDoc();
    this.setState({
      athlete: data.athlete,
      loadingNewAthlete: false,
      pageLoaded: true,
      athlete_data: data.results,
      similar_athletes: data.similar_athletes,
      top_competitors: data.top_competitors,
    });
  }

  async fetchAthleteById(athlete_id) {
    this.setState({
      loadingNewAthlete: true,
    });
    this.setState({ fetching: true });
    const { data, error } = await getAthleteById(athlete_id);
    this.setState({
      athlete: data.athlete,
      loadingNewAthlete: false,
      pageLoaded: true,
      athlete_data: data.results,
      similar_athletes: data.similar_athletes,
      top_competitors: data.top_competitors,
    });
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  async getLetsRunDailySummary() {
    const { data, error } = await getLetsRunDailySummary();
    this.setState({
      summaryResponse: data.summary_text,
    });
  }

  showCollections() {
    this.setState({
      showingCollections: true,
    });
  }

  closeCollections() {
    this.setState({
      showingCollections: false,
    });
  }

  render() {
    if (!this.state.athlete) {
      return (
        <div className={styles.loadingDisplay}>
          <div>
            <LinearProgress />
          </div>
        </div>
      );
    }
    if (this.state.width < 1000 && this.state.pageLoaded) {
      return (
        <div>
          <Head>
            <meta property="og:image" content="/icon.png" />
          </Head>
          <TopBar
            loggedIn={this.state.loggedIn}
            logOutUser={this.logOutUser.bind(this)}
            logInUser={this.logInUser.bind(this)}
            summaryResponse={this.state.summaryResponse}
            isMobile={true}
          />
          <div className={styles.mainDisplayMobile}>
            <LeftSide
              loggedIn={this.state.loggedIn}
              showCollections={this.showCollections.bind(this)}
              loadingCollections={this.state.loadingCollections}
              fetchAthleteById={this.fetchAthleteById.bind(this)}
              isMobile={true}
            />
            {/* <Collections
              closeCollections={this.closeCollections.bind(this)}
              getCollectionsForUser={this.getCollectionsForUser.bind(this)}
              user_collections={this.state.user_collections}
              showingCollections={this.state.showingCollections}
              isMobile={true}
            /> */}
            <AthleteBreakDown
              athlete={this.state.athlete}
              loadingNewAthlete={this.state.loadingNewAthlete}
              athlete_data={this.state.athlete_data}
              top_competitors={this.state.top_competitors}
              height={this.state.height}
              showingCollections={this.state.showingCollections}
              fetchAthleteById={this.fetchAthleteById.bind(this)}
              isMobile={true}
            />
            <RightSide
              athlete={this.state.athlete}
              similar_athletes={this.state.similar_athletes}
              loadingNewAthlete={this.state.loadingNewAthlete}
              athlete_data={this.state.athlete_data}
              showingCollections={this.state.showingCollections}
              fetchAthleteById={this.fetchAthleteById.bind(this)}
              isMobile={true}
            />
          </div>
        </div>
      );
    } else if (this.state.width > 1000 && this.state.pageLoaded) {
      return (
        <div>
          <Head>
            <meta property="og:image" content="/icon.png" />
          </Head>
          <TopBar
            loggedIn={this.state.loggedIn}
            logOutUser={this.logOutUser.bind(this)}
            logInUser={this.logInUser.bind(this)}
            summaryResponse={this.state.summaryResponse}
          />
          <div className={styles.mainDisplay}>
            <LeftSide
              loggedIn={this.state.loggedIn}
              showCollections={this.showCollections.bind(this)}
              loadingCollections={this.state.loadingCollections}
              fetchAthleteById={this.fetchAthleteById.bind(this)}
            />
            <Collections
              closeCollections={this.closeCollections.bind(this)}
              getCollectionsForUser={this.getCollectionsForUser.bind(this)}
              user_collections={this.state.user_collections}
              showingCollections={this.state.showingCollections}
            />
            <AthleteBreakDown
              athlete={this.state.athlete}
              loadingNewAthlete={this.state.loadingNewAthlete}
              athlete_data={this.state.athlete_data}
              top_competitors={this.state.top_competitors}
              height={this.state.height}
              showingCollections={this.state.showingCollections}
              fetchAthleteById={this.fetchAthleteById.bind(this)}
            />
            <RightSide
              athlete={this.state.athlete}
              similar_athletes={this.state.similar_athletes}
              loadingNewAthlete={this.state.loadingNewAthlete}
              athlete_data={this.state.athlete_data}
              showingCollections={this.state.showingCollections}
              fetchAthleteById={this.fetchAthleteById.bind(this)}
            />
          </div>
        </div>
      );
    }
  }
}
