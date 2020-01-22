import React from 'react';


class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log("obj++",JSON.parse(localStorage.getItem('user')))
       
    }

    render() {
    
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi  {JSON.parse(localStorage.getItem('user')).name}</h1>
                <p>You're logged in with React & Basic HTTP Authentication!! </p>
                <h3>Users from secure api end point:</h3>
            </div>
        );
    }
}

export { HomePage };