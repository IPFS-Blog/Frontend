import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Web3 from "web3";

import { ArticleHistoryFunction } from "@/helpers/Contract/ArticleHistoryFunction";

interface Articles {
  hashCode: string;
  creationTime: number;
}

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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables() {
  // 處理相關函式
  const [rows, setRows] = useState<Articles[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getAllArticles = async (id: string) => {
      const articleId = parseInt(id);
      try {
        const { ethereum } = window;
        if (ethereum) {
          const accountAddress = process.env.NEXT_PUBLIC_ArticlesHistoryAddress;
          const web3 = new Web3(window.ethereum);
          await ethereum.enable();

          // 導入超級帳號
          const SupperAccounts = await web3.eth.accounts.privateKeyToAccount(`${process.env.NEXT_PUBLIC_UserKey}`);
          web3.eth.accounts.wallet.add(SupperAccounts);

          const contractABI = ArticleHistoryFunction();
          const articleContract = new web3.eth.Contract(contractABI, accountAddress);
          const result = await articleContract.methods.getArticle(articleId).call({ from: SupperAccounts.address });

          console.log("SupperAccounts.address", SupperAccounts.address);

          const articlesData = result.map((article: any) => ({
            hashCode: article.hashCode,
            creationTime: new Date(article.creationTime).toLocaleDateString(), // 將日期轉換為年月日格式
          }));
          setRows(articlesData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (typeof router.query.id === "string") {
      try {
        const id = router.query.id;
        getAllArticles(id);
      } catch {}
    }
  }, [router]);

  function viewArticle(hashCode: any) {
    window.open("https://ipfs.io/ipfs/" + hashCode);
  }

  return (
    /* 包括標題欄位和文章表格 */
    <TableContainer component={Paper} className="mt-3 mr-5 w-auto">
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center" colSpan={7} className="text-2xl">
              {router.query.Article}
            </StyledTableCell>
          </TableRow>
          <TableRow className="rounded-lg">
            <StyledTableCell className="bg-blue-300 text-base" sx={{ width: "60%" }}>
              版本紀錄
            </StyledTableCell>
            <StyledTableCell className="bg-blue-300 text-base" sx={{ width: "30%" }}>
              時間
            </StyledTableCell>
            <StyledTableCell className="bg-blue-300 text-base" sx={{ width: "10%" }}></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <StyledTableRow key={row.hashCode}>
              <StyledTableCell component="th" scope="row">
                <div className="overflow-hidden text-base">{row.hashCode}</div>
              </StyledTableCell>
              <StyledTableCell align="left">
                <div className="overflow-hidden text-base">{row.creationTime}</div>
              </StyledTableCell>
              <StyledTableCell align="left">
                <button
                  onClick={() => viewArticle(row.hashCode)}
                  className="mx-5 w-4/5 rounded-full border bg-blue-500 py-2 px-10 font-semibold text-white tablet:mx-2 tablet:px-5"
                >
                  查看文章
                </button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
