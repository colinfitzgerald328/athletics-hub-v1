import * as React from "react";
import Box from "@mui/material/Box";
import { PureComponent } from "react";
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
import Typography from "@mui/material/Typography";
import styles from "./styles.module.css";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: `calc(100% - 100px)`,
  height: 400,
  bgcolor: "#59252e",
  borderRadius: "30px",
  outline: "none",
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "30px",
};

export default function GraphModal(props) {
  const handleClose = () => props.closeGraphModal();

  const filteredResults = props.athlete_data
    .filter((result) => result.resultScore !== 0)
    .reverse();

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className={styles.customTooltip}>
          <p className={styles.label}>{`Score: ${payload[0].value}`}</p>
          <p className="label">
            <b style={{ marginRight: "5px" }}>Mark:</b>
            {payload[0].payload.mark}
          </p>
          <p className="label">
            <b style={{ marginRight: "5px" }}>Event:</b>
            {payload[0].payload.discipline}
          </p>
          <p className="label">
            <b style={{ marginRight: "5px" }}>Competition:</b>
            {payload[0].payload.competition}
          </p>
          <p className="label">
            <b style={{ marginRight: "5px" }}>Date:</b>
            {payload[0].payload.date}
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer className={styles.graphHolder}>
      <LineChart
        data={filteredResults}
        margin={{
          top: 5,
          right: 30,
          left: 20,
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
          dataKey="resultScore"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
