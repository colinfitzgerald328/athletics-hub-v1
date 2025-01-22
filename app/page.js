"use client";
import MainComponent from "./components";
import styles from "./page.module.css";
import { useEffect } from "react";
import { AthleteProvider } from "./components/athlete_context";

export default function Home() {
  useEffect(() => {
    navigator.storage.estimate().then((estimate) => {
      console.log(`Quota: ${estimate.quota / 1024 / 1024} MB`);
      console.log(`Usage: ${estimate.usage / 1024 / 1024} MB`);
    });
  }, []);
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
