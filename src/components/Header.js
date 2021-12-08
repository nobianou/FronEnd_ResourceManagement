import React, { useContext } from 'react';
import { useToasts } from 'react-toast-notifications';
import { UserContext } from '../App';

const Header = () => {
     const [, setUser] = useContext(UserContext);
     const { addToast } = useToasts();

     function handleLogout() {
          setUser(null);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          addToast('Logout Successful.', {
               appearance: 'info',
               autoDismiss: true,
               autoDismissTimeout: 3000
          });
     }
     return (
          <div className="header">
               <div className="wrap flex aic">
                    <div className="left flex">
                         <div className="ico icon-dashboard cfff font" />
                         <div className="lbl cfff flex aic jc s16 font">Resource Management</div>
                    </div>
                    <div className="center flex aic jc">
                         <div className="heading c222 s30 fontb font">Project</div>
                    </div>
                    <div className="right flex aic jc">
                         <div className="ico-user icon-user-circle-o s28" />
                         <button onClick={handleLogout} className="btn btn-signout cleanbtn button s16 b5 font">Sign out</button>
                    </div>
               </div>
          </div>
     )
}

export default Header
