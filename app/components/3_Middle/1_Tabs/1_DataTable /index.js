import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { Skeleton, Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function DataTable(props) {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    var element = document.getElementsByClassName(styles.tableContainer)[0];
    if (element) {
      var subtraction = props.height - 600 - element.scrollHeight;
      if (subtraction < 20) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    }
  });

  useEffect(() => {
    setScrolled(false);
  }, [props.athlete]);

  function scrollIntoView() {
    var element = document.getElementsByClassName(styles.tableContainer)[0];
    element.scrollIntoView({ behavior: "smooth" });
    setScrolled(true);
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Mark</TableCell>
            <TableCell align="right">Place</TableCell>
            <TableCell align="right">Discipline</TableCell>
            <TableCell align="right">Venue</TableCell>
            <TableCell align="right">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.athlete_data.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right">{row.mark}</TableCell>
              <TableCell align="right">
                {row.place ? row.place.split(".")[0] : "N/A"}
              </TableCell>
              <TableCell align="right">{row.discipline}</TableCell>
              <TableCell align="right">{row.venue}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
