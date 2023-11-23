import "react-toastify/dist/ReactToastify.css";

import SearchIcon from "@mui/icons-material/Search";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { apiSearch } from "@/components/api";

import Login from "../users/Login";

const Navbar = () => {
  const theme = useTheme();
  const router = useRouter();
  const routerPath = router.asPath;
  const [searchText, setSearchText] = useState("");
  const hideNavbar = routerPath === "/Dashboard" || routerPath.startsWith("/articleHistory/");
  const data = { query: searchText, search_type: null };
  const [results, setResults] = useState<string[]>([]);
  useEffect(() => {
    async function Search() {
      try {
        const res = await apiSearch(data);
        const newArticles = res.data.articles?.data || [];
        const newUsers = res.data.users?.data || [];

        const combinedResults = [
          ...newArticles.map((articles: { title: any }) => articles.title),
          ...newUsers.map((users: { username: any }) => users.username),
        ];

        setResults(combinedResults);
      } catch (error) {
        toast.error("查詢失敗", {
          style: {
            boxShadow: "none",
          },
          theme: theme ? "light" : "dark",
        });
      }
    }

    Search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  function SearchResults() {
    router.push({
      pathname: "/Search",
      query: { searchText: searchText },
    });
  }
  if (hideNavbar) {
    return null;
  }

  return (
    <>
      <div>
        <nav className="flex flex-row items-center justify-between bg-tertiary p-2">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex shrink-0 items-center p-1 laptop:mr-2">
                <img
                  src="/logo/48.png"
                  alt="not found"
                  className="h-7 w-7 phone:h-11 phone:w-11 tablet:h-12 tablet:w-12"
                />
                <span className="hidden laptop:visible laptop:flex laptop:select-none laptop:px-2 laptop:text-2xl laptop:font-semibold laptop:tracking-tight laptop:text-blue-400 laptop:dark:text-sky-500">
                  IPFS幣記
                </span>
              </div>
            </Link>
            <form className="grid justify-items-start tablet:w-auto laptop:mx-20">
              <div className="flex flex-col rounded-lg bg-gray-200 p-2 dark:bg-slate-700 tablet:flex-row tablet:space-x-2">
                {/* // <div className="mb-1 flex items-center rounded-md bg-gray-100 dark:bg-slate-800">
                //   <input
                //     type="text"
                //     id="inputSearch"
                //     className="w-full items-center rounded-r-md bg-gray-100 px-3 text-gray-500 outline-none focus:outline-none dark:bg-slate-800  placeholder:dark:text-gray-300"
                //     placeholder="創作者姓名或文章名稱"
                //     onChange={e => setSearchText(e.target.value)}
                //   />
                // </div> */}

                <Stack spacing={2} sx={{ width: 300 }} className="dark:text-gray-500">
                  <Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    options={results}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="搜尋創作者姓名或文章名稱"
                        InputProps={{
                          ...params.InputProps,
                          type: "search",
                        }}
                        onChange={e => setSearchText(e.target.value)}
                      />
                    )}
                  />
                </Stack>
                <button
                  className="ml-2 cursor-pointer rounded-lg p-2 font-semibold text-gray-500 transition hover:shadow-2xl hover:ring dark:text-gray-300"
                  type="button"
                  onClick={SearchResults}
                >
                  <SearchIcon />
                </button>
              </div>
            </form>
          </div>
          <div className="flex flex-row items-center">
            <Login />
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
