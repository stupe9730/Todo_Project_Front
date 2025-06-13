import { useState } from "react"
import { useAddUserMutation, useGetUsersQuery, useUserDeleteMutation, useUseUpdateMutation } from "../redux/todoApi";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Todo=()=>{

const [userdata,setUserata]=useState({
  Name:"",
  Email:"",
  Number:""
})

const [updatestate,setUpdatestate]=useState({
  id:""
})

const {data}=useGetUsersQuery()
const [submitedData,{isSuccess}]=useAddUserMutation()
const [delteData,{isSuccess:deleteSuccess}]=useUserDeleteMutation()
const [updateTodo,{isSuccess:updateSuccess}]=useUseUpdateMutation()

useEffect(()=>{
  if (isSuccess&&data) {
    toast.success("Add Todo Success")
  } 
},[isSuccess])

useEffect(()=>{
  if(updateSuccess){
    toast.warning("Update Todo Success")
  }
},[updateSuccess])

useEffect(()=>{
  
  if(deleteSuccess){
    toast.info("Delete Todo Success")
  }
},[deleteSuccess])


    return <>
    <div className="alert bg-cyan-400 flex justify-center">
      {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> */}
      <span className="text-3xl font-bold  ">Todo List</span>
    </div>
    <div className="flex justify-end p-7">
 <button onClick={()=>window.my_modal_3.showModal()} className="btn btn-primary ">Add Todo</button>
    </div>

{/* add model */}
<dialog id="my_modal_3" className="modal">
  <form method="dialog" className="modal-box">
    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    <div>
        <p>Add Todo List</p>
       <div className="m-4">
        <label htmlFor="Name" className="font-bold my-2 block ">Name :</label>
         <input onChange={e=>setUserata({...userdata,[e.target.name]:e.target.value})} value={userdata.Name}  type="text" id="Name" name="Name" placeholder="Enter Name" className="input focus:border-none focus:border-red-500 input-bordered w-full " />
       </div>
       <div className="m-4">
        <label htmlFor="Email" className="font-bold my-2 block ">Email :</label>
         <input onChange={e=>setUserata({...userdata,[e.target.name]:e.target.value})} value={userdata.Email} type="email" id="Email" name="Email" placeholder="Enter Email" className="input focus:border-none focus:border-red-500 input-bordered w-full " />
       </div>
       <div className="m-4">
        <label htmlFor="Number" className="font-bold my-2 block ">Number :</label>
         <input onChange={e=>setUserata({...userdata,[e.target.name]:e.target.value})} value={userdata.Number} type="number" id="Number" name="Number" placeholder="Enter Number" className="input focus:border-none focus:border-red-500 input-bordered w-full " />
       </div>
       <div className="flex justify-end m-3">
        <button onClick={e=>{submitedData(userdata),setUserata({ 
          Name:"",
          Email:"",
          Number:""
  })}} className="btn btn-secondary">SUBMIT</button>
       </div>
    </div>
  </form>
</dialog>


{/* Edit Model */}

<dialog id="my_modal_4" className="modal">
  <form method="dialog" className="modal-box">
    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    <div>
    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    <div>
        <p>Add Todo List</p>
       <div className="m-4">
        <label htmlFor="Name" className="font-bold my-2 block ">Name :</label>
         <input onChange={e=>setUpdatestate({...updatestate,[e.target.name]:e.target.value})} value={updatestate.Name}  type="text" id="Name" name="Name" placeholder="Enter Name" className="input focus:border-none focus:border-red-500 input-bordered w-full " />
       </div>
       <div className="m-4">
        <label htmlFor="Email" className="font-bold my-2 block ">Email :</label>
         <input onChange={e=>setUpdatestate({...updatestate,[e.target.name]:e.target.value})} value={updatestate.Email} type="email" id="Email" name="Email" placeholder="Enter Email" className="input focus:border-none focus:border-red-500 input-bordered w-full " />
       </div>
       <div className="m-4">
        <label htmlFor="Number" className="font-bold my-2 block ">Number :</label>
         <input onChange={e=>setUpdatestate({...updatestate,[e.target.name]:e.target.value})} value={updatestate.Number} type="number" id="Number" name="Number" placeholder="Enter Number" className="input focus:border-none focus:border-red-500 input-bordered w-full " />
       </div>
       <div className="flex justify-end m-3">
        <button onClick={e=>{ updateTodo(updatestate)}} className="btn btn-success text-white">Update</button>
       </div>
    </div>
    </div>
  </form>
</dialog>

{/* table todo  */}

<div className="overflow-x-auto ">
  <table className="table flex border-2 text-center table-zebra">
    {/* head */}
    <thead>
      <tr >
        <th>Name</th>
        <th>Email</th>
        <th>Number</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
     {
      data&&data.map(item=> <tr>
        <td>
          <div className="flex items-center space-x-3">
            <div>
              <div className="font-bold">{item.Name}</div>
            </div>
          </div>
        </td>
        <td>
          <span className="badge badge-ghost badge-sm">{item.Email}</span>
        </td>
        <td>{item.Number}</td>
        <th>
          <button onClick={()=>{window.my_modal_4.showModal(),setUpdatestate(item)}}  className="btn mx-1.5 btn-warning">Edit</button>
          <button onClick={e=>delteData(item._id)} className="btn mx-1.5 btn-secondary">Delete</button>
        </th>
      </tr>)
     }
    </tbody>
    
    
  </table>
</div>
    </>
}

export default Todo