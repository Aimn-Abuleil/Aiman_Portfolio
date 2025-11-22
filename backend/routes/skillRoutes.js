const express = require("express");
const router = express.Router();
const skillController = require("../controllers/skillController");
const multer = require("multer");
const path = require("path");

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(
      null,
      Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname)
    ),
});

const upload = multer({ storage });

// Routes
router.get("/", skillController.getSkills);
router.post("/", upload.single("icon"), skillController.addSkill); // file field name = icon
router.put("/:id", upload.single("icon"), skillController.updateSkill);
router.delete("/:id", skillController.deleteSkill);

module.exports = router;
