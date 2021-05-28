import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import DashboardMenu from './menu';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Dashboard extends Component{
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        document.title = "Dashboard";
    }

    render() {
        return(
            <div className="main">
                <DashboardMenu />
                <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
                    <Grid item xs={12} lg={3}>
                        <Link to="/create-match">
                            <Paper className="dash-text">
                                <h1 className="center-text">Create Match</h1>
                            </Paper>
                        </Link>
                    </Grid>
                    <Grid item xs={12} lg={3}>
                        <Link to="/list-matches">
                            <Paper className="dash-text">
                                <h1 className="center-text">List Matches</h1>
                            </Paper>
                        </Link>
                    </Grid>
                    <Grid item xs={12} lg={3}>
                        <Link to="/create-team">
                            <Paper className="dash-text">
                                <h1 className="center-text">Add Teams</h1>
                            </Paper>
                        </Link>
                    </Grid>
                    <Grid item xs={12} lg={3}>
                        <Link to="/list-teams">
                            <Paper className="dash-text">
                                <h1 className="center-text">List Teams</h1>
                            </Paper>
                        </Link>
                    </Grid>
                </Grid>
            </div>
        );
    }
}