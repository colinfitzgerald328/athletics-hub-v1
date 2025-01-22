import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAthleteContext } from "../../athlete_context";

const DataTable: React.FC = () => {
  const { athlete } = useAthleteContext();

  return (
    <ScrollArea className="h-[400px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Event</TableHead>
            <TableHead>Result</TableHead>
            <TableHead>Place</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {athlete.results.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.discipline}</TableCell>
              <TableCell>{row.mark}</TableCell>
              <TableCell>{row.place}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

export default DataTable;
