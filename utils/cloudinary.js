async function uploadOnColudinary(buffer) {
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
