import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import '../css/table.css';


const ResourcePage = () => {
     const baseURL = "http://localhost:8081";
     const [res, setRes] = useState([
          { id: 1, name: 'Resource 1', },
          { id: 2, name: 'Resource 2', },
          { id: 3, name: 'Resource 3', },
          { id: 4, name: 'Resource 4', },
     ]);
     const [columns, setColumns] = useState([
          { title: "Resource Code", field: "resourceCode" },
          { title: "Resource Name", field: "name" },

     ]);

     const [toShow, setToShow] = useState([]);
     const [showButtons, setShowButtons] = useState(false);
     const [addRow, setAddRow] = useState(false);
     const [addColumn, setAddColumn] = useState(false);
     const [rowInput, setRowInput] = useState({
          recourceCode: "",
          namr: "",
     });
     const [columnInput, setColumnInput] = useState({});

     useEffect(() => {
          setToShow([...res]);
     }, [res]);

     useEffect(() => {
          fetch(baseURL + "/resource")
          .then(res => res.json())
          .then(result => setRes(result));
     }, []);

     function handleSearch(e) {
          const search = e.target.value;
          if (search.length > 0) {
               setToShow(res.filter(({ name }) => {
                    return name.includes(search);
               }));
          } else {
               setToShow([...res]);
          }
     };
     function handleAddColumn() {
          setShowButtons(false);
          setAddColumn(true);
     };
     function handleAddRow() {
          setShowButtons(false);
          setAddRow(true);
     };
     function handleRowInput(e) {
          const newRowInput = { ...rowInput };
          newRowInput[e.target.name] = e.target.value;
          setRowInput(newRowInput);
     };
     function handleSaveRow() {
          const baseURL = "http://localhost:8081";
          fetch(baseURL + "/resource/create", {
               method: 'POST',
               body: JSON.stringify(rowInput),
               headers: {
                    'Content-type': 'application/json; charset=UTF-8',
               },
          })
              .then((response) => response.json())
              .then((json) => {
                   setRes([...res, rowInput]);
                   setAddRow(false);
                   setRowInput({});
              });
     };
     function handleColumnInput(e) {
          const newColumnInput = { ...columnInput };
          newColumnInput[e.target.name] = e.target.value;
          setColumnInput(newColumnInput);
     };
     function handleSaveColumn() {
          setColumns([...columns, columnInput]);
          setAddColumn(false);
          setColumnInput({});
     };

     return (
          <>
               <Header />
               <NavBar />

               <div className="resource-table">
                    {
                         addColumn && <div className="popup">
                              <div className="card">
                                   <input placeholder="Title" onChange={e => handleColumnInput(e)} value={columnInput.title} type="text" name="title" />
                                   <input placeholder="Field Name" onChange={e => handleColumnInput(e)} value={columnInput.name} type="text" name="field" />
                                   <div className="buttons">
                                        <button onClick={() => handleSaveColumn()}>Add</button>
                                        <button onClick={() => { setAddColumn(false); setColumnInput({}) }}>Cancel</button>
                                   </div>
                              </div>
                         </div>
                    }
                    <div className="table-header">
                         <div className="search">
                              <input onChange={e => handleSearch(e)} type="text" name="search" placeholder="Keyword" />
                              <button className="btn btn-orange">
                                   <img width="12px" src="./search-icon.png" alt="search" />
                              </button>
                         </div>
                         <h3>Resource Catalog</h3>
                         <div className="plus-button-container">
                              <button className="plus-button" onClick={() => setShowButtons(!showButtons)}>+</button>
                              {
                                   showButtons &&
                                   <div className="buttons">
                                        <button onClick={handleAddRow} >Add Row</button>
                                        <button onClick={handleAddColumn} >Add Column</button>
                                   </div>
                              }
                         </div>
                    </div>
                    <table>
                         <thead>
                              <tr>
                                   {
                                        columns.map(({ title }) => <th>{title}</th>)
                                   }
                              </tr>
                         </thead>
                         <tbody>
                              {
                                   toShow.map((item, i) => (
                                        <tr key={i}>
                                             {
                                                  columns.map(({ field }) => <td>{item[field]}</td>)
                                             }
                                        </tr>
                                   ))
                              }
                              {
                                   addRow &&
                                   <tr>
                                        {
                                             columns.map(({ field }, i) => (
                                                  i === 0 ? <td className="add-row">
                                                       <button onClick={handleSaveRow}>&#10003;</button>
                                                       <button onClick={() => setAddRow(false)} >x</button>
                                                       <input value={rowInput[field]} onChange={e => handleRowInput(e)} type="text" name={field} />
                                                  </td>
                                                       :
                                                       <td>
                                                            <input value={rowInput[field]} onChange={e => handleRowInput(e)} name={field} style={{ width: "100%", padding: "5px" }} type="text" />
                                                       </td>
                                             ))
                                        }

                                   </tr>
                              }
                         </tbody>
                    </table>
               </div>
               {/* <div className="resource-page flex aic jc">
               <div className="res-block flex col">
                    <div className="head flex">
                         <div className="row flex font b6">Resource Catalog</div>
                         <div className="row flex font b6">Action</div>
                    </div>
                    <div className="tlb-head flex aic jc">
                         <div className="row flex b6">Resource ID</div>
                         <div className="row flex b6">Resource Name</div>
                         <div className="row flex">
                              <button className="btn-add cleanbtn b6 button">Add</button>
                         </div>
                    </div>
                    {
                         toShow.map((item, i) =>(
                              <div className="tlb-head tbl-list flex aic jc">
                                   <div className="row flex">{item.id}</div>
                                   <div className="row flex">{item.name}</div>
                                   <div className="row flex col">
                                        <button className="btn-add cleanbtn button">Update</button>
                                        <button className="btn-add cleanbtn button">Delete</button>
                                   </div>
                              </div>
                         ))
                    }
                    
               </div>
          </div> */}
          </>
     )
}

export default ResourcePage
