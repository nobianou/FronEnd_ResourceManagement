import {Link} from "react-router-dom";
import {useState} from "react";

export default function ProjectItem({item}){
    const baseURL = "http://localhost:8081";
    const [willUpdate, setWillUpdate] = useState(false);
    const [name, setName] = useState(item.name);

    function handleUpdate(){
        if(willUpdate){
            console.log(name);
            fetch(baseURL + "/project/update", {
                method: 'PUT',
                "Access-Control-Allow-Origin": "*",
                body: JSON.stringify({id: item.id, name})
                ,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then(res => res.json())
                .then(result => {
                    console.log(result);
                })
                .catch(err => {
                    console.log(err);
                })
        }else{
            setWillUpdate(true);
        }
    }
    return(
        <div className="tlb-head tbl-list flex aic jc">
            <div className="row flex">{item.id}</div>
            {
                willUpdate ?
                    <input onChange={e => setName(e.target.value)} value={name} type="text"/> :
                        <div className="row flex">{item.name}</div>
            }

            <div className="row flex col">
                <button onClick={handleUpdate} className="btn-add cleanbtn button">{willUpdate ? "Save" : "Update"}</button>
                {
                    willUpdate ?
                        <button onClick={() => setWillUpdate(false)} className="btn-add cleanbtn button">Cancel</button>
                        :
                        <button className="btn-add cleanbtn button">Delete</button>
                }
            </div>
        </div>
    )
}