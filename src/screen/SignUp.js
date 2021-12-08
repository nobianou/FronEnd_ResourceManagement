import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

const SignUp = () => {
     const { addToast } = useToasts();
     let history = useHistory();
     const [firstname, setFirstname] = useState('')
     const [lastname, setLastname] = useState('')
     const [username, setUsername] = useState('')
     const [mail, setMail] = useState('')
     const [password, setPassword] = useState('')
     const [phone, setPhone] = useState('')


     function handleSignup() {
          if(true){}
          const baseURL = "http://localhost:8081";
          fetch(baseURL + "/user/create", {
               method: 'POST',
               body: JSON.stringify({ username: username, password: password, firstName: firstname, lastName: lastname, email: mail, phone: phone })
               ,
               headers: {
                    'Content-type': 'application/json; charset=UTF-8',
               },
          })
               .then(res => res.json())
               .then(result => {
                    addToast('Registration Successful.', {
                         appearance: 'success',
                         autoDismiss: true,
                         autoDismissTimeout: 3000
                    });
                    history.replace("/login");
               })
               .catch(err => {
                    addToast("Something Wrong!", {
                         appearance: 'error',
                         autoDismiss: true,
                         autoDismissTimeout: 3000
                    });
               })
     }

     function ValidateEmail(mail) {
          if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
          {
               console.log("ValidateEmail")
               return (true)
          } else{
               addToast("Enter vallid email address!", {
                    appearance: 'error',
                    autoDismiss: true,
                    autoDismissTimeout: 3000
               });
               return (false)
          }
          
     }

     function CheckPassword(password) {
          if (!password){
               addToast("Password can't be blank!", {
                    appearance: 'error',
                    autoDismiss: true,
                    autoDismissTimeout: 3000
               });
          }
          else if(password.length<8){ 
               addToast("Password must be at least 8 characters long!", {
                    appearance: 'error',
                    autoDismiss: true,
                    autoDismissTimeout: 3000
               }); 
          }
          else if(!firstname){ 
               addToast("Enter your First Name!", {
                    appearance: 'error',
                    autoDismiss: true,
                    autoDismissTimeout: 3000
               }); 

          }
          else if(!lastname){ 
               addToast("Enter your last Name!", {
                    appearance: 'error',
                    autoDismiss: true,
                    autoDismissTimeout: 3000
               }); 
  
          }
          else if(!username){ 
               addToast("Enter your username!", {
                    appearance: 'error',
                    autoDismiss: true,
                    autoDismissTimeout: 3000
               }); 
          }
          else if(!mail){ 
               addToast("Enter your Email!", {
                    appearance: 'error',
                    autoDismiss: true,
                    autoDismissTimeout: 3000
               }); 
          }
          else if(!phone){ 
               addToast("Enter your Phone!", {
                    appearance: 'error',
                    autoDismiss: true,
                    autoDismissTimeout: 3000
               }); 
          }
          else {
               handleSignup()
               console.log('Signup done')
          }
     }


     return (
          <div className="signup-page flex aic jc">
               <div className="block flex aic jc col">
                    <div className="heading s40 fontb font">Sign up</div>
                    <div className="input-field flex col">
                         <div className="lbl s13 c333 fontb font">First Name</div>
                         <input type="text" className="input-name s14 anim font"
                              value={firstname}
                              onChange={(e) => setFirstname(e.target.value)}
                         />
                    </div>
                    <div className="input-field flex col">
                         <div className="lbl s13 c333 fontb font">Last Name</div>
                         <input type="text" className="input-name s14 anim font"
                              value={lastname}
                              onChange={(e) => setLastname(e.target.value)}
                         />
                    </div>
                    <div className="input-field flex col">
                         <div className="lbl s13 c333 fontb font">Username</div>
                         <input type="text" className="input-name s14 anim font"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                         />
                    </div>
                    <div className="input-field flex col">
                         <div className="lbl s13 c333 fontb font">Email</div>
                         <input 
                              type="email" 
                              className="input-name s14 anim font"
                              value={mail}
                              onChange={(e) => setMail(e.target.value)}
                         />
                    </div>
                    <div className="input-field flex col">
                         <div className="lbl s13 c333 fontb font">Phone</div>
                         <input type="text" className="input-name s14 anim font"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                         />
                    </div>
                    <div className="input-field flex col">
                         <div className="lbl s13 c333 fontb font">Password</div>
                         <input 
                              type="password" 
                              className="input-name s14 anim font"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                         />
                    </div>
                    <div className="input-field flex col">
                         <button onClick={() => {CheckPassword(password); ValidateEmail(mail)}} className="btn-loing cleanbtn button cfff s14 fontb font">Register</button>
                    </div>
                    <div className="input-field flex aic">
                         <input type="checkbox" className="check-box s20" />
                         <div className="lbl">Remember me</div>
                    </div>
                    <div className="signup-forgot signup-have-account input-field flex aic">
                         {/* <Link to={'/register'} className="btn-signup cleanbtn button cfff fontb font">sign up</Link> */}
                         <Link to='/login' className="btn-forgot-lbl cleanbtn button c222 s14 b5 font">Already have account</Link>
                    </div>
               </div>
          </div>
     )
}

export default SignUp
