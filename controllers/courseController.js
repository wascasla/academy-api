const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const model = require('../models');

const controller = {};

controller.getAll = async function (req, res) {
  try {
      const courseData = await model.Course.findAll({ include: [{model: model.Enrollment, include: 'student'}] });
      if (courseData.length > 0) {
           res
              .status(200)
              .json({ message: "Connection successful", data: courseData });
      } else {
          res.status(200).json({ message: "There is no data", data: [] });
      }
  } catch (error) {
      res.status(404).json({ message: error });
  }
};

controller.CreateNew = async function (req, res) {
  try {
    await model.Course.create({
      name: req.body.name
    })
    .then((result) => {
      res.status(201).json({
        message: "Course successful created",
        data: result,
      })
    })
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

controller.findByName = async function (req, res) {
  try {
      const courseData = await model.Course.findAll(
        { 
          where: {
            name: {
              [Op.like]: req.param.name
            }

      } });
      if (courseData.length > 0) {
           res
              .status(200)
              .json({ message: "Connection successful", data: studentData });
      } else {
          res.status(200).json({ message: "There is no data", data: [] });
      }
  } catch (error) {
      res.status(404).json({ message: error });
  }
};

controller.getByPk = async function (req, res) {
  try {
      const courseData = await model.Course.findByPk(req.params.id,{ include: [{model: model.Enrollment, include: 'student'}] });
      if (courseData) {
           res
              .status(200)
              .json({ message: "Connection successful", data: courseData });
      } else {
          res.status(200).json({ message: "There is no data", data: [] });
      }
  } catch (error) {
      res.status(404).json({ message: error });
  }
};

controller.Update = async function (req, res) {
  try {
    await model.Course.update({
      name: req.body.name,
    }, {where: {id: req.body.id}})
    .then((result) => {
      res.status(200).json({
        message: "Course successful updated",
        data: result,
      })
    })
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

module.exports = controller;