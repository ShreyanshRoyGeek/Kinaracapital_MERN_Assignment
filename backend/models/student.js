const mongoose = require("mongoose")

let studentDataSchema = new mongoose.Schema({

    name : {
        type : String
    },
    roll : {
        type : String
    },
    department : {
        type : String,
        default: "Engineering"
    },
    noOfSubjectsAppeared: {
        type : Number,
        default: 0
    },
    subjectWiseAverage : { 
        type : Number
    },
    totalMarks : {
        type : Number
    },
    regular : {
        type : Boolean
    }


})

const Student = new mongoose.model("Student", studentDataSchema)
module.exports = Student