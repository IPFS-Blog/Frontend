export const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  ? process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  : "";
export const timestamp = new Date().getTime();
export const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY ? process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY : "";
export const apiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET
  ? process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET
  : "";
