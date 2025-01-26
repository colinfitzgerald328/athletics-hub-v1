import React, { useState, useMemo } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useAthleteContext } from "@/app/components/athlete_context";

export default function DataTable() {
  const { athlete } = useAthleteContext();
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const years = useMemo(() => {
    const uniqueYears = [
      ...new Set(
        athlete.results.map((row) => new Date(row.date).getFullYear()),
      ),
    ].sort((a, b) => b - a);
    return uniqueYears;
  }, [athlete.results]);

  const filteredResults = useMemo(() => {
    return athlete.results.filter(
      (row) => new Date(row.date).getFullYear() === selectedYear,
    );
  }, [athlete.results, selectedYear]);

  if (athlete.results.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6">No results available</Typography>
      </Box>
    );
  }

  return (
    <>
      <FormControl sx={{ mb: 2, minWidth: 120 }}>
        <InputLabel id="year-select-label">Filter by Year</InputLabel>
        <Select
          labelId="year-select-label"
          value={selectedYear}
          label="Filter by Year"
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {years.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

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
            {filteredResults.length > 0 ? (
              filteredResults.map((row) => (
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography>No results found for {selectedYear}</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
