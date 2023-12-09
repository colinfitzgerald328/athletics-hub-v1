import React, { useState } from "react";
import Button from '@mui/material/Button';
import styles from "./styles.module.css";

export default function RightSide(props) {
    return (
        <div className={styles.rightSide}>
            <Button
            className={styles.customButton}
            variant="contained"
            onClick={()=> window.open(props.athlete.wikipedia_url)}
            >DEEP DIVE
            </Button>
            <div className={styles.socialProfiles}>
                <div className={styles.label}>
                Social Profiles
                </div>
                <div className={styles.socialItem}>
                <img
                className={styles.socialIcon}
                src={"https://about.twitter.com/content/dam/about-twitter/x/brand-toolkit/logo-black.png.twimg.1920.png"}/>
                                @hurtasage
                </div>
                <div className={styles.socialItem}>
                                <img
                className={styles.socialIcon}
                src={"https://cdn4.iconfinder.com/data/icons/social-media-black-white-2/600/Instagram_glyph_svg-512.png"}/>
                @hurtasage
                </div>
            </div>
        </div>
        
    )
}