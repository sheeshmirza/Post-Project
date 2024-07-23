const express = require("express");
const controllers = require("../controllers/post");
const upload = require("../middlewares/multer");

const router = express.Router();

router.post("/", upload.single("image"), controllers.addPost);
router.get("/", controllers.getPost);

module.exports = router;
