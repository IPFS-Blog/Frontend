import axios from "axios";
import crypto from "crypto";
import { CldImage } from "next-cloudinary";

import { apiKey, apiSecret, cloudName } from "@/helpers/Third/cloudinary";

export default function DeletePicture() {
  const getPublicIdFromUrl = (url: any) => {
    const startIndex = url.indexOf("user-picture/");
    const endIndex = url.lastIndexOf(".");
    return url.substring(startIndex, endIndex);
  };

  const generateSHA1 = (data: any) => {
    const hash = crypto.createHash("sha1");
    hash.update(data);
    return hash.digest("hex");
  };

  const generateSignature = (publicId: string, apiSecret: string) => {
    const timestamp = new Date().getTime();
    return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
  };
  const handleDeleteImage = async () => {
    const publicId = getPublicIdFromUrl(
      "http://res.cloudinary.com/dwgpqlaji/image/upload/v1684646460/user-picture/b2xdqwanm0cn7flizbov.png",
    );
    const timestamp = new Date().getTime();
    const signature = generateSHA1(generateSignature(publicId, apiSecret));
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

    await axios
      .post(url, {
        public_id: publicId,
        signature: signature,
        api_key: apiKey,
        timestamp: timestamp,
      })
      .then(() => {
        // FIXME: LIN 刪除第三方圖片成功UI
      })
      .catch(() => {
        // FIXME: LIN 刪除第三方圖片失敗UI
      });
  };
  return (
    <>
      <CldImage
        width="960"
        height="600"
        src="user-picture/b2xdqwanm0cn7flizbov"
        sizes="100vw"
        alt="Description of my image"
      />

      <button onClick={handleDeleteImage}>Remove</button>
    </>
  );
}
