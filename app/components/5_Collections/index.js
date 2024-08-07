import React, { useEffect, useRef, useState } from "react";
import CreateCollectionModal from "./1_Create_Collection_Modal";
import { Button } from "@mui/joy";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import styles from "./styles.module.css";
import CollectionTabs from "./5_Tabs";
import AddToCollectionModal from "./2_Add_To_Collection_Modal";
import DeleteOptionMenu from "./3_DeleteOption";
import CollectionDeleteOption from "./4_MenuDeleteOption";
import moment from "moment";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { toaster } from "evergreen-ui";
import * as API from "/app/api/api.js";
import { modifyCollection } from "/app/api/api.js";

export default function Collections(props) {
  const [collections, setCollections] = useState(props.user_collections);
  const [currentIndex, setCurrentIndex] = useState(0);
  const editingRef = useRef(null);
  useOutsideAlerter(editingRef);

  async function updateSummaryStyle(athlete, index) {
    const currentCollections = collections;
    const theItem = currentCollections[currentIndex].detailed_athletes[index];
    var element = document.getElementById(index);
    var newScrollHeight = element.scrollHeight + "px";
    if (theItem.height == undefined) {
      theItem.height = newScrollHeight;
      setCollections([...currentCollections]);
      // const data_fetch_results = await getDataForAthlete(athlete);
      // theItem.top_competitors = data_fetch_results.top_competitors;
    } else if (theItem.height != "0px") {
      theItem.height = "0px";
    } else {
      theItem.height = newScrollHeight;
    }
    setCollections([...currentCollections]);
  }

  function handleSelect(index) {
    setCurrentIndex(index);
  }

  useEffect(() => {
    setCollections(props.user_collections);
  }, [props.user_collections]);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      if (!props.showingCollections) {
        return
      }
      
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          checkForNameChangeAndSendAPICall(collections, currentIndex);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, collections, currentIndex]);
  }

  function handleChangeName(newName) {
    const newCollections = [...collections];
    newCollections[currentIndex].collection_name = newName;
    setCollections(newCollections);
  }

  async function checkForNameChangeAndSendAPICall(collections, currentIndex) {
    console.log("called from here")
    if (collections.length == 0) {
      // if there are no collections, do nothing
      return;
    }
    const response = await modifyCollection(
      collections[currentIndex].collection_name,
      "UPDATE_NAME",
      collections[currentIndex]["id"],
      null,
      null
    )
    if (response.name_was_updated) {
      toaster.success("Collection name updated");
      props.getCollectionsForUser();
    }
  }

  function handleCloseCollections() {
    var element = document.getElementsByClassName(
      props.isMobile ? styles.mobileBasic : styles.basic,
    )[0];
    element.classList.add(styles.dismiss);
    props.closeCollections();
    setTimeout(() => {
      element.classList.remove(styles.dismiss);
      element.classList.remove(styles.show);
    }, 300);
  }

  function handleShowCollections() {
    setTimeout(() => {
      var element = document.getElementsByClassName(
        props.isMobile ? styles.mobileBasic : styles.basic,
      )[0];
      element.classList.add(styles.show);
    }, 300);
  }

  useEffect(() => {
    if (props.showingCollections) {
      handleShowCollections();
    } else if (!props.showingCollections) {
      handleCloseCollections();
    }
  }, [props.showingCollections]);

  return (
    <div className={props.isMobile ? styles.mobileBasic : styles.basic}>
      <div className={styles.topItemsForMenu}>
        <div className={styles.createCollection}>
          <CreateCollectionModal
            getCollectionsForUser={props.getCollectionsForUser}
            isMobile={props.isMobile}
          />
        </div>
        <div onClick={() => handleCloseCollections()}>
          <IconButton
            size="small"
            sx={{
              marginLeft: "10px",
            }}
          >
            <ArrowDownwardIcon />
          </IconButton>
        </div>
      </div>
      {props.user_collections.length > 0 ? (
        <div className={styles.contentHolder}>
          <div className={styles.collections}>
            {props.user_collections.map((collection, index) => (
              <div
                onClick={() => handleSelect(index)}
                key={index}
                className={
                  currentIndex == index ? styles.selected : styles.collection
                }
              >
                <div className={styles.leftItems}>
                  <div className={styles.collectionName}>
                    {collection.collection_name}
                  </div>
                  <div className={styles.collectionCreated}>
                    Created{" "}
                    {moment.utc(collection.created_at).local().fromNow()}
                  </div>
                </div>
                <div>
                  <CollectionDeleteOption
                    collection_id={collection["id"]}
                    getCollectionsForUser={props.getCollectionsForUser}
                    currentIndex={currentIndex}
                    handleSelect={handleSelect}
                    itemIndex={index}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className={styles.panel}>
            <div className={styles.textLabels}>
              <input
                ref={editingRef}
                onChange={(e) => handleChangeName(e.target.value)}
                value={
                  collections.length > 0
                    ? collections[currentIndex].collection_name
                    : []
                }
                className={styles.collectionLabel}
              ></input>
              <AddToCollectionModal
                currentIndex={currentIndex}
                user_collections={props.user_collections}
                getCollectionsForUser={props.getCollectionsForUser}
                collectionName={
                  props.user_collections[currentIndex].collection_name
                }
                isMobile={props.isMobile}
              />
            </div>

            {collections[currentIndex]?.detailed_athletes.map(
              (athlete, index) => (
                <div key={index} className={styles.competitor}>
                  <div className={styles.topItems}>
                    <img
                      className={styles.competitorImage}
                      src={
                        athlete.json_data.athlete.hq_images
                          ? athlete.json_data.athlete.hq_images[0]
                          : ""
                      }
                    />
                    <div className={styles.criticalInfo}>
                      <div className={styles.leftItems}>
                        <div className={styles.competitorName}>
                          {athlete.json_data.athlete.first_name}{" "}
                          {athlete.json_data.athlete.last_name}
                        </div>
                        <div className={styles.disciplines}>
                          {athlete.json_data.athlete.primary_disciplines}
                        </div>
                      </div>
                      <div className={styles.rightItemsContainer}>
                        <DeleteOptionMenu
                          athlete_id={athlete.athlete_id}
                          collection_id={
                            props.user_collections.length > 0 &&
                            props.user_collections[currentIndex]["id"]
                          }
                          getCollectionsForUser={props.getCollectionsForUser}
                        />
                        <div
                          onClick={() => updateSummaryStyle(athlete, index)}
                          className={styles.rightItems}
                        >
                          {athlete.json_data.athlete.markdown_summary &&
                            (athlete.height && athlete.height != "0px" ? (
                              <IconButton
                                size="small"
                                aria-controls={
                                  open ? "account-menu" : undefined
                                }
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                                sx={{
                                  padding: 1,
                                }}
                              >
                                <KeyboardArrowUpIcon
                                  sx={{ fontWeight: "bold" }}
                                />
                              </IconButton>
                            ) : (
                              <IconButton
                                size="small"
                                aria-controls={
                                  open ? "account-menu" : undefined
                                }
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
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
                  </div>
                  <div
                    id={index}
                    className={styles.competitorSummary}
                    style={{ height: athlete.height, overflow: "scroll" }}
                  >
                    <CollectionTabs
                      athlete={athlete.json_data.athlete}
                      loadingNewAthlete={false}
                      athlete_data={athlete.json_data.results || []}
                      top_competitors={athlete.json_data.top_competitors}
                    />
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      ) : (
        <CreateCollectionModal
          isMobile={props.isMobile}
          getCollectionsForUser={props.getCollectionsForUser}
        />
      )}
    </div>
  );
}
