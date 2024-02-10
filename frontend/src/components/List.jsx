import {useState, useEffect} from 'react'
import axios from 'redaxios'

function List() {
  const [students, setStudents]=useState([])         
  const [register, setRegister]=useState(false)
  const [editForm, setEditForm]=useState(false)
  const [name, setName]=useState()
const [adm, setAdm]=useState()
const [id, setId]=useState('')
  useEffect(()=>{
    const fecthdata=async ()=>{
      try{
     const response=await axios.get('http://127.0.0.1:8000/register/students')
     setStudents(response.data)
      }
      catch(e){
        console.error(e)
      }
    }
    fecthdata()
  },[])


  // const handleCheckboxChange=(studentId)=>{
  //   setSelectedDeletes((prev)=>{
  //     if(prev.includes(studentId)){
  //       return prev.filter((id)=>id !==studentId);
  //     }else{
  //       return [...prev, studentId]
  //     }
  //   })
//}

const handleEdit=(student)=>{
  setName(student.name)
  setAdm(student.admission)
  setId(student.id)
setEditForm(true)
}

const handleSubmit=async()=>{
  try{
const response=await axios.put(`http://127.0.0.1:8000/register/student/${id}/`,{
  name:name,
  admission:adm
});
setStudents(response.data)
setRegister(true)
console.log(response.data)

  }
  catch(e){
      console.error(e)
  }
  setEditForm(false) 
  setRegister(true)
}

  const handledelete=async(deleteId)=>{
    try {
      await axios.delete(`http://127.0.0.1:8000/register/student/${deleteId}/`, {
        // data: { ids: selectedDeletes }, // Pass selected student IDs as data
      });
    const response=await axios.get('http://127.0.0.1:8000/register/students');
    setStudents(response.data);
    setRegister(true)
  }
    catch(e){
      console.error(e)
    }
 
  }
  return (
    <div className='list'>
<h3 style={{borderBottom:"1px solid"}}>Students Details</h3>
<button className='btn btn-dark' onClick={()=>{setRegister(prev=>!prev)}}>{register?"Close":"View"}</button>
  
     {register?
     <div>
     <table >
      <thead>
      <tr style={{backgroundColor:""}}>
        <th>No.</th>
        <th>NAME</th>
        <th>ADMISSION</th>
        <th>DELETE</th>
        <th>Edit</th>
      </tr>
      </thead>
      <tbody>
      {students.map((student)=>{
     return( <tr key={student.id}>
      <td>{student.id}</td>
        <td>{student.name}</td>
        <td>{student.admission}</td>
        <td>
          <input type="checkbox" 
        onChange={()=>handledelete(student.id)}
        />
        </td>
        <td>
          <input type="checkbox" 
        onChange={()=>handleEdit(student)}
        />
        </td>
      </tr>
     )
       })
      }
      
      </tbody>
     </table>
     {/* <button className='btn btn-danger btn-block' onClick={handledelete()}>Delete</button> */}
     </div>
 :""
    }
{
  editForm?
  <form action="" className='addform'>
            <div>
            <label>Name: </label>
            <input type="text" placeholder="Name..." onChange={(e)=>setName(e.target.value)} value={name}/>
            </div>
           <div>
           <label>Adimission: </label>
            <input type="number" placeholder="Admission..." onChange={(e)=>setAdm(e.target.value)} value={adm}/>
           </div>
           <div className='d-flex'>
            <button className="btn btn-dark" onClick={handleSubmit}>Submit</button>
            <button onClick={()=>setEditForm(prev=>!prev)} className='btn' style={{color:"red"}}>EXit</button>
           </div>
          
        </form>
  :""
}
    
    

    </div>
  )
}

export default List