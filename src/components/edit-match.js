import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import firebase from "../firebase/config";
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import DashboardMenu from './menu';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import swal from 'sweetalert';

export default class CreateMatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            data: [],
            title: '',
            home: '',
            away: '',
            competition: '',
            date: '',
            season: '',
            compAbr: '',
            frames: []
        }
        this.setTitle = this.setTitle.bind(this);
        this.setHome = this.setHome.bind(this);
        this.setAway = this.setAway.bind(this);
        this.setCompetition = this.setCompetition.bind(this);
        this.setDate = this.setDate.bind(this);
        this.setSeason = this.setSeason.bind(this);
        this.setCompAbr = this.setCompAbr.bind(this);
        this.addFrame = this.addFrame.bind(this);
        this.setFrame = this.setFrame.bind(this);
        this.setLang = this.setLang.bind(this);
        this.deleteFrame = this.deleteFrame.bind(this);
        this.save = this.save.bind(this);
    }

    componentDidMount() {
        firebase.db.collection("matches").doc(this.state.id).get()
        .then(res => {
            console.log(res.data().frames);
            this.setState({
                title: res.data().title,
                home: res.data().home,
                away: res.data().away,
                competition: res.data().competition,
                compAbr: res.data().compAbr,
                date: res.data().date,
                season: res.data().season,
                frames: res.data().frames
            });
            console.log(res.data());
        })
        .catch(err => {
            console.log(err);
        });  
        firebase.db.collection("teams").orderBy('team', 'asc').get()
        .then(res => {
            this.setState({
                data: res.docs
            });
        })
        .catch(err => {
            console.log(err);
        }); 
    }

    setTitle(event) {
        this.setState({
            title: event.target.value
        });
    }

    setHome(event) {
        this.setState({
            home: event.target.value
        });
    }

    setAway(event) {
        this.setState({
            away: event.target.value
        });
    }

    setCompetition(event) {
        this.setState({
            competition: event.target.value
        });
    }

    setDate(event) {
        this.setState({
            date: event.target.value
        });
    }

    setCompAbr(event) {
        this.setState({
            compAbr: event.target.value
        });
    }

    setSeason(event) {
        this.setState({
            season: event.target.value
        });
    }

    addFrame(){
        this.setState({
            frames: [...this.state.frames, {"lang": '', "frame": ''}]
        })
    }

    setFrame(event, indice) {
        this.state.frames[indice].frame = event.target.value;
    }

    setLang(event, indice){
        this.state.frames[indice].lang = event.target.value;
    }

    deleteFrame(index){
        let sum = [];
        this.state.frames.forEach(frame => {
            if(frame.frame != index){
                sum.push(frame);
            }
        });
        this.setState({
            frames: sum
        });
    }


    save() {
        if(this.state.home !== this.state.away) {
            const toSave = {
                title: this.state.title,
                home: this.state.home,
                away: this.state.away,
                competition: this.state.competition,
                date: this.state.date,
                season: this.state.season,
                compAbr: this.state.compAbr,
                frames: this.state.frames
            }
            firebase.db.collection("matches").doc(this.state.id).set(toSave, {merge: true})
            .then(res => {
                swal("Edit added", "Match is edited", "success")
                .then(() => {
                    this.props.history.push("/list-matches");
                })
            })
            .catch(err => {
                console.log(err);
                swal("Error", "Verify your data", "error");
            });
        } else {
            swal("Error", "Team could not be the same", "error");
        }
    }


    render() {
        return(
            <div className="main">
                <DashboardMenu />
                <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
                    <Grid item xs={12} md={8}>
                        <Paper style={{padding: "20px"}}>
                            <Grid container direction="row" >
                                <h2>Edit Match</h2>
                                <Grid item xs={12} className="top-10">
                                    <TextField id="title" label="Title" fullWidth variant="outlined" value={this.state.title} onChange={this.setTitle} />
                                </Grid>
                                <Grid item xs={12} lg={6} className="top-10">
                                    <FormControl variant="outlined" style={{width: "98%"}}>
                                        <InputLabel id="demo-simple-select-outlined-label">Home</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        fullWidth
                                        label="Home"
                                        value={this.state.home}
                                        onChange={this.setHome}
                                        >
                                        <MenuItem value="" disabled>
                                            <em>Select a team</em>
                                        </MenuItem>
                                        {this.state.data.map((team, index) => {
                                            return <MenuItem value={team.ref.id} key={index}>{team.data().team}</MenuItem>
                                        })}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} lg={6} className="top-10">
                                    <FormControl variant="outlined" style={{width: "100%"}}>
                                        <InputLabel id="demo-simple-select-outlined-label">Away</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        fullWidth
                                        label="Away"
                                        value={this.state.away}
                                        onChange={this.setAway}
                                        >
                                        <MenuItem value="" disabled>
                                            <em>Select a team</em>
                                        </MenuItem>
                                        {this.state.data.map((team, index) => {
                                            return <MenuItem value={team.ref.id} key={index}>{team.data().team}</MenuItem>
                                        })}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} lg={4} className="top-10">
                                    <TextField style={{width: "98%"}} id="comp" label="Competition" fullWidth variant="outlined" value={this.state.competition} onChange={this.setCompetition} />
                                </Grid>
                                <Grid item xs={12} lg={2} className="top-10">
                                    <TextField style={{width: "98%"}} id="comp-abr" label="Competition Abr" fullWidth variant="outlined" value={this.state.compAbr} onChange={this.setCompAbr} />
                                </Grid>
                                <Grid item xs={12} lg={3}  className="top-10">
                                    <TextField style={{width: "98%"}} id="season" label="Season" fullWidth variant="outlined" value={this.state.season} onChange={this.setSeason} />
                                </Grid>
                                <Grid item xs={12} lg={3} className="top-10">
                                <TextField
                                    fullWidth
                                    id="date"
                                    variant="outlined"
                                    label="Date"
                                    type="date"
                                    value={this.state.date}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={this.setDate}
                                />
                                </Grid>
                                <Grid item xs={12}>
                                    <h4>Frames:</h4>
                                </Grid>
                                {this.state.frames.map((f,i) => {
                                    return <p key={i}>hola</p>;
                                })}
                                {this.state.frames.map((frame, ind) => {
                                    return(
                                        <div key={ind} style={{width: "100%"}}>
                                            <Grid container direction="row">
                                                <Grid item xs={3} className="top-10">
                                                    <FormControl variant="outlined" style={{width: "98%"}}>
                                                        <InputLabel id="demo-simple-select-outlined-label">Language</InputLabel>
                                                        <Select
                                                            fullWidth
                                                            labelId="demo-simple-select-outlined-label"
                                                            id="demo-simple-select-outlined"
                                                            value={frame.lang}
                                                            onChange={(e) => this.setLang(e, ind)}
                                                            label="Language"
                                                        >
                                                            <MenuItem value="" disabled>
                                                                <em>Select language</em>
                                                            </MenuItem>
                                                            <MenuItem value="https://upload.wikimedia.org/wikipedia/en/thumb/b/be/Flag_of_England.svg/100px-Flag_of_England.svg.png">English</MenuItem>
                                                            <MenuItem value="https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Flag_of_Spain.svg/100px-Flag_of_Spain.svg.png">Español</MenuItem>
                                                            <MenuItem value="https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/100px-Flag_of_Germany.svg.png">German</MenuItem>
                                                            <MenuItem value="https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Flag_of_Italy.svg/100px-Flag_of_Italy.svg.png">Italian</MenuItem>
                                                            <MenuItem value="https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/100px-Flag_of_France.svg.png">French</MenuItem>
                                                            <MenuItem value="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/100px-Flag_of_Europe.svg.png">Other</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={8} className="top-10">
                                                    <TextField id="frame" label="Frame" fullWidth variant="outlined" value={frame.frame} onChange={(e) => this.setFrame(e, ind)}/>
                                                </Grid>
                                                <Grid item xs={1} style={{paddingLeft: 15}}>
                                                    <Fab color="primary" aria-label="add" style={{margin: 10}} onClick={this.deleteFrame(frame.frame)}>
                                                        <DeleteIcon />
                                                    </Fab>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    );
                                })}
                                <Grid item xs={12} className="top-10">
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        startIcon={<AddIcon />}
                                        onClick={this.addFrame}
                                    >
                                        Add Frame
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid container direction="row-reverse" style={{marginTop: "10px"}}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    startIcon={<SaveIcon />}
                                    onClick={this.save}
                                >
                                    Save
                                </Button>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
