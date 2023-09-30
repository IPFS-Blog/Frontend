import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  _apiCheckJwt,
  apiUserDeleteCreatorData,
  apiUserGetCreatorOwnSubscribers,
  // apiUserGetCreatorSubscribers,
} from "@/components/api";
import { updatedSubscribers } from "@/store/follow/SubscribersSlice";
export default function Follow(props: any) {
  // TODO: Handle function
  const [isSubscribers, setIsSubscribers] = useState(false);
  const Subscribers = useSelector((state: any) => state.Subscribers);
  const dispatch = useDispatch();

  useEffect(() => {
    // 獲取本人訂閱的創作者們(是否追蹤過)
    const isMatching = Subscribers.some(
      (subscriber: any) => subscriber.id.toString() === props.subscriberId.toString(),
    );

    setIsSubscribers(isMatching);
  }, [Subscribers, props.createrData, props.subscriberId]);

  //更新資料
  async function update() {
    let jwt = "";
    await _apiCheckJwt().then((res: any) => (jwt = res.data.jwt || null));
    apiUserGetCreatorOwnSubscribers(jwt).then((res: any) => {
      dispatch(updatedSubscribers(res.data.subscribers));
    });
  }

  async function follow() {
    let jwt = "";
    await _apiCheckJwt().then((res: any) => (jwt = res.data.jwt || null));
    const uid = props.subscriberId;
    if (jwt != null) {
      if (isSubscribers) {
        //取消追蹤
        apiUserDeleteCreatorData(jwt, uid)
          .then((res: any) => {
            setSubscribersTip(true);
            setMessage("已取消追蹤");
            setIsSubscribers(!isSubscribers);
            setTimeout(() => {
              setSubscribersTip(false);
            }, 3000);
            update();
            console.log("已取消追蹤", res);
          })
          .catch((error: any) => {
            console.log(error);
            setMessage("取消追蹤失敗");
          });
      } else {
        //新增追蹤
        const headers = {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${jwt}`,
        };

        const options = {
          method: "POST",
          url: `${process.env.NEXT_PUBLIC_API}/users/${uid}/subscribers`,
          headers: headers,
        };

        axios(options)
          .then((res: any) => {
            setSubscribersTip(true);
            setMessage("成功追蹤");
            setIsSubscribers(!isSubscribers);
            console.log("成功追蹤", res);
            setTimeout(() => {
              setSubscribersTip(false);
            }, 3000);
            update();
          })
          .catch((error: any) => {
            console.log("失敗", error);
            setMessage("追蹤失敗");
          });

        // apiUserGetCreatorSubscribers(jwt, uid)
        //   .then((res: any) => {
        //     setSubscribersTip(true);
        //     console.log("成功追蹤", res);
        //     setMessage("已追蹤");
        //     setIsSubscribers(!isSubscribers);
        //     setTimeout(() => {
        //       setSubscribersTip(false);
        //     }, 3000);
        //   })
        //   .catch((error: any) => {
        //     console.log("失敗", error);
        //     setMessage("追蹤失敗");
        //   });
      }
    } else {
      window.alert("請先登入");
    }
  }
  // TODO: UI function
  const [subscribersTip, setSubscribersTip] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <>
      <button
        className={`tabelet:my-0 tabelet:py-2 tabelet:px-10 relative ${
          isSubscribers ? "bg-red-500 text-white " : " border border-red-500 text-red-500 "
        }m-2 rounded p-2 px-20 font-semibold  hover:bg-red-500 hover:text-white tablet:mx-2 tablet:px-5`}
        onClick={follow}
      >
        <PersonAddAlt1Icon className="mr-1" />
        {isSubscribers ? <span>已追蹤</span> : <span>追蹤</span>}
        {subscribersTip ? (
          <span
            className={`pointer-events-none absolute bottom-full -left-1/2 z-10 mb-2 ml-16 rounded-lg py-2 px-3 text-center text-xs ${
              !isSubscribers ? " bg-gray-800 text-gray-100" : "bg-red-500 text-white"
            }`}
          >
            {message}
          </span>
        ) : null}
      </button>
    </>
  );
}
