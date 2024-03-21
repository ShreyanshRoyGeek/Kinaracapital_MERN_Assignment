const express = require("express")
const router = require('express').Router()

const studentController = require("../controllers/studentController")


router.post("/studentsData", studentController.fetchStudentsData)
router.post("/searchStudentsData", studentController.searchStudentsData)

// Both post methods are easily cobined into simple one searchStudent method
// But created two separate api as given in the instructions


module.exports = router