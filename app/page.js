"use client";
import MainComponent from "./components";
import styles from "./page.module.css";
// Import Mixpanel SDK
import mixpanel from "mixpanel-browser";
import { AthleteProvider } from "./components/athlete_context";

//Initialize Mixpanel
mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN, {
  debug: true,
  track_pageview: true,
  persistence: "localStorage",
});

export default function Home() {
  return (
    <main className={styles.main}>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
        crossOrigin="anonymous"
      ></link>
      <AthleteProvider>
        <MainComponent />
      </AthleteProvider>
    </main>
  );
}
