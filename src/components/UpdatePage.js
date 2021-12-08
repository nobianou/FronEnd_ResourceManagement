import React,{useState}from 'react'

const UpdatePage = () => {

     const [prj, setPrj] = useState('')
     const [prj1, setPrj1] = useState('')
     const [prj2, setPrj2] = useState('')

     return (
          <div className='update-page'>
               <div className='update-block flex aic jc col'>
                    <div className='page heading'>Update</div>
                    <div className='inputs flex col'>
                         <input type='text' 
                              className='txt-name s14 b4 font'
                              placeholder='Project'
                              value={prj}
                              onChange={(e) => {setPrj(e.target.value)}}
                         />
                         <input type='text' 
                              className='txt-name s14 b4 font'
                              placeholder='Project'
                              value={prj1}
                              onChange={(e) => {setPrj1(e.target.value)}}
                         />
                         <input type='text' 
                              className='txt-name s14 b4 font'
                              placeholder='Project'
                              value={prj2}
                              onChange={(e) => {setPrj2(e.target.value)}}
                         />
                         <button className="btn-update cleanbtn button s16 b5 c222 font">Save</button>
                    </div>
               </div>
          </div>
     )
}

export default UpdatePage
