import { Edit } from "@mui/icons-material";
import { Box, IconButton, TextField } from "@mui/material";

import styles from "@/styles/EditProfile.module.css";
const editprofile = () => {
  return (
    <>
      <div style={{ backgroundColor: "#F0F0F0", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)" }}>
        <div className="pl-8">
          <span className="text-2xl font-bold">修改個人資料</span>
          <div className="pl-10 pt-10">
            <div className={styles.whitetri}>
              <div className={styles.graycir}></div>

              <Box display="flex" flexDirection="column" justifyContent="center" pl={60} pt={1} width="100%">
                <Box alignItems="center" bgcolor="#F0F0F0" borderRadius={10} width="500%">
                  <IconButton>
                    <Edit />
                  </IconButton>
                  變更頭像
                </Box>
                <Box className={styles.graylongtri}>推薦:正方形.JPG.PNG, 至少1,000像素</Box>
                <Box bgcolor="#F0F0F0" borderRadius={10} width="500%">
                  <IconButton>
                    <Edit />
                  </IconButton>
                  變更卡片背景
                </Box>
                <Box className={styles.graylongtri}>推薦:長方形.JPG.PNG, 至少1,000像素</Box>
              </Box>
            </div>
            <div style={{ marginTop: "50px" }}>
              <Box className={styles.walletaddress}>
                <TextField disabled id="outlined-disabled" label="Disabled" defaultValue="Hello World" />
                ID:0x...........................
              </Box>
              <p style={{ marginLeft: "50px" }}>不可更改</p>
            </div>
            <p></p>
            <div>
              <div className={styles.wordsizediv}>
                <div className={styles.wordsize}>名稱</div>
                <p></p>
                <TextField fullWidth id="outlined-basic" label="請輸入名稱" variant="outlined" />
                <span style={{ color: "#ccc" }}>2-20字元</span>
                <p></p>
              </div>
              <div className={styles.wordsizediv}>
                <div className={styles.wordsize}>個人簡介</div>
                <p></p>
                <TextField fullWidth id="outlined-multiline-static" label="請輸入個人簡介" multiline rows={6} />
                <span style={{ color: "#ccc" }}>建議50字以內,最長200字</span>
                <p></p>
              </div>
              <div className={styles.wordsizediv}>
                <div className={styles.wordsize}>添加標籤</div>
                <p></p>
                <TextField fullWidth id="outlined-basic" label="請輸入標籤" variant="outlined" />
                <span style={{ color: "#ccc" }}>建議至多5個主標籤</span>
                <p></p>
              </div>
              <div className={styles.wordsizediv}>
                <div className={styles.wordsize}>社群關係連結</div>
                <p></p>
                <TextField fullWidth id="outlined-basic" label="請輸入社群連結" variant="outlined" />
                <p></p>
              </div>
              <div className={styles.buttondiv}>
                <button className={styles.resetbutton}>重置</button>
                <button className={styles.surebutton}>確認</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default editprofile;
