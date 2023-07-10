import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import router from "next/router";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AlertDialogSlide from "@/components/alert/AlertDialogSlide";
import {
  _apiCheckJwt,
  apiArticleDeleteArticle,
  apiUserGetCreaterArticle,
  apiUserGetCreaterOwnArticle,
} from "@/components/api";
import { LoginFunction } from "@/helpers/users/LoginFunction";
import { setLogin } from "@/store/UserSlice";

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

export default function CustomizedTables() {
  // TODO: Handle funtion
  const User = useSelector((state: any) => state.User);
  const dispatch = useDispatch();
  const [Articles, setArticles] = useState([]);
  const [selectedArticleId, setSelectedArticleId] = useState("");
  const [release, setRelease] = useState(2);
  const [skip] = useState(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const TakeArticle = async () => {
    try {
      let jwt = "";
      await _apiCheckJwt().then((res: any) => (jwt = res.data.jwt));
      const params = { release, skip };
      const res = await apiUserGetCreaterOwnArticle(jwt, params);
      setArticles(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    const UserCheck = async () => {
      LoginFunction().then(userData => {
        if (userData == null) router.push("/");
        else dispatch(setLogin(userData));
      });
    };
    UserCheck();
    TakeArticle();
  }, [release, skip, User.profile.username, dispatch, TakeArticle]);

  async function deleteArticle(articleId: any, articleTitle: any) {
    setSelectedArticleId(articleId);
    setArticleTitle(articleTitle);
    setOpenDeleteDialog(true);
  }

  const handleDelete = async () => {
    setOpenDeleteDialog(false);
    let jwt = "";
    await _apiCheckJwt().then((res: any) => (jwt = res.data.jwt));
    apiArticleDeleteArticle(jwt, selectedArticleId)
      .then(async () => {
        try {
          const res = await apiUserGetCreaterArticle(User.profile.username);
          setArticles(res.data);
        } catch {}
      })
      .catch();
  };

  function editArticle(articleId: any) {
    router.push({
      pathname: "/me/drafts/[draft]",
      query: { draft: articleId },
    });
  }

  function articleHistory(articleid: any, articleTitle: any) {
    router.push({
      pathname: "/articleHistory/[Article]",
      query: { id: articleid, Article: articleTitle },
    });
  }

  const changeRelease = (event: SelectChangeEvent) => {
    const selectedRelease = Number(event.target.value);
    setRelease(selectedRelease);
    TakeArticle();
  };

  //TODO: UI function
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [articleTitle, setArticleTitle] = useState("");
  //文章狀態button
  function renderButton(isTrue: any) {
    if (isTrue) {
      return (
        <button className=" mx-5 w-4/5 rounded-full border  bg-yellow-400 py-2 px-10 font-semibold  text-white tablet:mx-2 tablet:px-5">
          已發布
        </button>
      );
    } else {
      return (
        <button className="mx-5 w-4/5 rounded-full border bg-green-700 py-2 px-10 font-semibold text-white tablet:mx-2 tablet:px-5">
          草稿
        </button>
      );
    }
  }

  function activebutton(isTrue: any, articleid: any, articleTitle: any) {
    if (isTrue) {
      return (
        <div className="flex">
          <button
            onClick={() => deleteArticle(articleid, articleTitle)}
            className=" mx-5 my-2 w-4/5 rounded-full border  bg-red-500 py-2 px-10 font-semibold  text-white tablet:mx-2 tablet:px-5"
          >
            刪除
          </button>
          <button
            className=" mx-5 my-2 w-4/5 rounded-full border  bg-green-700 py-2 px-10 font-semibold  text-white tablet:mx-2 tablet:px-5"
            onClick={() => editArticle(articleid)}
          >
            更改狀態
          </button>
          <button
            onClick={() => articleHistory(articleid, articleTitle)}
            className=" mx-5 my-2 w-4/5 rounded-full border  bg-purple-500 py-2 px-10 font-semibold  text-white tablet:mx-2 tablet:px-5"
          >
            歷史紀錄
          </button>
        </div>
      );
    } else {
      return (
        <div className="flex">
          <button
            onClick={() => deleteArticle(articleid, articleTitle)}
            className=" mx-5 my-2 w-4/5 rounded-full border  bg-red-500 py-2 px-10 font-semibold  text-white tablet:mx-2 tablet:px-5"
          >
            刪除
          </button>
          <button
            className=" mx-5 my-2 w-4/5 rounded-full border  bg-blue-500 py-2 px-10 font-semibold  text-white tablet:mx-2 tablet:px-5"
            onClick={() => editArticle(articleid)}
          >
            編輯
          </button>
          <button
            onClick={() => articleHistory(articleid, articleTitle)}
            className=" mx-5 my-2 w-4/5 rounded-full border  bg-purple-500 py-2 px-10 font-semibold  text-white tablet:mx-2 tablet:px-5"
          >
            歷史紀錄
          </button>
        </div>
      );
    }
  }

  return (
    <>
      {/* 包括標題欄位 and 文章表格 */}
      <TableContainer component={Paper} className="mt-3 mr-5 w-auto">
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center" colSpan={4} className=" text-2xl">
                文章
              </StyledTableCell>
            </TableRow>
            <TableRow className="rounded-lg ">
              <StyledTableCell className="bg-blue-300 text-base" sx={{ width: "10%" }}>
                <FormControl variant="standard" className="w-full">
                  <InputLabel id="demo-simple-select-standard-label">狀態</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={String(release)}
                    onChange={changeRelease}
                    label="release"
                  >
                    <MenuItem value={2}>所有</MenuItem>
                    <MenuItem value={0}>草稿</MenuItem>
                    <MenuItem value={1}>發布</MenuItem>
                  </Select>
                </FormControl>
              </StyledTableCell>
              <StyledTableCell className="bg-blue-300 text-base" sx={{ width: "20%" }}>
                標題
              </StyledTableCell>
              <StyledTableCell className="bg-blue-300 text-base" sx={{ width: "20%" }}>
                tag
              </StyledTableCell>
              <StyledTableCell className="bg-blue-300 text-base" sx={{ width: "20%" }}>
                時間
              </StyledTableCell>
              <StyledTableCell className="bg-blue-300 text-base" sx={{ width: "30%" }}></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Articles.map((item: any) => (
              <StyledTableRow key={item.title}>
                <StyledTableCell align="left">{renderButton(item.release)}</StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  <div className="h-20 overflow-hidden text-base">{item.title}</div>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <div className="overflow-hidden text-base">{item.tag}</div>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <div className="overflow-hidden text-base">{item.updateAt.substring(0, 10)}</div>
                </StyledTableCell>
                <StyledTableCell align="left">
                  {activebutton(item.release, item.id, item.title, item.subtitle, item.contents)}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {openDeleteDialog && <AlertDialogSlide handleDelete={handleDelete} title={"確認刪除 " + articleTitle} />}
    </>
  );
}
