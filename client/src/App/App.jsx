import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { PrivateRoute } from '../components/PrivateRoute';
import  HomePage from '../HomePage/HomePage';
import { MainPage } from '../LoginPage/MainPage';
import  StudentPage  from '../StudentPage/StudentPage';
import { StudentDetailPage } from '../StudentPage/StudentDetailPage';



class App extends React.Component {
    render() {
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        <Router>
                            <div>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <Route  path="/login" component={MainPage} />
                                <PrivateRoute exact  path="/student" component={StudentPage} />
                                <PrivateRoute  path="/student/:studentId" component={StudentDetailPage}  />
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

export { App };