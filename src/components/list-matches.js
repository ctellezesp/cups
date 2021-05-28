import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import DashboardMenu from './menu';
import firebase from "../firebase/config";
import swal from 'sweetalert';
import {Zoom} from 'react-preloaders';

export default class ListMatches extends Component{
    constructor(props){
        super(props);
        this.state = {
            matches: [],
            countries: [],
            competitions: [],
            searchTxt: '',
            toRender: [],
            seasons: [],
            searching: false,
            loading: true
        }
        this.delete = this.delete.bind(this);
        this.findTeam = this.findTeam.bind(this);
        this.findImg = this.findImg.bind(this);
        this.findComp = this.findComp.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.mySearch = this.mySearch.bind(this);
        this.doSearch = this.doSearch.bind(this);
        this.restoreMatch = this.restoreMatch.bind(this);
        this.searchComp = this.searchComp.bind(this);
        this.toSearch = this.toSearch.bind(this);
    }

    componentDidMount(){
        firebase.db.collection("matches").orderBy('date', 'desc').get()
        .then(res => {
            console.log(res.docs[0].data());
            this.setState({
                matches: res.docs,
                toRender: res.docs,
                loading: false
            });
        })
        .catch(err => {
            console.log(err);
        });
        firebase.db.collection("teams").orderBy('team', 'asc').get()
        .then(res => {
            let sum = []
            res.docs.forEach(country => sum.push({
                "id": country.ref.id,
                "team": country.data().team,
                "country": country.data().country,
                "img": country.data().img
            }));
            this.setState({countries: sum});
            console.log(sum);
        })
        .catch(err => {
            console.log(err);
        });
    }

    findImg(id){
        let res;
        this.state.countries.forEach(country => {
            if(country.id === id)
                res = country.img;
        });
        return res;
    }

    findTeam(id){
        let res;
        this.state.countries.forEach(country => {
            if(country.id == id)
                res = country.img;
        });
        console.log(res);
        return res;
    }

    findComp(id){
        let res;
        this.state.competitions.forEach(comp => {
            if(comp.id == id)
                res = comp.title;
        });
        return res;
    }

    mySearch(event) {
        this.setState({
            searchTxt: event.target.value
        });
    }

    handleClose(){
        this.setState({
            open: !this.state.open
        });
    }

    doSearch(){
        let searchRes = this.state.matches.filter(match => match.data().tags.includes(this.state.searchTxt.toLowerCase()));
        console.log(searchRes);
        this.setState({
            toRender: searchRes
        });
        this.handleClose();
    }

    restoreMatch(){
        this.setState({
            toRender: this.state.matches,
            searchTxt: ''
        });
    }

    searchComp(comp){
        let newRes = this.state.matches.filter(match => match.data().season == comp);
        this.setState({
            toRender: newRes,
            searchTxt: comp
        });
        this.handleClose();
    }

    toSearch() {
        firebase.db.collection("matches").where("season", "==", this.state.searchTxt).get()
        .then(res => {
            this.setState({
                toRender: res.docs
            });
        });
        this.setState({
            searching: true
        });
    }

    delete(id){
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this team!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              firebase.db.collection("matches").doc(id).delete()
              .then(res => {
                swal("Match Eliminated correctly", {
                  icon: "success",
                });
                firebase.db.collection("matches").orderBy('date', 'desc').get()
                .then(res => {
                    this.setState({
                        matches: res.docs
                    })
                })
                .catch(err => {
                    console.log(err)
                });
              })
              .catch(err => {
                swal("Error", {
                  icon: "error",
                });
              })
            } else {
              swal("You don't deleted this match");
            }
          });
    }

    render(){
        return(
            <div className="main">
                <DashboardMenu />
                <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
                    <Grid item xs={12}>
                        <Link to="/create-match">
                            <Button
                                fullWidth
                                variant="contained"
                                    color="primary"
                                    size="small"
                                    startIcon={<AddIcon />}
                            >
                                Create Match
                            </Button>
                        </Link>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
                            <Grid item xs={8}>
                                <Paper style={{width: "100%", padding: "5px"}}>
                                    <TextField 
                                        id="outlined-basic" 
                                        label="Season" 
                                        variant="outlined" 
                                        placeholder="Search by Season YYYY/YYYY" 
                                        onChange={this.mySearch} 
                                    />   
                                </Paper>
                            </Grid>
                            <Grid item xs={4}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    startIcon={<SearchIcon />}
                                    onClick={this.toSearch}
                                >
                                    Search
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            size="small"
                            startIcon={<RotateLeftIcon />}
                            onClick={this.restoreMatch}
                        >
                            Restore
                        </Button>
                    </Grid>
                </Grid>
                <Grid container direction="column" justify="center" alignItems="center">
                    <h3 className="text-white">Matches</h3>
                    <Grid item xs={12}>
                        <Paper>
                            <TableContainer>
                                <Table style={{width: "100%"}} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left">Home</TableCell>
                                            <TableCell align="left">Away</TableCell>
                                            <TableCell align="left">Date</TableCell>
                                            <TableCell align="left">Season</TableCell>
                                            <TableCell align="left">Competition</TableCell>
                                            <TableCell align="left">Title</TableCell>
                                            <TableCell align="left">Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.toRender.map((match,index) => (
                                            <TableRow key={index}>
                                                <TableCell align="left"><Avatar alt={this.findTeam(match.data().home)} src={this.findImg(match.data().home)} /></TableCell>
                                                <TableCell align="left"><Avatar alt={this.findTeam(match.data().away)} src={this.findImg(match.data().away)} /></TableCell>
                                                <TableCell align="left">{match.data().date}</TableCell>
                                                <TableCell align="left">{match.data().season}</TableCell>
                                                <TableCell align="left">{match.data().competition}</TableCell>
                                                <TableCell align="left">{match.data().title}</TableCell>
                                                <TableCell align="left">
                                                    <Link to={`/player/${match.ref.id}`}>
                                                        <IconButton aria-label="watch" size="small">
                                                            <VisibilityIcon fontSize="inherit" />
                                                        </IconButton>
                                                    </Link>
                                                    <Link to={`edit-match/${match.ref.id}`}>
                                                        <IconButton aria-label="edit" size="small">
                                                            <EditIcon fontSize="inherit" color="primary" />
                                                        </IconButton>
                                                    </Link>
                                                    <IconButton aria-label="delete" size="small" onClick={() => this.delete(match.ref.id)}>
                                                        <DeleteIcon fontSize="inherit" color="secondary"/>
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                </Grid>
                <Zoom customLoading={this.state.loading} background="#000B24" color="#FFFFFF" />
            </div>
        );
    }
}
