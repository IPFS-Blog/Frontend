import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    position: "sticky",
    top: 0,
    textAlign: "left",
    fontSize: "2xl",
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    textAlign: "left",
    verticalAlign: "top",
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
    false,
  ),
];

function renderButton(isTrue: any) {
  if (isTrue) {
    return (
      <button className=" mx-5 rounded-full border  bg-blue-500 py-2 px-10 font-semibold  text-white tablet:mx-2 tablet:px-5">
        已發布
      </button>
    );
  } else {
    return (
      <button className="mx-5 rounded-full border bg-yellow-400 py-2 px-10 font-semibold text-white tablet:mx-2 tablet:px-5">
        草稿
      </button>
    );
  }
}
export default function CustomizedTables() {
  return (
    <TableContainer component={Paper} className="mt-3 mr-5 w-auto">
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center" colSpan={6} className="bg-purple-100 text-2xl">
              文章
            </StyledTableCell>
          </TableRow>
          <TableRow className="rounded-lg ">
            <StyledTableCell className="bg-blue-300 text-base" sx={{ width: "20%" }}>
              標題
            </StyledTableCell>
            <StyledTableCell className="bg-blue-300 text-base" sx={{ width: "20%" }}>
              副標
            </StyledTableCell>
            <StyledTableCell className="bg-blue-300 text-base" sx={{ width: "10%" }}>
              tag
            </StyledTableCell>
            <StyledTableCell className="bg-blue-300 text-base" sx={{ width: "30%" }}>
              內文
            </StyledTableCell>
            <StyledTableCell className="bg-blue-300 text-base" sx={{ width: "10%" }}>
              時間
            </StyledTableCell>
            <StyledTableCell className="bg-blue-300 text-base" sx={{ width: "10%" }}>
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
              <StyledTableCell align="left">{renderButton(row.state)}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
