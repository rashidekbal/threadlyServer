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
ync function uploadOnColudinary(buffer) {
  try {
    if (!buffer) return null;

    return await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (error) return reject(null);
          let secureUrl = result.secure_url.replace("http://", "https://");
          return resolve(secureUrl);
        }
      );
      stream.end(buffer); // ⬅️ RAM buffer se upload
    });
  } catch (error) {
    return null;
  }
}

export default uploadOnColudinary;


as
