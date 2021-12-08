import React, { useState } from 'react'
import DropDown from '../components/DropDown'
import Header from '../components/Header'
import NavBar from '../components/NavBar'


const ProjectCost = () => {
     // eslint-disable-next-line
     const [res, setRes] = useState([
          {id: 'Resource 1', qty: '2', price: '10', t_price: '20',},
          {id: 'Resource 3', qty: '12', price: '90', t_price: '170',},
          {id: 'Resource 4', qty: '6', price: '45', t_price: '88',},
          {id: 'Resource 6', qty: '4', price: '100', t_price: '200',},
     ])

     return (
          <>
          <Header/>
          <NavBar/>
          <div className="project-cost resource-page flex aic jc col">
               
               <DropDown/>
               <div className="res-block flex col">
                    <div className="tlb-head flex aic jc">
                         <div className="row flex b6">Resource Name</div>
                         <div className="row flex b6">Quantity</div>
                         <div className="row flex b5 font aic jc t-c">Price</div>
                         <div className="row flex b5 font aic jc t-c">Total Price</div>
                    </div>
                    {
                         res.map((item, i) =>(
                              <div className="tlb-head tbl-list flex aic jc">
                                   <div className="row flex">{item.id}</div>
                                   <div className="row flex">{item.qty}</div>
                                   <div className="row flex ">{item.price}</div>
                                   <div className="row flex ">{item.t_price}</div>
                              </div>
                         ))
                    }
                    
               </div>
          </div>
          </>
     )
}

export default ProjectCost
