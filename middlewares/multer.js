import multer from "multer";
const storage = multer.memoryStorage(); // 👈 file RAM me rakhta hai

const upload = multer({ storage });
export default upload;
