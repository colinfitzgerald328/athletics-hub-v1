import * as React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "./styles.module.css";
import { useAthleteContext } from "@/app/components/athlete_context";

export default function BigGraph() {
  const { athlete } = useAthleteContext();
  const filteredResults = athlete.results
    .filter((result) => result.result_score !== 0)
    .reverse();

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className={styles.customTooltip}>
          <p className={styles.label}>{`Score: ${payload[0].value}`}</p>
          <p className={styles.secondaryLabel}>
            <b style={{ marginRight: "5px" }}>Mark:</b>
            {payload[0].payload.mark}
          </p>
          <p className={styles.secondaryLabel}>
            <b style={{ marginRight: "5px" }}>Event:</b>
            {payload[0].payload.discipline}
          </p>
          <p className={styles.secondaryLabel}>
            <b style={{ marginRight: "5px" }}>Competition:</b>
            {payload[0].payload.competition}
          </p>
          <p className={styles.secondaryLabel}>
            <b style={{ marginRight: "5px" }}>Date:</b>
            {payload[0].payload.date}
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <h2 className={styles.graphName}>
        Performance Graph for {athlete.athlete.first_name}{" "}
        {athlete.athlete.last_name}
      </h2>
      <ResponsiveContainer className={styles.graphHolder}>
        <LineChart
          data={filteredResults}
          margin={{
            top: 5,
            right: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={["dataMin - 100", "dataMax + 100"]} />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: "#325573", strokeDasharray: "3 3" }}
          />
          <Legend />
          <Line
            name="Result Score"
            type="monotone"
            dataKey="result_score"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
