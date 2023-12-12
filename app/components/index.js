"use client";
import React from "react";
import TopBar from "./1_topbar";
import LeftSide from "./2_leftSide";
import AthleteBreakDown from "./3_Middle";
import RightSide from "./4_RightSide";
import styles from "./styles.module.css";
import Head from "next/head";
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
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateWindowDimensions.bind(this));
    this.updateWindowDimensions();
    this.fetchRandomAthlete();
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

  render() {
    return (
      <div>
        <Head>
          <meta property="og:image" content="/icon.png" />
        </Head>
        <TopBar />
        <div className={styles.mainDisplay}>
          <LeftSide setAthlete={this.setAthlete.bind(this)} />
          <AthleteBreakDown
            athlete={this.state.athlete}
            loadingNewAthlete={this.state.loadingNewAthlete}
            athlete_data={this.state.athlete_data}
            top_competitors={this.state.top_competitors}
            setAthleteFromTopCompetitors={this.setAthleteFromTopCompetitors.bind(
              this,
            )}
            height={this.state.height}
          />
          <RightSide
            athlete={this.state.athlete}
            similar_athletes={this.state.similar_athletes}
            setAthlete={this.setAthlete.bind(this)}
            loadingNewAthlete={this.state.loadingNewAthlete}
            athlete_data={this.state.athlete_data}
          />
        </div>
      </div>
    );
  }
}
