import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import styles from "./styles.module.css";

export default function RightSide(props) {
    const [twitterHandle, setTwitterHandle] = useState(null);
    const [instagramHandle, setInstagramHandle] = useState(null);

    useEffect(() => {
        // Extract Twitter handle when props.athlete changes
        const twitterHandle = getTwitterHandle(props.athlete.social_urls);
        setTwitterHandle(twitterHandle);

        // Extract Instagram handle when props.athlete changes
        const instagramHandle = getInstagramHandle(props.athlete.social_urls);
        setInstagramHandle(instagramHandle);
    }, [props.athlete.social_urls]);

    function getTwitterHandle(socialUrls) {
        if (!socialUrls) {
            return; 
        }
        const twitterObject = socialUrls.find(urlObject => urlObject.hasOwnProperty('twitter_url'));
        if (twitterObject) {
            const twitterUrl = twitterObject.twitter_url;
            const twitterHandle = twitterUrl.split('/').pop();
            return twitterHandle;
        } else {
            return null;
        }
    }

    function getInstagramHandle(socialUrls) {
        if (!socialUrls) {
            return;
        }
        const instagramObject = socialUrls.find(urlObject => urlObject.hasOwnProperty('instagram_url'));
    
        if (instagramObject) {
            const instagramUrl = instagramObject.instagram_url;
    
            // Check if the URL contains "/username/" or ends with "/username"
            const match = instagramUrl.match(/\/([^\/]+)\/?$/);
    
            if (match) {
                // Extract the username from the matched part
                const instagramHandle = match[1];
                return instagramHandle;
            } else {
                // If the URL doesn't match the expected format, return null
                return null;
            }
        } else {
            return null;
        }
    }
    

    return (
        <div className={styles.rightSide}>
            <Button
                sx={{
                    "width": "100%", 
                    "backgroundColor": "#323232",
                    "fontWeight": "bold", 
                    "borderRadius": "25px", 
                    "paddingTop": "10px", 
                    "paddingBottom": "10px", 
                    "fontSize": "18px", 
                }}
                variant="contained"
                onClick={() => window.open(props.athlete.wikipedia_url)}
            >
                DEEP DIVE
            </Button>
            {(twitterHandle || instagramHandle) &&
    <div className={styles.socialProfiles}>
        <div className={styles.label}>
            Social Profiles
        </div>
        {twitterHandle &&
            <div className={styles.socialItem}>
                <img
                    className={styles.socialIcon}
                    src={"https://about.twitter.com/content/dam/about-twitter/x/brand-toolkit/logo-black.png.twimg.1920.png"}
                />
                @{twitterHandle}
            </div>
        }
        {instagramHandle &&
            <div className={styles.socialItem}>
                <img
                    className={styles.socialIcon}
                    src={"https://cdn4.iconfinder.com/data/icons/social-media-black-white-2/600/Instagram_glyph_svg-512.png"}
                />
                @{instagramHandle}
            </div>
        }
    </div>
}

        </div>
    );
}
