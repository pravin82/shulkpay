import React from 'react';


class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogOut = this.handleLogOut.bind(this);

    }

    componentDidMount() {
       this.setState(JSON.parse(localStorage.getItem('user')))
       
    }
    handleLogOut(e) {
        localStorage.removeItem('user');
        this.props.history.push('/login');  
    }

    render() {
    
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi  {JSON.parse(localStorage.getItem('user')).name}</h1>
                <p>You're logged in with React & Basic HTTP Authentication!! </p>
                <h3>Users from secure api end point:</h3>
                <button type="button" className="btn" onClick={this.handleLogOut}>
                 LogOut
                </button>
            </div>
        );
    }
}

export { HomePage };