import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from "../App";
import Header from '../components/Header';
import NavBar from '../components/NavBar';



const ProjectPage = () => {
     const baseURL = "http://localhost:8081";
     const [user] = useContext(UserContext);
     const [projects, setProjects] = useState([]);
     const [selectedProject, setSelectedProject] = useState(0);
     const [allResources, setAllResources] = useState([]);
     const [unselectedResources, setUnselectedResources] = useState([]);
     const [selectedResources, setSelectedResources] = useState([]);
     const [resourcesToAdd, setResourcesToAdd] = useState([]);
     const [selectedResourcesFromProject, setSelectedResourcesFromProject] = useState([]);
     const [addedResources, setAddedResources] = useState([]);
     const [reload, setReload] = useState(false);

     useEffect(() => {
          fetch(baseURL + "/resource")
              .then(res => res.json())
              .then(result => {
                   setAllResources(result);
                   setUnselectedResources(result);
              });
          fetch(baseURL + "/project")
              .then(res => res.json())
              .then(result => {
                   setProjects(result);
              });


          setProjects([
               { id: 1, name: "Project 1" },
               { id: 2, name: "Project 2" },
               { id: 3, name: "Project 3" },
               { id: 4, name: "Project 4" },
               { id: 5, name: "Project 5" },
          ]);
          // setAllResources([
          //      { id: 1, name: 'Resource 1', },
          //      { id: 2, name: 'Resource 2', },
          //      { id: 3, name: 'Resource 3', },
          //      { id: 4, name: 'Resource 4', },
          // ]);
          // setUnselectedResources([
          //      { id: 1, name: 'Resource 1', },
          //      { id: 2, name: 'Resource 2', },
          //      { id: 3, name: 'Resource 3', },
          //      { id: 4, name: 'Resource 4', },
          // ]);
     }, []);

     function handleSelectResource(e) {
          const element = e.target;
          if (element.checked) {
               setSelectedResources([...selectedResources, element.value]);
          } else {
               setSelectedResources(selectedResources.filter(r => r !== element.value));
          }
     };
     function handleSelectResourceFromProject(e) {
          const element = e.target;
          if (element.checked) {
               setSelectedResourcesFromProject([...selectedResourcesFromProject, element.value]);
          } else {
               setSelectedResourcesFromProject(selectedResourcesFromProject.filter(r => r !== element.value));
          }
     };

     function handleToggleResourceSelection() {
          const checkbox = document.querySelectorAll("tr input");
          if (allResources.length === selectedResources.length) {
               setSelectedResources([]);
               checkbox.forEach(i => i.checked = false);
          } else {
               const sr = [];
               allResources.forEach(r => sr.push(String(r.id)));
               checkbox.forEach(i => i.checked = true);
               setSelectedResources([...sr]);
          }
     };

     function handleExport() {
          const sr = [];
          const usr = [];
          unselectedResources.forEach(r => {
               if (selectedResources.indexOf(String(r.id)) === -1) {
                    usr.push(r);
               } else {
                    sr.push(r);
               }
          });
          console.log(selectedResources)
          setResourcesToAdd([...sr]);
          setAddedResources([...sr, ...addedResources]);
          setUnselectedResources([...usr]);
     }

     function handleDeleteResourceFromProject() {
          // const sr = [];
          // const usr = [];
          // addedResources.forEach(r => {
          //      if (selectedResourcesFromProject.indexOf(String(r.id)) === -1) {
          //           usr.push(r);
          //      } else {
          //           sr.push(r);
          //      }
          // });
          // setAddedResources([...usr]);
          // setUnselectedResources([...unselectedResources, ...sr]);
          selectedResourcesFromProject.forEach(async (r, i) => {
               const res = await fetch(baseURL + "/project/removeResource/" + r, {
                    method: 'DELETE',
                    // body: JSON.stringify({ ...input, user }),
                    headers: {
                         'Content-type': 'application/json; charset=UTF-8',
                    },
               });
               // console.log(i, selectedResourcesFromProject.length);
               if(i === selectedResourcesFromProject.length - 1){
                    setReload(!reload);
               };
          });
          console.log(selectedResourcesFromProject);
     }

     function handleSelectProject(e) {
          setSelectedProject(e.target.value);
          setAddedResources([]);
          setSelectedResourcesFromProject([]);
          setSelectedResources([]);
     };
     useEffect(()=>{
          if(projects.length > 0){
               fetch(baseURL + "/project/resource/" + projects[selectedProject].id)
                   .then(res => res.json())
                   .then(r => {
                        const result = r.map(i => formateData(i));
                        console.log(result);
                        const notAddedResource = [];
                        const addedResourceId = [];
                        result.forEach(i => addedResourceId.push(i.id));
                        allResources.forEach(r => {
                             if (!addedResourceId.includes(r.id)) {
                                  notAddedResource.push(r);
                             };
                        });
                        setUnselectedResources([...notAddedResource]);
                        setAddedResources([...result]);
                   });
          }
     }, [selectedProject, projects, reload]);

     function handleSubmit() {
          resourcesToAdd.forEach(async r => {
               const res = await fetch(baseURL + "/project/addResource?pid="+projects[selectedProject].id+"&rid="+ r.id, {
                    method: 'POST',
                    // body: JSON.stringify({ ...input, user }),
                    headers: {
                         'Content-type': 'application/json; charset=UTF-8',
                    },
               })
          });
          // fetch(baseURL + "/project/create", {
          //      method: 'POST',
          //      body: JSON.stringify({ ...input, user })
          //      ,
          //      headers: {
          //           'Content-type': 'application/json; charset=UTF-8',
          //      },
          // })
          //      .then(res => res.json())
          //      .then(result => {
          //           setAddNew(false);
          //           setRes([...res, result]);
          //      })
     }

     // useEffect(() =>{

     //      fetch(baseURL + "/project/all")
     //          .then(res => res.json())
     //          .then(result => {
     //               setRes(result);
     //               console.log(result)
     //          })
     // }, []);


     function formateData(data){
          return {deleteID: data.id, ...data.resource};
     }

     return (
         <>
              <Header />
              <NavBar />

              <div style={{ padding: "100px 20px" }}>
                   <div style={{ display: "flex", justifyContent: "flex-end", padding: 10 }}>
                        <select value={selectedProject} onChange={(e) => handleSelectProject(e)}>
                             {
                                  projects.map(({ name }, index) => <option key={name} value={index}>{name}</option>)
                             }

                        </select>
                   </div>
                   <div className="flex" style={{ gap: 20 }}>
                        <div className="resource-table" style={{ flexGrow: 1, padding: "0" }}>
                             <div className="table-header">
                                  <h3>Resource Catalog</h3>
                                  <div className="plus-button-container">
                                       <button onClick={handleExport} className="plus-button">+</button>
                                  </div>
                             </div>
                             <table>
                                  <thead>
                                  <tr>
                                       {
                                            // columns.map(({ title }) => <th>{title}</th>)
                                       }
                                       <th>
                                            <input type="checkbox" onClick={handleToggleResourceSelection} />
                                       </th>
                                       <th>Resource Code</th>
                                       <th>Resource Name</th>
                                  </tr>
                                  </thead>
                                  <tbody>

                                  {
                                       unselectedResources.map((item, i) => (
                                           <tr key={item.id}>
                                                <td style={{ padding: "5px 0" }}>
                                                     <input onClick={e => handleSelectResource(e)} value={item.id} type="checkbox" />
                                                </td>
                                                <td style={{ padding: "5px 0" }}>{item.resourceCode}</td>
                                                <td style={{ padding: "5px 0" }}>{item.name}</td>
                                           </tr>)
                                       )
                                  }

                                  {
                                       // addRow &&
                                       // <tr>
                                       //      {
                                       //           columns.map(({ field }, i) => (
                                       //                i === 0 ? <td className="add-row">
                                       //                     <button onClick={handleSaveRow}>&#10003;</button>
                                       //                     <button onClick={() => setAddRow(false)} >x</button>
                                       //                     <input value={rowInput[field]} onChange={e => handleRowInput(e)} type="text" name={field} />
                                       //                </td>
                                       //                     :
                                       //                     <td>
                                       //                          <input value={rowInput[field]} onChange={e => handleRowInput(e)} name={field} style={{ width: "100%", padding: "5px" }} type="text" />
                                       //                     </td>
                                       //           ))
                                       //      }

                                       // </tr>
                                  }
                                  </tbody>
                             </table>
                        </div>
                        <div className="resource-table" style={{ flexGrow: 1, padding: "0" }}>
                             <div className="table-header">
                                  <h3>{projects[selectedProject]?.name || "loading"}</h3>
                                  <div className="plus-button-container">
                                       <button onClick={handleDeleteResourceFromProject} className="plus-button">-</button>
                                  </div>
                             </div>
                             <table>
                                  <thead>
                                  <tr>
                                       <th>Select</th>
                                       <th>Resource Code</th>
                                       <th>Resource Name</th>
                                  </tr>
                                  </thead>
                                  <tbody>

                                  {
                                       addedResources.map((item, i) => (
                                           <tr key={item.deleteID + i}>
                                                <td style={{ padding: "5px 0" }}>
                                                     <input onClick={e => handleSelectResourceFromProject(e)} value={item.deleteID} type="checkbox" />
                                                </td>
                                                <td style={{ padding: "5px 0" }}>{item.resourceCode}</td>
                                                <td style={{ padding: "5px 0" }}>{item.name}</td>
                                           </tr>)
                                       )
                                  }
                                  </tbody>
                             </table>
                        </div>
                   </div>
                   <div style={{ padding: 20, display: 'flex', justifyContent: "flex-end" }}>
                        <button onClick={handleSubmit}>Submit</button>
                   </div>
              </div>
         </>
     );
}

export default ProjectPage
