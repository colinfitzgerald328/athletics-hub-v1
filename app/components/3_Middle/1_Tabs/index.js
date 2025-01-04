import React, { useState, useEffect, use } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Skeleton } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ConstructionIcon from "@mui/icons-material/Construction";
import DataTable from "./1_DataTable ";
import styles from "./styles.module.css";
import { useTheme } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useAthleteContext } from "../../athlete_context";

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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

export default function BasicTabs() {
  const { loadingNewAthlete, athlete, fetchAthleteById } = useAthleteContext();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: "25px",
        backgroundColor: "white",
        // height: "calc(100% - 310px)",
        overflowY: "scroll",
        marginTop: "10px",
        position: "relative",
        "::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Box
        sx={{
          paddingLeft: "25px",
          marginTop: "10px",
          marginBottom: "10px",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Competition" {...a11yProps(1)} />
          <Tab label="PBs" {...a11yProps(2)} />
          <Tab label="Accolades" {...a11yProps(3)} />
          <Tab label="Results" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0} dir={theme.direction}>
        {athlete.top_competitors.length == 0 ? (
          <div className={styles.nothingHereYet}>
            <ConstructionIcon /> Nothing here yet! As our data team improves,
            top competitors will populate for this athlete.
          </div>
        ) : (
          athlete.top_competitors.map((competitor) => (
            <div key={competitor.athlete_id} className={styles.competitor}>
              <div className={styles.topItems}>
                {loadingNewAthlete ? (
                  <Skeleton
                    sx={{ borderRadius: "15px" }}
                    animation="wave"
                    variant="rectangular"
                    width={90}
                    height={80}
                  />
                ) : (
                  <img
                    loading="lazy"
                    className={styles.competitorImage}
                    src={
                      competitor.hq_images
                        ? competitor.hq_images[0]
                        : competitor.hq_image_url
                          ? competitor.hq_image_url
                          : "https://cdn.pixabay.com/photo/2014/04/03/11/07/running-311805_640.png"
                    }
                  />
                )}
                <div className={styles.criticalInfo}>
                  <div className={styles.leftItems}>
                    {loadingNewAthlete ? (
                      <Skeleton
                        animation="wave"
                        variant="rectangular"
                        width={150}
                        height={18}
                      />
                    ) : (
                      <div
                        onClick={() => fetchAthleteById(competitor.athlete_id)}
                        className={styles.competitorName}
                      >
                        {competitor.first_name} {competitor.last_name}
                      </div>
                    )}
                    {loadingNewAthlete ? (
                      <Skeleton
                        animation="wave"
                        variant="rectangular"
                        width={300}
                        height={18}
                        sx={{ marginTop: "5px" }}
                      />
                    ) : (
                      <div className={styles.disciplines}>
                        {competitor.primary_disciplines}
                      </div>
                    )}
                  </div>
                  <div
                    onClick={() => updateSummaryStyle(competitor)}
                    className={styles.rightItems}
                  >
                    {competitor.summary &&
                      (competitor.height && competitor.height != "0px" ? (
                        <IconButton
                          size="small"
                          sx={{
                            padding: 1,
                          }}
                        >
                          <KeyboardArrowUpIcon sx={{ fontWeight: "bold" }} />
                        </IconButton>
                      ) : (
                        <IconButton
                          size="small"
                          sx={{
                            padding: 1,
                          }}
                        >
                          <KeyboardArrowDownIcon />
                        </IconButton>
                      ))}
                  </div>
                </div>
              </div>
              <div
                className={styles.competitorSummary}
                style={{ height: competitor.height }}
              >
                {competitor.summary}
              </div>
            </div>
          ))
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {athlete.athlete.personal_bests &&
          athlete.athlete.personal_bests.map(
            (item, index) =>
              item &&
              item.discipline &&
              item.result && (
                <div key={item.discipline} className={styles.pbItem}>
                  {loadingNewAthlete ? (
                    <Skeleton
                      sx={{ marginBottom: "5px" }}
                      variant="rectangular"
                      animation="wave"
                      width={100}
                      height={18}
                    />
                  ) : (
                    <div key={item.discipline} className={styles.discipline}>
                      {item.discipline}
                    </div>
                  )}
                  {loadingNewAthlete ? (
                    <Skeleton
                      variant="rectangular"
                      animation="wave"
                      sx={{
                        marginBottom: "5px",
                      }}
                      width={120}
                      height={35}
                    />
                  ) : (
                    <div className={styles.mark}>
                      {item.result}{" "}
                      {item.records.length > 0 &&
                        item.records.map((record, index) => (
                          <div key={record} className={styles.record}>
                            {index == item.records.length - 1
                              ? record
                              : record + ","}
                          </div>
                        ))}
                    </div>
                  )}
                  {loadingNewAthlete ? (
                    <Skeleton
                      variant="rectangular"
                      animation="wave"
                      width={400}
                      height={14}
                    />
                  ) : (
                    <div className={styles.competition}>{item.competition}</div>
                  )}
                </div>
              ),
          )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {athlete.athlete.accomplishments &&
          (athlete.athlete.accomplishments.length == 0 ? (
            <div className={styles.nothingHereYet}>
              <ConstructionIcon /> Nothing here yet! As our data team improves,
              accomplishments will populate for this athlete.
            </div>
          ) : (
            athlete.athlete.accomplishments.slice(0, 3).map((item) => (
              <div key={item} className={styles.accomplishmentHolder}>
                {loadingNewAthlete ? (
                  <Skeleton animation="wave" width={300} height={50} />
                ) : (
                  <div style={{ display: "flex", alignItems: "last baseline" }}>
                    <div className={styles.indicator}>
                      {item.split("x")[0]}x
                    </div>
                    <div className={styles.accomplishment}>
                      {item.split("x")[1]}
                    </div>
                  </div>
                )}
              </div>
            ))
          ))}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <DataTable />
      </CustomTabPanel>
    </Box>
  );
}
