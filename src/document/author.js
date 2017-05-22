import React, { Component } from 'react'
import axios from 'axios'
import $ from 'JQuery'
import { Link } from 'react-router'
import style from './book.scss';
import { browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';





class Author extends Component {
    constructor() {
        super();

        this.state = {
            AuthorName: "",
            Name: "",
            Gender: "",
            Birthdate: "",
            penname: ""


        };
    }

    backPage = () => {
        browserHistory.push(`/${this.props.params.user}/app`);
    };

    componentWillMount() {
        axios.get(`http://localhost:3943/author/${this.props.params.id}`).then(res => res.data).then((data) => {
            this.state.AuthorName = data[0].AuthorName;
            this.state.Name = data[0].Name;
            this.state.Gender = data[0].Gender;
            this.state.Birthdate = data[0].Birthdate;

            document.getElementById('AuthorName').innerHTML = this.state.AuthorName;
                    document.getElementById('penname').innerHTML = this.state.AuthorName;
            document.getElementById('Name').innerHTML = 'Real Name: '+this.state.Name;
            document.getElementById('Gender').innerHTML = 'Gender: '+ this.state.Gender;
            document.getElementById('Birthdate').innerHTML = 'Birthdate: '+this.state.Birthdate;
        })
    }

    render() {
        return (
          <div style={{marginTop: '80px'}}>
          <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
          <Paper zDepth={4} style={{opacity: '0.95'}}>
          <div className={style['container']}>
          <header className={style['title']}>
          <h1><div id="AuthorName">Loading</div></h1>
          </header>

          <img src={require(`./authorimages/${this.props.params.id}.jpg`)} style={{marginTop: '10px', marginLeft: '90px', float: 'LEFT'}} />

          <div style={{textAlign: 'center', fontSize: '20px', marginLeft: '290px'}}>
          The Real Name <div id="Name" style={{fontSize: '15px',marginTop: '10px', marginBottom: '10px'}}>Loading</div>
          His/Her's Gender <div id="Gender" style={{fontSize: '15px',marginTop: '10px', marginBottom: '10px'}}>Loading</div>
          Birth on <div id="Birthdate" style={{fontSize: '15px',marginTop: '10px', marginBottom: '10px'}}>Loading</div>
          Pen Name <div id="penname" style={{fontSize: '15px',marginTop: '10px', marginBottom: '10px'}}>Loading</div>

          </div>
          <RaisedButton
          onTouchTap={this.backPage}
          label="Back"
          secondary={true}
          style={{marginLeft: '60px',marginRight: '15px', marginBottom: '15px', width: '80%'}}/>
          </div>
          </Paper>




          </MuiThemeProvider>

          </div>

        )
    }
}

export default Author
