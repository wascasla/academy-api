const { where } = require('sequelize');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const model = require('../models');

const controller = {};

controller.getAll = async function (req, res) {
  try {
    let studentData = [];
    if(req.body.name !== ""){
      studentData = await model.Student.findAll({
        where: {
          name: {
            [Op.like]: `%${req.body.name}%`
          }

      },
        include: [{model: model.Enrollment, include: 'course'}] 
      });
    }else {
      studentData = await model.Student.findAll({ include: [{model: model.Enrollment, include: 'course'}] });
    }
      if (studentData.length > 0) {
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

controller.AddCourse = async function (req, res) {
  try {
    const results = await model.Enrollment.findAll({
      where: {
        studentId: req.body.studentId,
        courseId: req.body.courseId
      }
    });

    if (results.length > 0) throw("Already added this course");

    const student = await model.Student.findByPk(req.body.studentId);
    const course = await model.Course.findByPk(req.body.courseId);

    if (!student || !course ) throw("Somenthig is wrong with the ids");


    await model.Enrollment.create({
      studentId: student.id,
      courseId: course.id
    })
    .then((result) => {
      res.status(201).json({
        message: "Course enrollment successfully ",
        data: result,
      })
    })
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

controller.findByName = async function (req, res) {
  try {
      const studentData = await model.Student.findAll(
        { 
          where: {
            name: {
              [Op.like]: req.param.name
            }

      } });
      if (userData.length > 0) {
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

controller.CreateNew = async function (req, res) {
  try {
    await model.Student.create({
      name: req.body.name,
      surename: req.body.surename,
      birthday: req.body.birthday,
      dni: req.body.dni,
      email: req.body.email,
      gender: req.body.gender
    })
    .then((result) => {
      res.status(201).json({
        message: "Student successful created",
        data: result,
      })
    })
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

controller.getByPk = async function (req, res) {
  try {
      const studentData = await model.Student.findByPk(req.params.id,{ include: [{model: model.Enrollment, include: 'course'}, {model: model.Parent, include: 'parent'}] });
      if (studentData) {
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

controller.Update = async function (req, res) {
  try {
    await model.Student.update({
      name: req.body.name,
      surename: req.body.surename,
      birthday: req.body.birthday,
      dni: req.body.dni,
      email: req.body.email,
      gender: req.body.gender
    }, {where: {id: req.body.id}})
    .then((result) => {
      res.status(200).json({
        message: "Student successful updated",
        data: result,
      })
    })
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

controller.AddParent = async function (req, res) {
  try {
    if (req.body.studentId === req.body.parentId) throw("Can not be the same person");

    const results = await model.Parent.findAll({
      where: {
        studentId: req.body.studentId,
        parentId: req.body.parentId
      }
    });

    if (results.length > 0) throw("already exist a relationship");

    const student = await model.Student.findByPk(req.body.studentId);
    const parent = await model.Student.findByPk(req.body.parentId);
    await model.Parent.create({
      studentId: student.id,
      parentId: parent.id
    })
    .then((result) => {
      model.Parent.create({
        studentId: parent.id,
        parentId: student.id
      }).then((result) => {
        res.status(201).json({
          message: "Parent Added successfully ",
          data: result,
      })

      })
    })
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

module.exports = controller;