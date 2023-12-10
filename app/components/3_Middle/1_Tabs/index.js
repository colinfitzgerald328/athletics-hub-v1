import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
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

  const normalizeName = (name) => {
    // Implement your normalizeName function
    return name;
  };

  console.log(topCompetitors);

  return (
    <Box
      sx={{
        width: "100%",
        borderBottomLeftRadius: "25px",
        borderBottomRightRadius: "25px"
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Summary" {...a11yProps(0)} />
          <Tab label="Competition" {...a11yProps(1)} />
          <Tab label="Personal Bests" {...a11yProps(2)} />
          <Tab label="Accolades" {...a11yProps(3)} />
          <Tab label="Results" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {props.athlete.summary}
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
              {index + 1}.{" "}
              <b style={{ marginLeft: "5px" }}>
                {normalizeName(competitor.athlete_name)}
              </b>
            </div>
          ))}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Personal Bests
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Accolades
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        Results
      </CustomTabPanel>
    </Box>
  );
}
