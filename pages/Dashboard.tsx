import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    position: "sticky",
    top: 0,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(title: string, subtitle: string, content: string, time: string, state: boolean) {
  return { title, subtitle, content, time, state };
}

const rows = [
  createData("標題1", "副標題1", "內文1", "2023/5/21", true),
  // ... (略去其余数据)
  createData("標題6", "副標題6", "內文6", "2023/5/21", true),
  createData("標題6", "副標題6", "內文6", "2023/5/21", true),
  createData("標題6", "副標題6", "內文6", "2023/5/21", true),
  createData("標題6", "副標題6", "內文6", "2023/5/21", true),
  createData("標題6", "副標題6", "內文6", "2023/5/21", true),
  createData("標題6", "副標題6", "內文6", "2023/5/21", true),
  createData("標題6", "副標題6", "內文6", "2023/5/21", true),
  createData("標題6", "副標題6", "內文6", "2023/5/21", true),
  createData("標題6", "副標題6", "內文6", "2023/5/21", true),
  createData("標題6", "副標題6", "內文6", "2023/5/21", true),
  createData("標題6", "副標題6", "內文6", "2023/5/21", true),
  createData("標題6", "副標題6", "內文6", "2023/5/21", true),
  createData("標題6", "副標題6", "內文6", "2023/5/21", true),
  createData("標題6", "副標題6", "內文6", "2023/5/21", true),
  createData("標題6", "副標題6", "內文6", "2023/5/21", true),
  createData("標題6", "副標題6", "內文6", "2023/5/21", true),
  createData("標題6", "副標題6", "內文6", "2023/5/21", true),
  createData("標題6", "副標題6", "內文6", "2023/5/21", true),
  createData("標題6", "副標題6", "內文6", "2023/5/21", true),
  createData("標題6", "副標題6", "內文6", "2023/5/21", true),
  createData("標題6", "副標題6", "內文6", "2023/5/21", true),
  createData("標題6", "副標題6", "內文6", "2023/5/21", true),
  createData("標題6", "副標題6", "內文6", "2023/5/21", true),
  createData("標題6", "副標題6", "內文6", "2023/5/21", true),
  createData("標題6", "副標題6", "內文6", "2023/5/21", true),
  createData("標題6", "副標題6", "內文6", "2023/5/21", true),
  createData("標題6", "副標題6", "內文6", "2023/5/21", true),
  createData("標題6", "副標題6", "內文6", "2023/5/21", true),
  createData("標題6", "副標題6", "內文6", "2023/5/21", true),
  createData("標題6", "副標題6", "內文6", "2023/5/21", true),
  createData("標題6", "副標題6", "內文6", "2023/5/21", true),
  createData("標題6", "副標題6", "內文6", "2023/5/21", true),
  createData("標題6", "副標題6", "內文6", "2023/5/21", true),
  createData("標題6", "副標題6", "內文6", "2023/5/21", true),
  createData("標題6", "副標題6", "內文6", "2023/5/21", true),
];
export default function CustomizedTables() {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: "200vh", overflow: "auto" }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead sx={{ maxHeight: "900px" }}>
          <TableRow>
            <StyledTableCell align="center" colSpan={5}>
              文章
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell align="right">標題</StyledTableCell>
            <StyledTableCell align="right">副標</StyledTableCell>
            <StyledTableCell align="right">內文</StyledTableCell>
            <StyledTableCell align="right">時間</StyledTableCell>
            <StyledTableCell align="right">狀態</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <StyledTableRow key={row.title}>
              <StyledTableCell component="th" scope="row">
                {row.title}
              </StyledTableCell>
              <StyledTableCell align="right">{row.subtitle}</StyledTableCell>
              <StyledTableCell align="right">{row.content}</StyledTableCell>
              <StyledTableCell align="right">{row.time}</StyledTableCell>
              <StyledTableCell align="right">{row.state}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
