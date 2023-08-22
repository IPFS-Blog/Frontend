import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Card = () => {
  const Creater = useSelector((state: any) => state.Creater);

  //ui function
  const [isFlipped, setIsFlipped] = useState(true);

  const toggleCardFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="h-full w-full dark:text">
      {/* tablet:768以上出現
      phone:450消失
      laptop:1024 */}
      <div
        className="h-full w-full rounded-lg bg-cover bg-center bg-no-repeat drop-shadow-xl tablet:hidden"
        style={{
          backgroundImage: `url(${Creater.profile.background})`,
        }}
      >
        <div className="absolute inset-0 z-0 rounded-lg bg-gray-300 opacity-75 transition group-hover:opacity-75"></div>
        <div className="z-20">
          <div className=" flex h-auto w-2/6 flex-col items-center p-3">
            <Avatar src={Creater.profile.picture} className="h-auto w-full rounded-full" alt="Picture of the author" />
          </div>
          <div className=" flex h-auto w-4/6 flex-col justify-start p-3 text-left ">
            <h5 className="z-50 mb-2 text-3xl font-medium">{Creater.profile.username}</h5>
          </div>
          <div className="bark:text-red-200 z-50 mb-4 pt-2 text-base">
            <p className="z-50">我喜歡貓咪</p>
            <p>3D設計師</p>
          </div>
          <p className="">#cat#black#3D</p>
        </div>
      </div>
      <div className="xs:invisible xs:h-0 xs:w-0 tablet:visible tablet:h-full tablet:w-full">
        {isFlipped ? (
          <button
            className="h-full rounded-lg bg-cover bg-center bg-no-repeat drop-shadow-xl"
            style={{
              backgroundImage: `url(${Creater.profile.background})`,
            }}
            onClick={toggleCardFlip}
          >
            <div className="absolute inset-0 rounded-lg bg-gray-300 opacity-75 transition group-hover:opacity-75"></div>
            <div className="flex h-full flex-row">
              <div className="flex h-48 w-2/6 flex-col items-center p-3 ">
                <Avatar
                  src={Creater.profile.picture}
                  className="h-auto w-full rounded-lg"
                  alt="Picture of the author"
                />
              </div>
              <div className="z-40 flex h-auto w-4/6 flex-col justify-start p-3 text-left dark:text">
                <h5 className="mb-2 text-3xl font-medium">{Creater.profile.username}</h5>
                <p className="truncate">{Creater.profile.address}</p>
                <div className="mb-4 pt-2 text-base">
                  <p>我喜歡貓咪</p>
                  <p>3D設計師</p>
                </div>
                <p>#cat#black#3D</p>
              </div>
            </div>
          </button>
        ) : (
          //FIXME: 更改上傳圖片後的背景
          <button
            className="h-full rounded-lg bg-cover bg-center bg-no-repeat drop-shadow-xl"
            style={{
              backgroundImage: `url(${Creater.profile.background})`,
            }}
            onClick={toggleCardFlip}
          >
            <div className="absolute inset-0 rounded-lg bg-gray-300 opacity-75 transition group-hover:opacity-75"></div>
            <div className="flex h-full flex-row">
              <div className="flex h-48 w-2/6 flex-col items-center p-3">
                <Avatar
                  src={Creater.profile.picture}
                  className="h-auto w-full rounded-lg"
                  alt="Picture of the author"
                />
              </div>

              <div className="z-40 flex h-auto w-4/6 flex-col justify-start p-3 text-left dark:text">
                <h5 className="mb-2 text-3xl font-medium">{Creater.profile.username}</h5>
                <dl className="mx-auto grid grid-cols-3 p-3 text-gray-900 sm:grid-cols-3 sm:p-2 xl:grid-cols-3">
                  <div className="flex flex-col p-2 text-center">
                    <dt className="text-base">所有文章</dt>
                    <dd className="text-gray-800 ">50</dd>
                  </div>
                  <div className="flex flex-col p-2 text-center">
                    <dt className="text-base">粉絲</dt>
                    <dd className="text-gray-800 ">40</dd>
                  </div>
                  <div className="flex flex-col p-2 text-center">
                    <dt className="text-base">追蹤中</dt>
                    <dd className="text-gray-800 ">20</dd>
                  </div>
                </dl>
                {/* FIXME:社群關係*/}
                <div className="flex flex-row pt-2">
                  <div className="mx-2">
                    <svg
                      data-v-2a7f7ff8=""
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.0003 2.91016 H14.2729C13.0674 2.91016 11.9112 3.38907 11.0587 4.24153C10.2063 5.09399 9.72735 6.25018 9.72735 7.45574V10.1831H7V13.8196H9.72735V21.0925H13.3638V13.8196H16.0912L17.0003 10.1831H13.3638V7.45574C13.3638 7.21463 13.4596 6.98339 13.6301 6.8129C13.8006 6.64241 14.0318 6.54663 14.2729 6.54663H17.0003V2.91016Z"
                        fill="#1E1E20"
                      ></path>
                    </svg>
                  </div>
                  <div className="mx-2">
                    <svg
                      data-v-2a7f7ff8=""
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.83347 4.59409C6.0436 4.59409 4.59263 6.04507 4.59263 7.83493V16.1685C4.59263 17.9584 6.0436 19.4093 7.83347 19.4093H16.167C17.9569 19.4093 19.4079 17.9584 19.4079 16.1685V7.83493C19.4079 6.04507 17.9569 4.59409 16.167 4.59409H7.83347ZM2.74072 7.83493C2.74072 5.02229 5.02082 2.74219 7.83347 2.74219H16.167C18.9797 2.74219 21.2598 5.02229 21.2598 7.83493V16.1685C21.2598 18.9812 18.9797 21.2612 16.167 21.2612H7.83347C5.02082 21.2612 2.74072 18.9812 2.74072 16.1685V7.83493ZM12.3894 9.58108C11.8885 9.5068 11.3769 9.59236 10.9274 9.82558C10.478 10.0588 10.1135 10.4278 9.8858 10.8801C9.65814 11.3325 9.57889 11.845 9.65934 12.345C9.73979 12.8449 9.97583 13.3068 10.3339 13.6649C10.692 14.0229 11.1538 14.259 11.6538 14.3394C12.1537 14.4199 12.6663 14.3406 13.1186 14.113C13.5709 13.8853 13.94 13.5208 14.1732 13.0713C14.4064 12.6219 14.492 12.1103 14.4177 11.6094C14.3419 11.0984 14.1038 10.6254 13.7386 10.2602C13.3733 9.89493 12.9003 9.65684 12.3894 9.58108ZM10.0745 8.18179C10.8697 7.76916 11.7748 7.61779 12.661 7.7492C13.565 7.88325 14.4019 8.30448 15.0481 8.95067C15.6943 9.59687 16.1155 10.4338 16.2496 11.3377C16.381 12.2239 16.2296 13.129 15.817 13.9243C15.4043 14.7195 14.7515 15.3644 13.9512 15.7671C13.151 16.1699 12.2441 16.3101 11.3596 16.1678C10.475 16.0255 9.6579 15.6079 9.0244 14.9744C8.3909 14.3409 7.97329 13.5237 7.83096 12.6392C7.68862 11.7547 7.82882 10.8478 8.23161 10.0475C8.6344 9.24728 9.27927 8.59441 10.0745 8.18179ZM16.5837 6.49219C16.0723 6.49219 15.6577 6.90675 15.6577 7.41814C15.6577 7.92953 16.0723 8.34409 16.5837 8.34409H16.5952C17.1066 8.34409 17.5212 7.92953 17.5212 7.41814C17.5212 6.90675 17.1066 6.49219 16.5952 6.49219H16.5837Z"
                        fill="#1E1E20"
                      ></path>
                    </svg>
                  </div>
                  <div className="mx-2">
                    <svg
                      data-v-2a7f7ff8=""
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M20.0495 6.30002C20.3281 6.58729 20.5261 6.94301 20.6232 7.33125C20.8827 8.76995 21.0087 10.2296 20.9995 11.6915C21.0047 13.1315 20.8788 14.569 20.6232 15.9862C20.5261 16.3745 20.3281 16.7302 20.0495 17.0175C19.7708 17.3047 19.4213 17.5134 19.0362 17.6223C17.6292 17.9986 12.001 17.9986 12.001 17.9986C12.001 17.9986 6.37279 17.9986 4.96574 17.6223C4.58847 17.5191 4.24421 17.3203 3.9662 17.0452C3.6882 16.77 3.48586 16.4278 3.37872 16.0517C3.11921 14.613 2.99324 13.1533 3.00242 11.6915C2.99525 10.2405 3.12121 8.79192 3.37872 7.36397C3.4759 6.97573 3.67381 6.62001 3.95246 6.33274C4.23111 6.04547 4.58064 5.83682 4.96574 5.72787C6.37279 5.35156 12.001 5.35156 12.001 5.35156C12.001 5.35156 17.6292 5.35156 19.0362 5.69514C19.4213 5.8041 19.7708 6.01274 20.0495 6.30002ZM14.8639 11.6946L10.1602 14.3696V9.01953L14.8639 11.6946Z"
                        fill="#1E1E20"
                      ></path>
                    </svg>
                  </div>
                  <div className="mx-2">
                    <svg
                      data-v-2a7f7ff8=""
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12.3425 3C6.98225 3 2.62061 6.51367 2.62061 10.8326C2.62061 14.7045 6.07928 17.9471 10.7512 18.5602C11.0679 18.628 11.4988 18.7675 11.6078 19.0361C11.7058 19.2802 11.6719 19.6624 11.6391 19.9089C11.6391 19.9089 11.525 20.59 11.5004 20.735L11.4967 20.7565C11.4505 21.0178 11.3341 21.6773 12.3425 21.2553C13.3802 20.8213 17.9414 17.9824 19.9811 15.6516C21.3897 14.1177 22.0645 12.5611 22.0645 10.8326C22.0645 6.51367 17.7034 3 12.3425 3ZM9.64024 8.78149C9.53665 8.78149 9.45245 8.86841 9.45245 8.9752V13.3174C9.45245 13.4244 9.53665 13.5111 9.64024 13.5111H10.3159C10.4195 13.5111 10.5035 13.4244 10.5035 13.3174V8.9752C10.5035 8.86841 10.4195 8.78149 10.3159 8.78149H9.64024ZM14.3244 8.78149H15.0357C15.1449 8.78149 15.2331 8.86841 15.2331 8.9752V13.3174C15.2331 13.4244 15.1449 13.5111 15.0357 13.5111H14.3244C14.3069 13.5111 14.29 13.5086 14.2739 13.5044L14.2729 13.5042C14.2725 13.5041 14.2722 13.504 14.2718 13.5039C14.2715 13.5039 14.2712 13.5038 14.271 13.5038C14.2665 13.5025 14.2622 13.5012 14.2575 13.4994C14.2556 13.4989 14.2537 13.4981 14.2517 13.4973L14.242 13.4933C14.2389 13.492 14.2356 13.4905 14.2327 13.4887L14.2312 13.488L14.227 13.4859C14.223 13.4836 14.2189 13.4811 14.2148 13.4787L14.2148 13.4786L14.2148 13.4786L14.2148 13.4786L14.2128 13.4771C14.194 13.4645 14.1767 13.4486 14.1627 13.4291L12.1355 10.7384V13.3174C12.1355 13.4244 12.047 13.5111 11.9378 13.5111H11.2267C11.1177 13.5111 11.0291 13.4244 11.0291 13.3174V8.9752C11.0291 8.86841 11.1177 8.78149 11.2267 8.78149H11.9378C11.9403 8.78149 11.9423 8.78187 11.9448 8.78187L11.9481 8.78202L11.9482 8.78202C11.9505 8.7821 11.9527 8.78219 11.9549 8.78245L11.9575 8.78271C11.9601 8.78296 11.9628 8.78321 11.9654 8.78378C11.9681 8.78397 11.971 8.78436 11.9738 8.78474L11.985 8.78722C11.9874 8.78799 11.9897 8.78837 11.9918 8.78913C11.9959 8.79009 11.9998 8.79142 12.0037 8.79276L12.0101 8.79505C12.014 8.79639 12.0177 8.79811 12.0214 8.79983C12.0227 8.80031 12.024 8.80093 12.0253 8.80157L12.0276 8.80269C12.0311 8.80441 12.0346 8.80651 12.0381 8.80861L12.0381 8.80862C12.0402 8.80957 12.0422 8.81072 12.0441 8.81206C12.0463 8.81335 12.0483 8.81478 12.0504 8.81623L12.0544 8.81893L12.0558 8.81997C12.0571 8.82091 12.0583 8.82182 12.0595 8.82294C12.0632 8.82562 12.0667 8.82848 12.07 8.83154L12.0737 8.83479C12.0777 8.83861 12.0816 8.84243 12.0855 8.84682L12.0869 8.84797C12.0923 8.85427 12.0976 8.86077 12.1022 8.86765L14.1269 11.5549V8.9752C14.1269 8.86841 14.2154 8.78149 14.3244 8.78149ZM8.73529 12.4238H6.8522V8.97557C6.8522 8.86841 6.76602 8.78149 6.65995 8.78149H5.96672C5.86046 8.78149 5.77428 8.86841 5.77428 8.97557V13.3168V13.3172C5.77428 13.3693 5.79492 13.4165 5.82807 13.4513L5.82916 13.4526L5.83072 13.4542L5.83356 13.4568C5.86823 13.4905 5.91482 13.5111 5.96653 13.5111H8.73529C8.84154 13.5111 8.92734 13.424 8.92734 13.3168V12.6179C8.92734 12.5107 8.84154 12.4238 8.73529 12.4238ZM18.9124 9.67473C18.9124 9.78208 18.8266 9.86881 18.7203 9.86881H16.8374V10.6025H18.7203C18.8266 10.6025 18.9124 10.6896 18.9124 10.7968V11.4958C18.9124 11.6029 18.8266 11.6899 18.7203 11.6899H16.8374V12.4238H18.7203C18.8266 12.4238 18.9124 12.5109 18.9124 12.6179V13.317C18.9124 13.424 18.8266 13.5111 18.7203 13.5111H15.9514C15.8999 13.5111 15.8531 13.4903 15.8186 13.4568C15.8177 13.4561 15.8165 13.4551 15.8158 13.4542C15.8148 13.4534 15.8139 13.4523 15.8131 13.4513C15.78 13.4165 15.7593 13.3693 15.7593 13.3172V13.317V8.97576V8.97557C15.7593 8.92361 15.7798 8.87662 15.8127 8.84185L15.8158 8.83842C15.8161 8.83796 15.8166 8.83758 15.8171 8.83718C15.8174 8.83691 15.8177 8.83663 15.818 8.83631C15.8527 8.8025 15.8995 8.78149 15.9514 8.78149H15.9518H18.7203C18.8266 8.78149 18.9124 8.8686 18.9124 8.97576V9.67473Z"
                        fill="#1E1E20"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
