import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {

const [show, setShow] = useState(false);

     return (
          <div className={`Nav-bar fixed rel anim show`}>
               <div className={show ? `block flex col anim show nav-visible` : `block flex col anim show`}>
               <button onClick={() => setShow(!show)} className="toggle-button">{show ? <>&#x3c;</> : <>&#x3e;</>}</button>
                    <Link to={'/'}
                         className="lbl cfff s15 fontb font"
                    >Resource Page</Link>
                    <Link to={'/projects'} 
                         className="lbl cfff s15 fontb font"
                    >Project Page</Link>
                    {/*<Link to={'/proejctsRes'}*/}
                    {/*     className="lbl cfff s15 fontb font"*/}
                    {/*>Project Resource Page</Link>*/}
                    <Link to={'/proejctCost'}
                         className="lbl cfff s15 fontb font"
                    >Formula</Link>
               </div>
          </div>
     )
}

export default NavBar
