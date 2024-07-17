import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Skeleton } from "@mui/material";

export default function SocialProfiles(props) {
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

    if (Object.keys(socialUrls).length == 0) {
      return; 
    }

    if (!socialUrls.length) {
      return; 
    }
    
    const twitterObject = socialUrls.find((urlObject) =>
        urlObject.hasOwnProperty("twitter_url"),
    );

    if (!twitterObject) {
      return; 
    }

    const twitterUrl = twitterObject.twitter_url;
    const twitterHandle = twitterUrl.split("/").pop();
    return twitterHandle;
  }

  function getInstagramHandle(socialUrls) {
    if (Object.keys(socialUrls).length == 0) {
      return; 
    }

    if (!socialUrls.length) {
      return; 
    }

    const instagramObject = socialUrls.find((urlObject) =>
      urlObject.hasOwnProperty("instagram_url"),
    );

    if (!instagramObject) {
      return 
    }

    const instagramUrl = instagramObject.instagram_url;

    const regex = /(?:https?:\/\/)?(?:www\.)?instagram\.com\/([^\/?]+)/i;

    const match = instagramUrl.match(regex);

    if (!match) {
      return; 
    }

    const instagramHandle = match[1];
    return instagramHandle;

  }

  return (
    <div>
      {(twitterHandle || instagramHandle) && (
        <div className={styles.socialProfiles}>
          <div className={styles.label}>Social Profiles</div>
          {twitterHandle &&
            (props.loadingNewAthlete ? (
              <Skeleton width={120} animation="wave"></Skeleton>
            ) : (
              <div className={styles.socialItem}>
                <img
                  className={styles.socialIcon}
                  src={
                    "https://about.twitter.com/content/dam/about-twitter/x/brand-toolkit/logo-black.png.twimg.1920.png"
                  }
                />
                <div
                  className={styles.socialHandle}
                  onClick={() =>
                    window.open("https://www.twitter.com/" + twitterHandle)
                  }
                >
                  @{twitterHandle}
                </div>
              </div>
            ))}
          {instagramHandle &&
            (props.loadingNewAthlete ? (
              <Skeleton width={120} animation="wave"></Skeleton>
            ) : (
              <div className={styles.socialItem}>
                <img
                  className={styles.socialIcon}
                  src={
                    "https://cdn4.iconfinder.com/data/icons/social-media-black-white-2/600/Instagram_glyph_svg-512.png"
                  }
                />
                <div
                  className={styles.socialHandle}
                  onClick={() =>
                    window.open("https://www.instagram.com/" + instagramHandle)
                  }
                >
                  @{instagramHandle}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
