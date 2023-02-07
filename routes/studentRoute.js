const express = require("express");
const router = express.Router();
const {studentController} = require("../controllers");

router.post("/", studentController.getAll);
router.post("/create", studentController.CreateNew);
router.post("/addCourse", studentController.AddCourse);
router.get("/byid/:id", studentController.getByPk);
router.put("/update", studentController.Update);
router.post("/addParent", studentController.AddParent);

module.exports = router;