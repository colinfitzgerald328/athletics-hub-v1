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
import { useTheme } from '@mui/material/styles';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

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

export default function BasicTabs(props) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [topCompetitors, setTopCompetitors] = useState(props.top_competitors);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setTopCompetitors(props.top_competitors);
  }, [props.top_competitors]);

  useEffect(() => {
    setTopCompetitors(topCompetitors);
  }, [topCompetitors]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function updateSummaryStyle(competitor) {
    var elements = document.getElementsByClassName(styles.competitorSummary);
    var newScrollHeight;

    for (let item of elements) {
      if (item.textContent == competitor.summary) {
        newScrollHeight = item.scrollHeight + "px";
      }
    }

    for (let i = 0; i < topCompetitors.length; i++) {
      if (topCompetitors[i].aaAthleteId == competitor.aaAthleteId) {
        if (topCompetitors[i].height == undefined) {
          topCompetitors[i].height = newScrollHeight;
        } else if (topCompetitors[i].height != "0px") {
          topCompetitors[i].height = "0px";
        } else {
          topCompetitors[i].height = newScrollHeight;
        }
      }
    }

    setTopCompetitors([...topCompetitors]);
  }

  useEffect(() => {
    var element = document.getElementsByClassName(styles.summary)[0];
    if (element) {
      var subtraction = props.height - 500 - element.scrollHeight;
      if (subtraction < 20) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    }
  });

  useEffect(() => {
    setScrolled(false);
  }, [props.athlete]);

  function scrollIntoView() {
    var element = document.getElementsByClassName(styles.summary)[0];
    element.scrollIntoView({ behavior: "smooth" });
    setScrolled(true);
  }

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: "25px",
        backgroundColor: "white",
        height: "calc(100% - 360px)",
        overflowY: "scroll",
        marginTop: "10px",
        position: "relative",
        "::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            fontFamily: 'Bricolage Grotesque, sans-serif',
            '& .MuiTabs-indicator': {
              display: 'flex',
              justifyContent: 'center',
              backgroundColor: 'transparent',
            },
            '& .MuiTabs-indicatorSpan': {
              maxWidth: 40,
              width: '100%',
              backgroundColor: '#635ee7',
            },
          }}
        >
          <Tab
            label="Summary"
            {...a11yProps(0)}
            sx={{
              fontFamily: 'Bricolage Grotesque, sans-serif',
              color: "black", 
              width: "20%",
              fontSize: "14px",
              borderRadius: "25px",
              transition: "background-color 0.5s ease-in-out",
              "&.Mui-selected": {
                borderRadius: "25px",
                backgroundColor: "#E7E7E7",
                color: "black", 
                fontWeight: "bold"
              },
              "&:hover": {
                backgroundColor: "#E7E7E7",
                borderRadius: "25px",
              }
            }}
          />
          <Tab
            label="Competition"
            {...a11yProps(1)}
            sx={{
              fontFamily: 'Bricolage Grotesque, sans-serif',
              color: "black", 
              width: "20%",
              fontSize: "14px",
              borderRadius: "25px",
              transition: "background-color 0.5s ease-in-out",
              "&.Mui-selected": {
                borderRadius: "25px",
                backgroundColor: "#E7E7E7",
                color: "black", 
                fontWeight: "bold"
              },
              "&:hover": {
                backgroundColor: "#E7E7E7",
                borderRadius: "25px",
              }
            }}
          />
          <Tab
            label="PBs"
            {...a11yProps(2)}
            sx={{
              fontFamily: 'Bricolage Grotesque, sans-serif',
              color: "black", 
              width: "20%",
              fontSize: "14px",
              borderRadius: "25px",
              transition: "background-color 0.5s ease-in-out",
              "&.Mui-selected": {
                borderRadius: "25px",
                backgroundColor: "#E7E7E7",
                color: "black", 
                fontWeight: "bold"
              },
              "&:hover": {
                backgroundColor: "#E7E7E7",
                borderRadius: "25px",
              }
            }}
          />
          <Tab
            label="Accolades"
            {...a11yProps(3)}
            sx={{
              fontFamily: 'Bricolage Grotesque, sans-serif',
              color: "black", 
              width: "20%",
              fontSize: "14px",
              borderRadius: "25px",
              transition: "background-color 0.5s ease-in-out",
              "&.Mui-selected": {
                borderRadius: "25px",
                backgroundColor: "#E7E7E7",
                color: "black", 
                fontWeight: "bold"
              },
              "&:hover": {
                backgroundColor: "#E7E7E7",
                borderRadius: "25px",
              }
            }}
          />
          <Tab
            label="Results"
            {...a11yProps(4)}
            sx={{
              fontFamily: 'Bricolage Grotesque, sans-serif',
              color: "black", 
              width: "20%",
              fontSize: "14px",
              borderRadius: "25px",
              transition: "background-color 0.5s ease-in-out",
              "&.Mui-selected": {
                borderRadius: "25px",
                backgroundColor: "#E7E7E7",
                color: "black", 
                fontWeight: "bold"
              },
              "&:hover": {
                backgroundColor: "#E7E7E7",
                borderRadius: "25px",
              }
            }}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {/* {showScrollButton && !scrolled && !props.loadingNewAthlete ? (
          <Button
            onClick={() => scrollIntoView()}
            sx={{
              width: "150px",
              height: "50px",
              backgroundColor: "#323232",
              fontWeight: "bold",
              borderRadius: "25px",
              paddingTop: "10px",
              paddingBottom: "10px",
              fontSize: "18px",
              color: "white",
            }}
            variant="contained"
            style={{
              position: "absolute",
              top: props.height - 540 + "px",
              zIndex: "1000",
              right: 0,
            }}
          >
            Scroll
          </Button>
        ) : (
          ""
        )} */}
        {props.loadingNewAthlete || props.athlete.summary == undefined ? (
          <div>
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
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
      <CustomTabPanel value={value} index={1} dir={theme.direction}>
        {topCompetitors &&
          (topCompetitors.length == 0 ? (
            <div className={styles.nothingHereYet}>
              <ConstructionIcon /> Nothing here yet! As our data team improves,
              top competitors will populate for this athlete.
            </div>
          ) : (
            topCompetitors.map((competitor, index) => (
              <div key={index} className={styles.competitor}>
                <div className={styles.topItems}>
                  {props.loadingNewAthlete ? (
                    <Skeleton
                      sx={{ borderRadius: "15px" }}
                      animation="wave"
                      variant="rectangular"
                      width={90}
                      height={80}
                    />
                  ) : (
                    <img
                      className={styles.competitorImage}
                      src={competitor.hq_image_url}
                    />
                  )}
                  <div className={styles.criticalInfo}>
                    <div className={styles.leftItems}>
                      {props.loadingNewAthlete ? (
                        <Skeleton
                          animation="wave"
                          variant="rectangular"
                          width={150}
                          height={18}
                        />
                      ) : (
                        <div
                          onClick={() =>
                            props.setAthleteFromTopCompetitors(
                              competitor.aaAthleteId,
                            )
                          }
                          className={styles.competitorName}
                        >
                          {competitor.full_name}
                        </div>
                      )}
                      {props.loadingNewAthlete ? (
                        <Skeleton
                          animation="wave"
                          variant="rectangular"
                          width={300}
                          height={18}
                          sx={{ marginTop: "5px" }}
                        />
                      ) : (
                        <div className={styles.disciplines}>
                          {competitor.disciplines}
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
          ))}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {props.athlete.personal_bests &&
          props.athlete.personal_bests.map(
            (item, index) =>
              item &&
              item.discipline &&
              item.result && (
                <div key={index} className={styles.pbItem}>
                  {props.loadingNewAthlete ? (
                    <Skeleton sx={{"marginBottom": "5px"}} variant="rectangular" animation="wave" width={100} height={18} />
                  ) : (
                    <div className={styles.discipline}>{item.discipline}</div>
                  )}
                  {props.loadingNewAthlete ? (
                    <Skeleton
                      variant="rectangular"
                      animation="wave"
                      sx={{
                        marginBottom: "5px"
                      }}
                      width={120}
                      height={35}
                    />
                  ) : (
                    <div className={styles.mark}>{item.result} {item.records.length > 0 && item.records.map((record, index)=>
                      <div key={index} className={styles.record}>
                        {
                          index == item.records.length - 1 ? record : record + ","
                        }
                      </div>
                    )}</div>
                  )}
                  {props.loadingNewAthlete ? (
                    <Skeleton
                      variant="rectangular"
                      animation="wave"
                      width={400}
                      height={14}
                    />
                  )
                  :

                  <div className={styles.competition}>
                    {item.competition}
                  </div>
}
                </div>
              ),
          )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        {props.athlete.accomplishments &&
          (props.athlete.accomplishments.length == 0 ? (
            <div className={styles.nothingHereYet}>
              <ConstructionIcon /> Nothing here yet! As our data team improves,
              accomplishments will populate for this athlete.
            </div>
          ) : (
            props.athlete.accomplishments.slice(0, 3).map((item, index) => (
              <div key={index} className={styles.accomplishmentHolder}>
                {props.loadingNewAthlete ? (
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
      <CustomTabPanel value={value} index={4}>
        <DataTable
          athlete_data={props.athlete_data}
          loadingNewAthlete={props.loadingNewAthlete}
          height={props.height}
        />
      </CustomTabPanel>
    </Box>
  );
}
