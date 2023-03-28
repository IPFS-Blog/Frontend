import { Edit } from "@mui/icons-material";
import { Box, IconButton, TextField } from "@mui/material";
import React from "react";

const editprofile = () => {
  return (
    <>
      <div style={{ backgroundColor: "#F0F0F0", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)" }}>
        <div style={{ marginLeft: "30px" }}>
          <span style={{ fontWeight: "bold", fontSize: "24px" }}>修改個人資料</span>
          <div style={{ marginLeft: "40px", marginTop: "40px" }}>
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "20px",
                width: "300px",
                height: "150px",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
              }}
            >
              <div
                style={{
                  backgroundColor: "#f2f2f2",
                  borderRadius: "50%",
                  width: "120px",
                  height: "120px",
                  position: "absolute",
                  top: "15px",
                  left: "15px",
                }}
              ></div>

              <Box display="flex" flexDirection="column" justifyContent="center" pl={60} pt={1} width="100%">
                <Box alignItems="center" bgcolor="#F0F0F0" borderRadius={10} width="500%">
                  <IconButton>
                    <Edit />
                  </IconButton>
                  變更頭像
                </Box>
                <Box
                  bgcolor="#ccc"
                  p={1}
                  borderRadius={10}
                  width="500%"
                  style={{ boxShadow: " 0 0 10px rgba(0, 0, 0, 0.2)", display: "flex", justifyContent: "center" }}
                >
                  推薦:正方形.JPG.PNG, 至少1,000像素
                </Box>
                <Box bgcolor="#F0F0F0" borderRadius={10} width="500%">
                  <IconButton>
                    <Edit />
                  </IconButton>
                  變更卡片背景
                </Box>
                <Box
                  bgcolor="#ccc"
                  p={1}
                  borderRadius={10}
                  width="500%"
                  style={{ boxShadow: " 0 0 10px rgba(0, 0, 0, 0.2)", display: "flex", justifyContent: "center" }}
                >
                  推薦:長方形.JPG.PNG, 至少1,000像素
                </Box>
              </Box>
            </div>
            <div style={{ marginTop: "50px" }}>
              <Box
                bgcolor="#ccc"
                p={1}
                borderRadius={10}
                width="100%"
                maxWidth="500px"
                style={{ boxShadow: " 0 0 10px rgba(0, 0, 0, 0.2)", display: "flex", justifyContent: "center" }}
              >
                ID:0x...........................
              </Box>
              <p style={{ marginLeft: "50px" }}>不可更改</p>
            </div>
            <p></p>
            <div>
              <div className="  max-w-2xl  p-2 text-2xl ">
                <div className="py-3" style={{ fontWeight: "bold", fontSize: "24px" }}>
                  名稱
                </div>
                <p></p>
                <TextField fullWidth id="outlined-basic" label="請輸入名稱" variant="outlined" />
                <span style={{ color: "#ccc" }}>2-20字元</span>
                <p></p>
              </div>
              <div className="  max-w-2xl  p-2 text-2xl ">
                <div className="py-3" style={{ fontWeight: "bold", fontSize: "24px" }}>
                  個人簡介
                </div>
                <p></p>
                <TextField fullWidth id="outlined-multiline-static" label="請輸入個人簡介" multiline rows={6} />
                <span style={{ color: "#ccc" }}>建議50字以內,最長200字</span>
                <p></p>
              </div>
              <div className="  max-w-2xl  p-2 text-2xl ">
                <div className="py-3" style={{ fontWeight: "bold", fontSize: "24px" }}>
                  添加標籤
                </div>
                <p></p>
                <TextField fullWidth id="outlined-basic" label="請輸入標籤" variant="outlined" />
                <span style={{ color: "#ccc" }}>建議至多5個主標籤</span>
                <p></p>
              </div>
              <div className="  max-w-2xl  p-2 text-2xl ">
                <div className="pl-3 " style={{ fontWeight: "bold", fontSize: "24px" }}>
                  社群關係連結
                </div>
                <p></p>
                <TextField fullWidth id="outlined-basic" label="請輸入社群連結" variant="outlined" />
                <p></p>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px", marginRight: "40px" }}>
                <button style={{ borderRadius: "10px", height: "40px", backgroundColor: "#ccc" }}>重置</button>
                <button style={{ marginLeft: "10px", borderRadius: "10px", height: "40px", backgroundColor: "#ccc" }}>
                  確認
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default editprofile;
