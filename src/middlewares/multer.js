const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({ storage, limits: { fileSize: 2 * 1024 * 1024 } }); // 2 MB limit

module.exports = upload;
