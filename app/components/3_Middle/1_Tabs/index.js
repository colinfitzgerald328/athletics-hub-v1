import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Skeleton } from "@mui/material";
import DataTable from "./1_DataTable ";
import styles from "./styles.module.css";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [topCompetitors, setTopCompetitors] = useState([]);

  useEffect(() => {
    // Assuming this.props.athlete.top_competitors_with_reference is your data
    setTopCompetitors(props.athlete.top_competitors_with_reference);
  }, [props.athlete.top_competitors_with_reference]);

  function normalizeName(name) {
    const nameParts = name.toLowerCase().split(" ");
    const normalizedParts = nameParts.map((part) => {
      return part.charAt(0).toUpperCase() + part.slice(1);
    });
    return normalizedParts.join(" ");
  }

  console.log(topCompetitors);

  return (
    <Box
      sx={{
        width: "100%",
        borderBottomLeftRadius: "25px",
        borderBottomRightRadius: "25px",
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label="Summary"
            {...a11yProps(0)}
            sx={{ width: "20%", fontSize: "14px" }}
          />
          <Tab
            label="Competition"
            {...a11yProps(1)}
            sx={{ width: "20%", fontSize: "14px" }}
          />
          <Tab
            label="Personal Bests"
            {...a11yProps(2)}
            sx={{ width: "20%", fontSize: "14px" }}
          />
          <Tab
            label="Accolades"
            {...a11yProps(3)}
            sx={{ width: "20%", fontSize: "14px" }}
          />
          <Tab
            label="Results"
            {...a11yProps(4)}
            sx={{ width: "20%", fontSize: "16px" }}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {props.loadingNewAthlete ? (
          <div>
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
          </div>
        ) : (
          <div className={styles.summary}>{props.athlete.summary}</div>
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {topCompetitors &&
          topCompetitors.map((competitor, index) => (
            <div
              key={index}
              className={
                competitor.athlete_id
                  ? styles.competitor
                  : styles.competitorNoLink
              }
              onClick={() =>
                props.setAthleteFromTopCompetitors(competitor.athlete_id)
              }
            >
              <b style={{ marginLeft: "5px" }}>
                {normalizeName(competitor.athlete_name)}
              </b>
            </div>
          ))}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {props.athlete.personal_bests &&
          props.athlete.personal_bests.map((item, index) => (
            <div key={index} className={styles.pbItem}>
              <div className={styles.discipline}>{item.discipline}</div>
              <div className={styles.mark}>{item.result}</div>
            </div>
          ))}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        {props.athlete.accomplishments &&
          props.athlete.accomplishments.slice(0, 3).map((item, index) => (
            <div key={index} className={styles.pbItem}>
              <div className={styles.indicator}>{item.split("x")[0]}x</div>
              <div className={styles.mark}>{item.split("x")[1]}</div>
            </div>
          ))}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <DataTable
        athlete_data={props.athlete_data}
        loadingNewAthlete={props.loadingNewAthlete}
        />
      </CustomTabPanel>
    </Box>
  );
}
