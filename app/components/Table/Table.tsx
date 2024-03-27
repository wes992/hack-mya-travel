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
  const getDisplayProp = (col: string) => {
    if (col.toLowerCase() === "action") {
      return { xs: "none", md: "table-cell" };
    }
    if (col.toLowerCase() === "description") {
      return { xs: "none", md: "table-cell" };
    }
    return "table-cell";
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableColumns.map((col, index) => (
              <TableCell
                key={col + index}
                sx={{ display: getDisplayProp(col) }}
              >
                {col}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{tableRows.map((row) => renderRow(row))}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default CommonTable;
