import { createContext, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import UpdatePage from './components/UpdatePage';
import './css/App.css';
import './css/props.css';
import './css/style.css';
import Login from './screen/Login';
import ProjectCost from './screen/ProjectCost';
import ProjectPage from './screen/ProjectPage';
import ProjectResourcePage from './screen/ProjectResourcePage';
import ResourcePage from './screen/ResourcePage';
import SignUp from './screen/SignUp';
import PrivateRoute from "./components/PrivateRoute"

export const UserContext = createContext(null);


function App() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    return (
        <div className="App">
            <UserContext.Provider value={[user, setUser]}>
                <ToastProvider >
                    <BrowserRouter>
                        <PrivateRoute exact path='/'>
                            <ResourcePage />
                        </PrivateRoute>
                        {/* <Route exact path='/'>
             <ResourcePage />
            </Route> */}
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/register' component={SignUp} />

                        <PrivateRoute exact path='/projects'>
                            <ProjectPage />
                        </PrivateRoute>
                        <PrivateRoute exact path='/proejctsRes'>
                            <ProjectResourcePage />
                        </PrivateRoute>
                        <PrivateRoute exact path='/proejctCost'>
                            <ProjectCost />
                        </PrivateRoute>
                        <PrivateRoute exact path='/update'>
                            <UpdatePage />
                        </PrivateRoute>

                        {/* <Route exact path='/projects'>
              <ProjectPage />
            </Route>
            <Route exact path='/proejctsRes'>
              <ProjectResourcePage />
            </Route>
            <Route exact path='/proejctCost'>
              <ProjectCost />
            </Route>
            <Route exact path='/update'>
              <UpdatePage />
            </Route> */}


                        {/* <Route exact path='/resouces' component={ResourcePage} exact /> */}
                        {/* <Route exact path='/projects' component={ProjectPage} exact /> */}
                        {/* <Route exact path='/proejctsRes' component={ProjectResourcePage} exact /> */}
                        {/* <Route exact path='/proejctCost' component={ProjectCost} exact /> */}
                        {/* <Route exact path='/update' component={UpdatePage} exact /> */}
                    </BrowserRouter>
                </ToastProvider>
            </UserContext.Provider>
        </div >
    );
}

export default App;
