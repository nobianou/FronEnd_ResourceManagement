import React, { useEffect, useState } from 'react'
// import {Link} from 'react-router-dom'

const DropDown = () => {


     const [hide, setHide] = useState(false)
     // eslint-disable-next-line
     const [category, setCategory] = useState([
          {id: 1, name: 'Project 1', slug: 'project1'},
          {id: 2, name: 'Project 2', slug: 'project2'},
          {id: 3, name: 'Project 3', slug: 'project3'},
     ])
     const [selectedCategory, setSelectedCategory] = useState(
          {name: 'Popular', slug: 'popular'}
     )

     useEffect( () => {
          document.addEventListener("click",  () => setHide(false))
     },[])
     console.log("DropDown value", hide)
     return (
          <div className="dropDown flex aic col rel">
               <div className="category flex aic">
                    <div className="box cleanbtn flex aic rel" onClick={(e) => {
                         e.stopPropagation();
                         setHide(!hide)
                    }}>
                         <div className="slt flex aic">
                              <div className="lbl font s14 b5">{selectedCategory.name}</div>
                         </div>
                         <div className="arrow s12 b6 anim icon-chevron-down"/>
                    </div>
               </div>
               <div className={`block flex aic abs ${hide ? 'showDropdown' : ''}`}>
                    <div className="manue flex aic col anim">
                         {
                              category.map((item, idex) => (
                                   <div 
                                        key={idex} 
                                        className="slt flex aic" 
                                        onClick= { e => {setSelectedCategory(item); setHide(!hide)}}
                                   >
                                        {/* <div className={`ico flex aic s18 ${item.icon_code}`}/> */}
                                        <div className="lbl flex aic c000 font s14 b4">{item.name}</div>
                                   </div>
                              ))
                         }
                    </div>
               </div>
          </div>
     )
}

export default DropDown
