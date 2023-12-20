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
      this.setState({ loggedIn: true });
      this.getCollectionsForUser();
    }
    window.addEventListener("resize", this.updateWindowDimensions.bind(this));
    this.updateWindowDimensions();
    this.fetchRandomAthlete();
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

  setAthlete = async (athlete) => {
    this.setState({
      athlete: athlete,
      loadingNewAthlete: true,
    });

    try {
      await Promise.all([
        this.getResultsForAthlete(athlete.aaAthleteId),
        this.getSimilarAthletes(athlete.aaAthleteId),
        this.getTopCompetitors(athlete.aaAthleteId),
      ]);

      // Use setTimeout and requestAnimationFrame to wait for the next render cycle
      setTimeout(() => {
        requestAnimationFrame(() => {
          this.setState({
            loadingNewAthlete: false,
            pageLoaded: true,
          });
        });
      }, 0);
    } catch (error) {
      console.error("Error occurred:", error);

      this.setState({
        loadingNewAthlete: false,
      });
    }
  };

  getResultsForAthlete(athlete_id) {
    return new Promise((resolve, reject) => {
      API.getResultsForAthlete(
        athlete_id,
        (results) => {
          this.setState({
            athlete_data: results["athlete_data"],
          });
          resolve(results); // Resolve the promise with the data
        },
        (error) => {
          reject(error); // Reject the promise with the error
        },
      );
    });
  }

  getSimilarAthletes(athlete_id) {
    return new Promise((resolve, reject) => {
      API.getSimilarAthletes(
        athlete_id,
        (data) => {
          this.setState({
            similar_athletes: data["similar_athletes"],
          });
          resolve(data); // Resolve the promise with the data
        },
        (error) => {
          console.log(error);
          reject(error); // Reject the promise with the error
        },
      );
    });
  }

  fetchRandomAthlete() {
    API.getRandomDoc((athlete) => {
      this.setState({
        athlete: athlete.random_doc,
      });
      this.setAthlete(athlete.random_doc);
    });
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  getTopCompetitors(athlete_id) {
    return new Promise((resolve, reject) => {
      API.getTopCompetitors(
        athlete_id,
        (data) => {
          this.setState({
            top_competitors: data["top_competitors"],
          });
          resolve(data); // Resolve the promise with the data
        },
        (error) => {
          console.log(error);
          reject(error); // Reject the promise with the error
        },
      );
    });
  }

  setAthleteFromTopCompetitors(athlete_id) {
    API.getAthleteById(athlete_id, (athlete) => {
      this.setState({
        athlete: athlete.found_athlete,
      });
      this.setAthlete(athlete.found_athlete);
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
          />
          <div className={styles.mainDisplay}>
            <LeftSide
              setAthlete={this.setAthlete.bind(this)}
              loggedIn={this.state.loggedIn}
              showCollections={this.showCollections.bind(this)}
              loadingCollections={this.state.loadingCollections}
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
              setAthleteFromTopCompetitors={this.setAthleteFromTopCompetitors.bind(
                this,
              )}
              height={this.state.height}
              showingCollections={this.state.showingCollections}
            />
            <RightSide
              athlete={this.state.athlete}
              similar_athletes={this.state.similar_athletes}
              setAthlete={this.setAthlete.bind(this)}
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
