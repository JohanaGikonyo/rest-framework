
import { useState } from 'react'
import axios from 'redaxios'
function Add() {
const [name, setName]=useState()
const [adm, setAdm]=useState()
const [add, setAdd]=useState(false)
const handleSubmit=async()=>{
    try{
const response=await axios.post('http://127.0.0.1:8000/register/students',{
    name:name,
    admission:adm
});

console.log(response.data)

    }
    catch(e){
        console.error(e)
    }
    setAdd(false) 
}
  return (
    <div className="listadd">
        <div className='addbtn'>
        {add?" ":<button className="btn btn-primary" onClick={()=>setAdd(true)}>Add +</button>}
        </div>
       {add? <form action="" className='addform'>
            <div>
            <label>Name: </label>
            <input type="text" placeholder="Name..." onChange={(e)=>setName(e.target.value)}/>
            </div>
           <div>
           <label>Adimission: </label>
            <input type="number" placeholder="Admission..." onChange={(e)=>setAdm(e.target.value)}/>
           </div>
           <div className='d-flex'>
            <button className="btn btn-dark" onClick={handleSubmit}>Submit</button>
            <button onClick={()=>setAdd(prev=>!prev)} className='btn' style={{color:"red"}}>EXit</button>
           </div>
          
        </form>
        :""}
    </div>
  )
}

export default Add