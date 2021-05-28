import React, {Component} from 'react';
import { Grid } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import firebase from "../firebase/config";
import {Sugar} from 'react-preloaders';
import Player from './player';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            matches: [],
            frame: '',
            loading: true,
            teams: [],
            frames: []
        }
        this.findTeam = this.findTeam.bind(this);
        this.setFrame = this.setFrame.bind(this);
        this.setMatch = this.setMatch.bind(this);
        this.findComp = this.findComp.bind(this);
    }

    componentDidMount() {
        firebase.db.collection("matches").orderBy('date', 'desc').get()
        .then(res => {
            console.log(res.docs[0].data());
            this.setState({
                matches: res.docs,
                loading: false,
                frame: res.docs[0].data().frames[0].frame,
                frames: res.docs[0].data().frames
            });
        })
        .catch(err => {
            console.log(err);
            this.setState({
                loading: false
            });
        });
        firebase.db.collection("teams").get()
        .then(res => {
            console.log('team', res.docs[0].data());
            this.setState({
                teams: res.docs
            });
        })
        .catch(err => {
            console.log(err);
        })
    }

    findTeam(id){
        let res;
        this.state.teams.forEach(country => {
            if(country.ref.id == id)
                res = country.data().img;
        });
        console.log(res);
        return res;
    }

    setFrame(ind){
        this.setState({
            frame: this.state.frames[ind].frame
        });
    }

    setMatch(id) {
        let toren = this.state.matches.filter(match => {
            return match.ref.id == id
        });
        this.setState({
            frames: toren[0].data().frames,
            frame: toren[0].data().frames[0].frame,
        });
    }

    findComp(comp) {
        if(comp.toLowerCase().includes("fa cup"))
            return 'https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/032017/untitled-1_19.png?itok=s2DOSXYK';
        else if(comp.toLowerCase().includes("efl cup") || comp.toLowerCase().includes("capital one cup") || comp.toLowerCase().includes("carabao cup") || comp.toLowerCase().includes("carling cup"))
            return 'https://vignette.wikia.nocookie.net/the-football-database/images/c/ce/EFL_Cup_%282016%29.png/revision/latest/scale-to-width-down/340?cb=20160916134928';
        else if(comp.toLowerCase().includes("community shield"))
            return 'https://i.pinimg.com/originals/c7/c4/d5/c7c4d5f4c0bfc727f7ca98dfedf9d695.png';
        else if(comp.toLowerCase().includes("copa del rey"))
            return 'https://seeklogo.com/images/C/copa-del-rey-logo-866D8EA317-seeklogo.com.png';
        else if(comp.toLowerCase().includes("supercopa española"))
            return 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Supercopa_de_Espa%C3%B1a_Logo.png';
        else if(comp.toLowerCase().includes("dfl supercup"))
            return 'https://1.bp.blogspot.com/-ct6elVLuilc/WhYOIhSrAiI/AAAAAAABQLA/oCfMIFh3b1M-raURAmwaqOn_aFKXdvnHACLcBGAs/s1600/DFL-Supercup256x.png';
        else if(comp.toLowerCase().includes("pokal"))
            return 'https://a1.espncdn.com/combiner/i?img=%2Fi%2Fleaguelogos%2Fsoccer%2F500%2F2061.png';
        else if(comp.toLowerCase() == "coppa italia")
            return 'https://i.pinimg.com/originals/d7/99/ba/d799ba00502e96e959cc1189ffc49df7.png';
        else if(comp.toLowerCase().includes("supercoppa")  || comp.toLowerCase().includes("suppercopa"))
            return 'https://a4.espncdn.com/combiner/i?img=%2Fi%2Fleaguelogos%2Fsoccer%2F500%2F2316.png';
        else if(comp.toLowerCase().includes("coupe de ligue"))
            return 'https://freevectorlogo.net/wp-content/uploads/2013/10/coupe-de-la-ligue-vector-logo.png';
        else if(comp.toLowerCase().includes("coupe de france"))
            return 'https://3.bp.blogspot.com/-ucHGCoI-CdE/T09JF4IJJSI/AAAAAAAAEdQ/xwIg3V04Sxw/s1600/logo-coupe-france.png';
        else if(comp.toLowerCase().includes("trophee des champions"))
            return 'https://upload.wikimedia.org/wikipedia/en/a/a8/Troph%C3%A9e_des_Champions.png';
        else if(comp.toLowerCase().includes("uefa supercup"))
            return 'https://i.pinimg.com/originals/0c/bc/e0/0cbce0daf6a7314f5178892a5309edca.png';
        else if(comp.toLowerCase().includes("europa league"))
            return 'https://unity-img.tbxapis.com/v0/images/b4c85fcc47892808496e99bf44af1be4/section/5de546ae32fddd78bcbbbb5c/70ffde25cc64805b23dbea1fc62794f0/img.png';
        else if(comp.toLowerCase().includes("fifa"))
            return 'https://i.pinimg.com/originals/79/27/08/792708cb2200db24e8333c03edf8f3af.jpg';
        else return 'https://logonoid.com/images/uefa-logo.png';
    }

    render() {
        return(
            <div className="main">
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} lg={8}>
                        <Player render={this.state.frame} />
                        {this.state.frames.length > 1 && 
                            <div className="langs">
                                <h2 style={{color: "white"}}>Language: </h2>
                                <div className="lang-items">
                                    {this.state.frames.map((frame, ind) => {
                                        return(
                                            <Avatar className="pointer" key={ind} alt="Language" src={frame.lang} onClick={() => this.setFrame(ind)} />
                                        );
                                    })}
                                </div>
                            </div>
                        }
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <Paper>
                            <List dense={false} className="list-matches">
                                {this.state.matches.map((match, index) => {
                                    return(
                                        <ListItem className="match-item" key={index} onClick={() => this.setMatch(match.ref.id)}>
                                            <Grid container direction="row" justify="center" alignItems="center">
                                                <Grid item xs={3} md={2}>
                                                    <span>{match.data().season}</span>
                                                </Grid>
                                                <Grid item xs={2} md={2}>
                                                    <Avatar className="avatar-main" alt="Comp" src={this.findComp(match.data().competition)} />
                                                </Grid>
                                                <Grid item xs={3} md={4}>
                                                    <span>{`${match.data().title}`}</span>
                                                </Grid>
                                                <Grid item xs={4} md={3}>
                                                    <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
                                                        <Avatar className="avatar-main" alt="Home" src={this.findTeam(match.data().home)} />
                                                        <Avatar className="avatar-main" alt="Away" src={this.findTeam(match.data().away)} />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
                <Sugar customLoading={this.state.loading} background="linear-gradient(to right, #414345, #232526)" color="#FFFFFF" />
            </div>
        );
    }
}
