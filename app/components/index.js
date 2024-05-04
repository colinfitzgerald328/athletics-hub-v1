"use client";
import React from "react";
import TopBar from "./1_topbar";
import LeftSide from "./2_leftSide";
import AthleteBreakDown from "./3_Middle";
import RightSide from "./4_RightSide";
import Collections from "./5_Collections";
import styles from "./styles.module.css";
import Head from "next/head";
import ConstructionIcon from "@mui/icons-material/Construction";
import Link from "next/link";
import * as API from "/app/api/api.js";

export default class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      athlete: [],
      athlete_data: [],
      athlete_accolades: [],
      similar_athletes: [],
      top_competitors: [],
      dailySummary: null,
      width: 0,
      height: 0,
      pageLoaded: false,
      loggedIn: false,
      showingCollections: false,
      user_collections: [],
      collections_local_copy: [],
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

  getCollectionsForUser() {
    API.getCollectionsForAccount((data) => {
      this.setState({
        user_collections: JSON.parse(data["collections"]),
        collections_local_copy: JSON.parse(data["collections"]),
        loadingCollections: false,
      });
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


  fetchRandomAthlete() {
    this.setState({
      loadingNewAthlete: true,
    });
    this.setState({ fetching: true });
    API.getRandomDoc((athlete) => {
      this.setState({
        athlete: athlete.json_data.athlete,
        loadingNewAthlete: false,
        pageLoaded: true,
        athlete_data: athlete.json_data.results,
        similar_athletes: [],
        top_competitors: athlete.json_data.top_competitors
      });
    });
  }

  fetchAthleteById(athlete_id) {
    this.setState({
      loadingNewAthlete: true,
    });
    this.setState({ fetching: true });
    API.getAthleteById(athlete_id, (athlete) => {
      this.setState({
        athlete: athlete.json_data.athlete,
        loadingNewAthlete: false,
        pageLoaded: true,
        athlete_data: athlete.json_data.results,
        similar_athletes: [],
        top_competitors: athlete.json_data.top_competitors
      });
    });
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }


  getLetsRunDailySummary() {
    API.getLetsRunDailySummary((data) => {
      this.setState({
        dailySummary: data["summary"],
      });
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
    if (this.state.width < 1000 && this.state.pageLoaded) {
      return (
        <div className={styles.underConstruction}>
          <ConstructionIcon sx={{ fontSize: "50px" }} />
          <div className={styles.commentary}>
            Our engineering team is hard at work building out mobile. It will be
            ready soon 😊. For now you can visit the desktop version.
          </div>
          <Link
            className={styles.hoverUnderline}
            href="https://athletics-hub-v1.vercel.app"
          >
            Open in browser
          </Link>
        </div>
      );
    } else {
      return (
        <div>
          <Head>
            <meta property="og:image" content="/icon.png" />
          </Head>
          <TopBar
            loggedIn={this.state.loggedIn}
            logOutUser={this.logOutUser.bind(this)}
            logInUser={this.logInUser.bind(this)}
            dailySummary={this.state.dailySummary}
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
              collections_local_copy={this.state.collections_local_copy}
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
            />
          </div>
        </div>
      );
    }
  }
}
