import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import MarkdownEditor from "@/components/article/MarkdownEditor";
import { LoginFunction } from "@/helpers/users/LoginFunction";
import { setLogin } from "@/store/UserSlice";

export default function NewArticle() {
  // TODO: Handle function
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const connect = async () => {
      // TODO: 登入狀態
      LoginFunction().then(userData => {
        if (userData != null) {
          dispatch(setLogin(userData));
        } else {
          alert("連線加入後就可以來創作囉!!");
          router.push("./");
        }
      });
    };
    connect();
  }, [dispatch, router]);

  return (
    <div className="h-auto w-full">
      <MarkdownEditor />
    </div>
  );
}
