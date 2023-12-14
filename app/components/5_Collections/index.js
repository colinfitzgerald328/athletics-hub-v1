import React from "react";
import CreateCollectionModal from "./1_Create_Collection_Modal";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styles from "./styles.module.css";
import TimeAgo from 'javascript-time-ago'

// English.
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)

// Create formatter (English).
const timeAgo = new TimeAgo('en-US')

export default function Collections(props) {
  return (
    <div className={styles.basic}>
      <div className={styles.topItems}>
        <div onClick={() => props.closeCollections()} className={styles.goBack}>
          <ArrowBackIcon />
        </div>
        <div className={styles.createCollection}>
          <CreateCollectionModal
          getCollectionsForUser={props.getCollectionsForUser}
          />
        </div>
      </div>
      <div className={styles.contentHolder}>
        <div className={styles.collections}>
          {
            props.user_collections && 
            props.user_collections.map((collection, index) => 
            <div key={index} className={styles.collection}>
              <div className={styles.collectionName}>
              {
                collection.collection_name
              }
              </div>
              <div className={styles.collectionCreated}>
                Created {timeAgo.format(new Date(collection.created_at))}
              </div>
            </div>
            )
          }
        </div>
        <div className={styles.panel}></div>
      </div>
    </div>
  );
}
