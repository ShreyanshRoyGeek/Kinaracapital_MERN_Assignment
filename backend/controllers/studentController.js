const Student = require("../models/student")

const StudentData = [
    { name : "Ram", roll: "ECE/15/21", noOfSubjectsAppeared : 5, subjectWiseAverage : 65, totalMarks: 325,  regular: true },
    { name : "Shyam", roll: "CSE/15/38", noOfSubjectsAppeared : 5, subjectWiseAverage : 85, totalMarks: 425,  regular: true },
    { name : "Madan", roll: "CSE/15/45", noOfSubjectsAppeared : 5, subjectWiseAverage : 76, totalMarks: 380,  regular: true },
    { name : "Mohan", roll: "ECE/15/26", noOfSubjectsAppeared : 5, subjectWiseAverage : 65, totalMarks: 325,  regular: true },
    { name : "Ratan", roll: "IT/15/46", noOfSubjectsAppeared : 5, subjectWiseAverage : 78, totalMarks: 390,  regular: true },
    { name : "Manoj", roll: "ECE/15/27", noOfSubjectsAppeared : 5, subjectWiseAverage : 77, totalMarks: 385,  regular: true },
    { name : "Saroj", roll: "ECE/15/29", noOfSubjectsAppeared : 5, subjectWiseAverage : 86,totalMarks: 430,  regular: true },
    { name : "Rahul", roll: "ECE/15/31", noOfSubjectsAppeared : 5, subjectWiseAverage : 85, totalMarks: 425,  regular: true },
    { name : "Sweety", roll: "ECE/15/32", noOfSubjectsAppeared : 5, subjectWiseAverage : 92, totalMarks: 460,  regular: true },
    { name : "Richa", roll: "ECE/15/33", noOfSubjectsAppeared : 5, subjectWiseAverage : 65, totalMarks: 325,  regular: true },
    { name : "Sonu", roll: "CSE/15/54", noOfSubjectsAppeared : 4, subjectWiseAverage : 55, totalMarks: 220,  regular: false },
    { name : "Sohal", roll: "CSE/15/11", noOfSubjectsAppeared : 5, subjectWiseAverage : 79, totalMarks: 395,  regular: true },
    { name : "Chand", roll: "CSE/15/12", noOfSubjectsAppeared : 5, subjectWiseAverage : 48, totalMarks: 240,  regular: true },
    { name : "Pankaj", roll: "IT/15/04", noOfSubjectsAppeared : 5, subjectWiseAverage : 58, totalMarks: 290,  regular: true },
    { name : "Amit", roll: "IT/15/08", noOfSubjectsAppeared : 5, subjectWiseAverage : 81, totalMarks: 405,  regular: true },
]


const createStudentsData = async ()  => {

    try {
        
        await Student.create(StudentData)

        return { success: true  , msg : "Students data successfully added!" }
    
    } 
    
    catch (error) {
        
        console.log("createStudentsData::", error)
        throw error

    }

}



const  fetchStudentsData = async (req, res, next) => {

    try {
        
        let { pageNumber, pageSize } = req.body 
    
        if(!pageNumber) {
            pageNumber = 0
        }
    
        if(!pageSize){
            pageSize = 10
        }
    
        const skip = (pageNumber) * pageSize
    
        console.log("fetchStudentsData : records to skip", skip)
    
        const totalStudentsCount = await Student.countDocuments()


        if(totalStudentsCount == 0) {
            createStudentsData()
        }

        const studentsData = await Student.find().skip(skip).limit(pageSize)

    
        res.status(200).send({ success : true, msg :" Students data fetched successfully", totalRecords : totalStudentsCount,   data : studentsData  })

    }     
    catch (error) {

        console.log("fetchStudentsData error::", error)
        throw error
        
    }    

}



const searchStudentsData  = async (req, res, next) => {

    try {
        
        let { searchBy, searchText, pageNumber, pageSize } = req.body

        if(searchBy && searchText) {
            
            if(!pageNumber) {
                pageNumber = 0
            }
            if(!pageSize){
                pageSize = 10
            }
        
            const skip = (pageNumber) * pageSize
            console.log("searchStudentsData : records to skip", skip)
        
            searchText = searchText.trim()
            let searchParams = { }

            switch(searchBy) {

                case "name" :
                    searchParams.name = { $regex: searchText, $options: "i" }
                    break

                case "roll":
                    searchParams.roll = searchText
                    break

                case "marks":
                    searchParams.totalMarks = {$gte:  searchText}
                    break

                case "subjectAppreared":
                    searchParams.noOfSubjectsAppeared = searchText
                    break

            }   

            console.log("searchStudentsData - searchParams::", searchParams)

            const totalStudentsCount = await Student.countDocuments(searchParams)

            const filteredStudentsData = await Student.find(searchParams).skip(skip).limit(pageSize)

            res.status(200).send({ success : true, msg :" Filtered students data", totalRecords : totalStudentsCount,   data : filteredStudentsData  })
    
        }
        
    } 
    
    catch (error) {

        console.log("searchStudentData::", error)
        throw error
    }


}


module.exports = { fetchStudentsData, searchStudentsData }