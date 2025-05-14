import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// Upload an image
async function uploadOnColudinary(localpath) {
  try {
    if (!localpath) return null;
    //upload the file on cloudinary

    let response = await cloudinary.uploader.upload(localpath, {
      resource_type: "auto",
    });

    fs.unlinkSync(localpath);
    response.url = response.url.replace("http://", "https://");
    return response.url;
  } catch (error) {
    fs.unlinkSync(localpath); //remove temp file
    return null;
  }
}

export default uploadOnColudinary;
