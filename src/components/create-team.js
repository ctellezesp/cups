import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DashboardMenu from './menu';
import firebase from "../firebase/config";
import swal from 'sweetalert';


export default class CreateTeam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            team: '',
            img: '',
            country: '',
        }
        this.save = this.save.bind(this);
        this.setTeam = this.setTeam.bind(this);
        this.setImg = this.setImg.bind(this);
        this.setCountry = this.setCountry.bind(this);
    }

    setTeam(event){
        this.setState({
            team: event.target.value
        });
    }

    setCountry(event){
        this.setState({
            country: event.target.value
        });
    }

    setImg(event){
        this.setState({
            img: event.target.value
        });
    }

    save(){
        console.log(this.state);
        firebase.db.collection("teams").add(this.state)
        .then(() => {
            swal("Data added", "Team added correctly", "success")
            .then(() => {
                this.props.history.push("/list-teams");
            })
        })
        .catch(err => {
            console.log(err);
            swal("Error", "Verify your data", "error");
        })
    }


    render() {
        return(
            <div className="main">
                <DashboardMenu />
                <Grid container direction="row" justify="center" alignItems="flex-start" spacing={2}>
                    <Grid item xs={12} lg={6}>
                        <Paper className="input-cards">
                            <h2>Add Team</h2>
                            <Grid container direction="row" spacing={1}>
                                <Grid item xs={12}>
                                    <TextField 
                                        fullWidth 
                                        id="outlined-basic2" 
                                        label="Team" 
                                        variant="outlined"
                                        onChange={this.setTeam}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl variant="outlined" style={{width: "100%"}}>
                                        <InputLabel id="demo-simple-select-outlined-label">Country</InputLabel>
                                        <Select
                                            fullWidth
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            onChange={this.setCountry}
                                            label="Country"
                                        >
                                        <MenuItem value="" disabled>
                                            <em>Select team's country</em>
                                        </MenuItem>
                                        <MenuItem value="https://upload.wikimedia.org/wikipedia/en/thumb/b/be/Flag_of_England.svg/100px-Flag_of_England.svg.png">England</MenuItem>
                                        <MenuItem value="https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Flag_of_Spain.svg/100px-Flag_of_Spain.svg.png">Spain</MenuItem>
                                        <MenuItem value="https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/100px-Flag_of_Germany.svg.png">Germany</MenuItem>
                                        <MenuItem value="https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Flag_of_Italy.svg/100px-Flag_of_Italy.svg.png">Italy</MenuItem>
                                        <MenuItem value="https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/100px-Flag_of_France.svg.png">France</MenuItem>
                                        <MenuItem value="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/100px-Flag_of_Europe.svg.png">Other</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField 
                                        fullWidth 
                                        id="outlined-basic2" 
                                        label="Img" 
                                        variant="outlined" 
                                        onChange={this.setImg}
                                    />
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
                    <Grid item xs={12} lg={2}>
                        <Paper>
                            <img className="create-img" src={this.state.img} alt={this.state.img} width="100%" />
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}