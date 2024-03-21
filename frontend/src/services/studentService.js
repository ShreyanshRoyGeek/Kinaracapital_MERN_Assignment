import axios from "axios"


export async function fetchStudentsData(obj) {

    try {
        
        const res = await axios.post("http://localhost:8080/studentsData", obj)
        if(res.status == 200) {
            return res.data
        }
        return res

    } 
    catch (error) {
        
        console.log("fetchStudentsData - error", error)
        return error
    }


}


export async function searchStudentsData(obj) {

    try {
        
        const res = await axios.post("http://localhost:8080/searchStudentsData", obj)
        if(res.status == 200) {
            return res.data
        }
        return res

    } 
    catch (error) {
        
        console.log("searchStudentsData - error", error)
        return error
    }

}