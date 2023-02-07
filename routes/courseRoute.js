const express = require("express");
const router = express.Router();
const {courseController} = require("../controllers");

router.get("/", courseController.getAll);
router.get("/:name", courseController.findByName);
router.post("/", courseController.CreateNew);
router.get("/byid/:id", courseController.getByPk);
router.put("/update", courseController.Update);
// router.put("/", controller.user.editAt);
// router.delete("/", controller.user.deleteUser);

module.exports = router;