import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAthleteContext } from "@/app/components/athlete_context";

export default function DataTable() {
  const { athlete } = useAthleteContext();
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
          {athlete.results.map((row) => (
            <TableRow
              key={row.discipline_code}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right">{row.mark}</TableCell>
              <TableCell align="right">{row.place.split(".")[0]}</TableCell>
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
