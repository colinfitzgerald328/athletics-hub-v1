import React from "react";
import CreateCollectionModal from "./1_Create_Collection_Modal";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from "./styles.module.css";

export default function Collections(props) {
    return (
        <div className={styles.basic}>
            <div className={styles.topItems}>
            <div
            onClick={()=> props.closeCollections()}
            className={styles.goBack}>
                <ArrowBackIcon/>
                {/* <div className={styles.myCollections}>
                    My Collections
                </div> */}
            </div>
            <div className={styles.createCollection}>
            <CreateCollectionModal/>
            </div>
            </div>
            <div className={styles.contentHolder}>
            <div className={styles.collections}>
            </div>
            <div className={styles.panel}>
            </div>
            </div>
        </div>
    )
}