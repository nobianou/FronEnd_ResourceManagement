import React, { useContext, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { UserContext } from '../App';


const Login = () => {
    const { addToast } = useToasts();
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const [, setUser] = useContext(UserContext);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function handleLogin() {
        const baseURL = "http://localhost:8081";
        if (username && password) {
            fetch(baseURL + "/user/login", {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => response.json())
                .then((json) => {
                    localStorage.setItem("token", json.token);
                    localStorage.setItem("user", JSON.stringify(json.user));
                    setUser(json.user);
                    history.replace(from);
                })
                .catch(() => {
                    addToast("Something Wrong!", {
                        appearance: 'error',
                        autoDismiss: true,
                        autoDismissTimeout: 3000
                    });
                });
        } else{
            addToast("Please Enter Username and Password!", {
                appearance: 'warning',
                autoDismiss: true,
                autoDismissTimeout: 3000
            });
        }
    };

    return (
        <div className="login-page flex aic jc">
            <div className="block flex aic jc col">
                <div className="heading s40 fontb font">Login</div>
                <div className="input-field flex col">
                    <div className="lbl s13 c333 fontb font">Username</div>
                    <input type="text" className="input-name s14 anim font"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="input-field flex col">
                    <div className="lbl s13 c333 fontb font">Password</div>
                    <input type="password" className="input-name s14 anim font"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="input-field flex col">
                    <button onClick={handleLogin} className="btn-loing cleanbtn button flex aic jc cfff s14 fontb font">Login</button>
                </div>
                <div className="input-field flex aic">
                    <input type="checkbox" className="check-box s20" />
                    <div className="lbl">Remember me</div>
                </div>
                <div className="signup-forgot input-field flex aic">
                    <Link to={'/register'} className="btn-signup cleanbtn button cfff fontb font">sign up</Link>
                    <button className="btn-forgot-lbl cleanbtn button font">Forgot password?</button>
                </div>
            </div>
        </div>
    )
}

export default Login
