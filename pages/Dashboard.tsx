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
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    position: "sticky",
    top: 0,
    textAlign: "left",
    fontSize: "2xl",
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    textAlign: "left",
    overflow: "hidden",
    verticalAlign: "top",
    wordBreak: "break-word",
    textOverflow: "ellipsis",
  },
}));

const StyledTableRow = styled(TableRow)(({}) => ({
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(title: string, subtitle: string, tag: string, content: string, time: string, state: boolean) {
  return { title, subtitle, tag, content, time, state };
}

const rows = [
  createData(
    "標題123456標題1標標題123456標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1",
    "副標題1",
    "tag",
    "內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1",
    "2023/5/21",
    true,
  ),
  createData(
    "標題123456標題1標標題123456標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1標題1",
    "副標題1",
    "tag",
    "內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1內文1",
    "2023/5/21",
    true,
  ),
];
export default function CustomizedTables() {
  return (
    <TableContainer component={Paper} className="mt-3 mr-5 w-auto">
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center" colSpan={6} className="text-2xl">
              文章
            </StyledTableCell>
          </TableRow>
          <TableRow className="rounded-lg">
            <StyledTableCell className="text-base" sx={{ width: "20%" }}>
              標題
            </StyledTableCell>
            <StyledTableCell className="text-base" sx={{ width: "20%" }}>
              副標
            </StyledTableCell>
            <StyledTableCell className="text-base" sx={{ width: "10%" }}>
              tag
            </StyledTableCell>
            <StyledTableCell className="text-base" sx={{ width: "30%" }}>
              內文
            </StyledTableCell>
            <StyledTableCell className="text-base" sx={{ width: "10%" }}>
              時間
            </StyledTableCell>
            <StyledTableCell className="text-base" sx={{ width: "10%" }}>
              狀態
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <StyledTableRow key={row.title}>
              <StyledTableCell component="th" scope="row">
                <div className="h-24 overflow-hidden text-base">{row.title}</div>
              </StyledTableCell>
              <StyledTableCell component="th" scope="row" className="overflow-hidden text-base ">
                {row.subtitle}
              </StyledTableCell>
              <StyledTableCell align="left">
                <div className="overflow-hidden text-base">{row.tag}</div>
              </StyledTableCell>
              <StyledTableCell align="left">
                <div className="h-24 overflow-hidden text-ellipsis text-base">{row.content}</div>
              </StyledTableCell>
              <StyledTableCell align="left">
                <div className="overflow-hidden text-base">{row.time}</div>
              </StyledTableCell>
              <StyledTableCell align="left">
                <div className="overflow-hidden text-base">{row.state.toString()}</div>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
