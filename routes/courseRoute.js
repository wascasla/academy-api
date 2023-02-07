const express = require("express");
const router = express.Router();
const {courseController} = require("../controllers");

router.get("/", courseController.getAll);
router.get("/:name", courseController.findByName);
router.post("/create", courseController.CreateNew);
router.get("/byid/:id", courseController.getByPk);
router.put("/update", courseController.Update);

module.exports = router;