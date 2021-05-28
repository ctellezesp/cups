import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class DashboardMenu extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="nav-main">
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" className="txtHead">
                            European Cups
                        </Typography>
                        <Link to="/dashboard">
                            <Button color="inherit">Dashboard</Button>
                        </Link>
                        <Link to="/">
                            <Button color="inherit">Home</Button>
                        </Link>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}
