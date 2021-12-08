import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from "../App";
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import ProjectItem from "../components/ProjectItem";



const ProjectPage = () => {
     const baseURL = "http://localhost:8081";
     const [user] = useContext(UserContext);
     const [res, setRes] = useState([])
     const [addNew, setAddNew] = useState(false);
     const [input, setInput] = useState({});

     function handleInput(e){
          const name = e.target.name;
          const value = e.target.value;
          const newInput = {...input};
              newInput[name] = value;
          setInput({...newInput })
     }

     function handleSubmit(){

          fetch(baseURL + "/project/create", {
               method: 'POST',
               body: JSON.stringify({...input, user})
               ,
               headers: {
                    'Content-type': 'application/json; charset=UTF-8',
               },
          })
              .then(res => res.json())
              .then(result => {
                   setAddNew(false);
                   setRes([...res, result]);
              })
     }

     useEffect(() =>{

          fetch(baseURL + "/project/all")
              .then(res => res.json())
              .then(result => {
                   setRes(result);
                   console.log(result)
              })
     }, [])

     return (
          <>
          <Header/>
          <NavBar/>
          <div className="resource-page flex aic jc">
               <div className="res-block flex col">
                    <div className="head flex">
                         <div className="row flex font b6">Project</div>
                         <div className="row flex font b6">Actions</div>
                    </div>
                    <div className="tlb-head flex aic jc">
                         <div className="row flex b6">Project ID</div>
                         <div className="row flex b6">Project Name</div>
                         <div className="row flex">
                              <button onClick={() => setAddNew(true)} className="btn-add cleanbtn b6 button">Add</button>
                         </div>
                    </div>
                    {
                         addNew && <div className="tlb-head tbl-list flex aic jc">
                              <div className="row flex">
                                   <input name="projectCode" placeholder="Project Code" onChange={e => handleInput(e)} type="text" />
                              </div>
                              <div className="row flex">
                                   <input name="name" onChange={e => handleInput(e)} type="text" />
                              </div>
                              <div className="row flex col">
                                   <button onClick={handleSubmit} className="btn-add cleanbtn button">Save</button>
                                   <button onClick={() => setAddNew(false)} className="btn-add cleanbtn button">Cancel</button>
                              </div>
                         </div>
                    }
                    {
                         res.map((item, i) =>(
                             <ProjectItem item={item} />
                              // <div className="tlb-head tbl-list flex aic jc">
                              //      <div className="row flex">{item.id}</div>
                              //      <div className="row flex">{item.name}</div>
                              //      <div className="row flex col">
                              //           <Link to={'./update'}><button className="btn-add cleanbtn button">Update</button></Link>
                              //           <button className="btn-add cleanbtn button">Delete</button>
                              //      </div>
                              // </div>
                         ))
                    }
                    
               </div>
          </div>
          </>
     )
}

export default ProjectPage
