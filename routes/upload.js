import express from "express";
const storage = memoryStorage();
const upload = multer({ storage });

export default express.Router().post("/", upload.single("audiofile"), upload);
