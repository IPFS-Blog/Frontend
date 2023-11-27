import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { apiSearch } from "@/components/api";
import SearchResults from "@/components/SearchResults";

const Search = () => {
  const router = useRouter();
  const [userResults, setUserResults] = useState([]);
  const [articleResults, setArticleResults] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await apiSearch({
          query: router.query.searchText,
          search_type: null,
        });

        setUserResults(res.data.users.data || []);
        setArticleResults(res.data.articles.data || []);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }

    fetchData();
  }, [router.query.searchText]);

  return <SearchResults userResults={userResults} articleResults={articleResults} />;
};

export default Search;
