import React, { useState } from 'react'
import { Link } from "react-router-dom"
import Header from '../components/Header'
import NavBar from '../components/NavBar'


const ProjectResourcePage = () => {
     // eslint-disable-next-line
     const [res, setRes] = useState([
          {id: "Project 1", name: 'Resource 1', name2: 'Resource 3',},
          {id: "Project 2", name: 'None', name2: '',},
          {id: "Project 3", name: 'Resource 2', name2: '',},
          {id: "Project 4", name: 'Resource 4', name2: 'Resource 2',},
     ])

     return (
          <>
          <Header/>
          <NavBar/>
          <div className="project-res resource-page flex aic jc">
               <div className="res-block flex col">
                    <div className="tlb-head flex aic jc">
                         <div className="row flex b6">Project Name</div>
                         <div className="row flex b6">Added Resources</div>
                         <div className="row flex b5 font aic jc t-c">
                              Add/Delete Resources to Project
                         </div>
                    </div>
                    {
                         res.map((item, i) =>(
                              <div className="tlb-head tbl-list flex aic jc">
                                   <div className="row flex">{item.id}</div>
                                   <div className="row flex">{item.name}<br/>{item.name2}</div>
                                   <div className="row flex col">
                                       <Link to={'./update'}><button  className="btn-add cleanbtn button">Update</button></Link>
                                        <button className="btn-add cleanbtn button">Delete</button>
                                   </div>
                              </div>
                         ))
                    }
                    
               </div>
          </div>
          </>
     )
}

export default ProjectResourcePage
