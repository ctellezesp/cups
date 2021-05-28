import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import CreateTeam from './components/create-team';
import EditTeam from './components/edit-team';
import ListTeams from './components/list-teams';
import CreateMatch from './components/create-match';
import EditMatch from './components/edit-match';
import ListMatches from './components/list-matches';
import Main from './components/main';
import Dashboard from './components/dashboard';

export default function App(){
  return(
    <div>
      <Router>
        <Route path='/' exact component={Main} />
        <Route path='/create-team' component={CreateTeam} />
        <Route path='/edit-team/:id' component={EditTeam} />
        <Route path='/list-teams' component={ListTeams} />
        <Route path='/create-match' component={CreateMatch} />
        <Route path='/edit-match/:id' component={EditMatch} />
        <Route path='/list-matches' component={ListMatches} />
        <Route path='/dashboard' component={Dashboard} />
      </Router>
    </div>
  );
}