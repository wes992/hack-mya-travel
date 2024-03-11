import React, { ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const CommonTable = ({
  tableColumns = [] as string[],
  tableRows = [] as unknown[],
  renderRow = (e: any): ReactNode => undefined,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableColumns.map((col, index) => (
              <TableCell key={col + index}>{col}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{tableRows.map((row) => renderRow(row))}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default CommonTable;
