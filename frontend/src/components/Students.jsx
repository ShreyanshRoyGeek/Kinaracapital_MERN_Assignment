import React, { useState, useEffect } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
        

//Services
import { fetchStudentsData, searchStudentsData } from "../services/studentService"


const Students = () => {

    const [studentList, setStudentList] = useState([])

    let [pageNumber, setPageNumber] = useState(0)
    let [pageSize, setPageSize] = useState(10)
    let [totalRecords, setTotalRecrds] = useState(0)

    const [searchText, setSearchText] = useState("")
    const [searchBy, setSearchBy] = useState("name")


    useEffect(() => {
 
        if(searchBy && searchText) {
            filteredStudentsData()
        }
        else {
            getStudentsData()
        }

    }, [pageNumber, pageSize])



    const getStudentsData = async () => {

        const data = { pageNumber, pageSize }

        const res = await fetchStudentsData(data)
        console.log("getStudentsData res ::", res)

        if (res?.data?.length > 0) {
            setStudentList(res.data)
            setTotalRecrds(res.totalRecords)
        }

        else {
            setStudentList([])
            setTotalRecrds(0)
        }

    }



    const regularBody = (student) => {

        let isStudentRegaular = "No"
        if (student.regular) {
            isStudentRegaular = "Yes"
        }
        return <div>{isStudentRegaular}</div>
    }


    const handleOptionChange = (event) => {
        setSearchBy(event.target.value)
    }



    const filteredStudentsData = async () => {

        if(searchBy && searchText) {

            const data = { searchBy , searchText,  pageNumber, pageSize }
    
            const res = await searchStudentsData(data)
    
            console.log("getStudentsData res ::", res)
    
            if (res?.data?.length > 0) {
                setStudentList(res.data)
                setTotalRecrds(res.totalRecords)
            }
    
            else {
                setStudentList([])
                setTotalRecrds(0)
            }

        }

    }


    const handleSearch = async (event) => {

        if(searchBy && searchText) {
            filteredStudentsData()
        }
        else {
            alert("Please enter search text")
        }

    }

    
    const onPageChange = (event) => {
        setPageNumber(value => (event.page))
        setPageSize(value => (event.rows))
    }



    const header = (
        <div>
            <h2>Students</h2>
        </div>
    )



    return (

        <>

        <div className='card'>
        
            <div style={{ display : 'flex', flexGrow : 1, backgroundColor: 'whitesmoke', justifyContent: 'center', fontSize: '16px' }}>

                <div style= {{ display: 'flex', flexDirection: 'column', marginRight: '15px'}} >
                    <select value={searchBy} onChange={handleOptionChange}
                        style = {{
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            width: '150px' 
                        }} 
                    >
                        <option value="name">Name</option>
                        <option value="roll">Roll</option>
                        <option value="marks">Total Marks</option>
                        <option value="subjectAppreared">Subject Appeared</option>
                    </select>
                </div>

                <div>
                    <input 
                        placeholder={`Search students by ${searchBy}`}
                        onChange={(e) => setSearchText(e.target.value)}
                        value={searchText}
                        style = {{
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            width: '500px' 
                        }}
                    />
                </div>

                <div style={{ marginLeft: '15px' }}>
                    <button 
                        onClick={(e) => handleSearch()}
                        style={{
                            padding: '10px',
                            borderRadius: '5px',
                            backgroundColor: 'lightblue',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                        
                    >
                        Search
                    </button>
                </div>

            </div>

            <DataTable value={studentList} showGridlines stripedRows header={header} 
                rows={pageSize}
                lazy={true}
                totalRecords={totalRecords}
                paginator={true} 
                rowsPerPageOptions={[5, 10, 15, 20]}
                page={pageNumber}
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                first = {(pageNumber) * pageSize}
                onPage={onPageChange} 
                tableStyle={{ minWidth: '50rem' }}
            >
                <Column field="name" header="Name"></Column>
                <Column field="roll" header="Roll"></Column>
                <Column field="department" header="Department"></Column>
                <Column field="noOfSubjectsAppeared" header="Subject Appeared"></Column>
                <Column field="subjectWiseAverage" header="Subject Average Marks"></Column>
                <Column field="totalMarks" header="Total Marks"></Column>
                <Column field="regular" body={regularBody} header="Regular"></Column>
            </DataTable>

        </div>

        </>

    )
}

export default Students
