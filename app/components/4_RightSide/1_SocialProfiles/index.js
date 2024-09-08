import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Skeleton } from "@mui/material";
import { useAthleteContext } from "../../athlete_context";

export default function SocialProfiles() {
  const { athlete, loadingNewAthlete } = useAthleteContext();

  const twitterHandle = getTwitterHandle(athlete.athlete.social_urls);
  const instagramHandle = getInstagramHandle(athlete.athlete.social_urls);

  function getTwitterHandle(socialUrls) {
    if (Object.keys(socialUrls).length == 0 || !socialUrls.length) {
      return;
    }

    const twitterObject = socialUrls.find((urlObject) =>
      urlObject.hasOwnProperty("twitter_url"),
    );

    if (!twitterObject) {
      return;
    }

    return twitterObject.twitter_url.split("/").pop();
  }

  function getInstagramHandle(socialUrls) {
    if (Object.keys(socialUrls).length == 0 || !socialUrls.length) {
      return;
    }

    const instagramObject = socialUrls.find((urlObject) =>
      urlObject.hasOwnProperty("instagram_url"),
    );

    if (!instagramObject) {
      return;
    }

    const regex = /(?:https?:\/\/)?(?:www\.)?instagram\.com\/([^\/?]+)/i;

    const match = instagramObject.instagram_url.match(regex);

    if (!match) {
      return;
    }

    return match[1];
  }

  return (
    <div>
      {(twitterHandle || instagramHandle) && (
        <div className={styles.socialProfiles}>
          <div className={styles.label}>Social Profiles</div>
          {twitterHandle &&
            (loadingNewAthlete ? (
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
            (loadingNewAthlete ? (
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
