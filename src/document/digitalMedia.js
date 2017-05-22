import React, { Component } from 'react'
import axios from 'axios'
import $ from 'JQuery'
import style from './book.scss';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const customDialog = {
  width: '25%',
  maxWidth: 'none',
};


class DigitalMedia extends Component {
  constructor() {
    super();

    this.state = {
        ID: "",
          MediaName: "",
          Director: "",
          RunTime: "",
          Year: "",
          open: false
    };
  }


  handleBorrow = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });

  };
  // componentWillMount() {
  //     // axios.get(`http://localhost:3943/DigitalMedia/${this.props.params.id}`).then(res => res.data).then((data) => {
  //     //     this.state.Name = data[0].Author_Name;
  //     //     document.getElementById('body').innerHTML = this.state.Name;
  //     // })
  // }
  componentWillMount() {

    injectTapEventPlugin();
    axios.get(`http://localhost:3943/digitalMedia/${this.props.params.id}`).then(res => res.data).then((data) => {
            this.state.ID = data[0].Media_ID;
            this.state.MediaName = data[0].MediaName;
            this.state.Director = data[0].Director;
            this.state.RunTime = data[0].RunTime;
            this.state.Year = data[0].Year;

            document.getElementById('ID').innerHTML = 'Media_ID: '+this.state.ID;
            document.getElementById('MediaName').innerHTML = this.state.MediaName;
            document.getElementById('Director').innerHTML = 'Director: '+this.state.Director;
            document.getElementById('RunTime').innerHTML = this.state.RunTime + " minutes";
            document.getElementById('Year').innerHTML = 'Aired: '+this.state.Year;
        })

  }


  onBorrow() {
        axios.post('http://localhost:3943/borrowDigitalMedia',{
            user: this.props.params.user,
            mediaID: this.state.ID
        }).then(res => res.data).then((data) => {

        })
        this.handleClose();
            browserHistory.push(`/${this.props.params.user}/digital`);
    }

  render() {

    const actions = [
      <RaisedButton
      label="Yes"
      primary={true}
      keyboardFocused={true}
      onTouchTap={(e) => this.onBorrow(e)}
      />,
      <FlatButton
      label="Cancel"
      primary={true}
      onTouchTap={this.handleClose}
      />
    ];


    return (
      <div style={{marginTop: '80px'}}>
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <Paper zDepth={4} style={{opacity: '0.95'}}>
      <div className={style['container']}>
      <header className={style['title']}>
      <h1><div id="MediaName">Loading</div></h1>
      </header>

      <img src={require(`./digitalmediaimages/${this.props.params.id}.jpg`)} style={{marginTop: '10px', marginLeft: '90px', float: 'LEFT'}} />

      <div style={{textAlign: 'center', fontSize: '20px', marginLeft: '290px'}}>
      Movie ID <div id="ID" style={{fontSize: '15px',marginTop: '10px', marginBottom: '10px'}}>Loading</div>
      Runtime Of Movie <div id="RunTime" style={{fontSize: '15px',marginTop: '10px', marginBottom: '10px'}}>Loading</div>
      Director<div id="Director" style={{fontSize: '15px',marginTop: '10px', marginBottom: '10px'}}>Loading</div>
      This Movie is out when<div id="Year" style={{fontSize: '15px',marginTop: '10px', marginBottom: '10px'}}>Loading</div>
      </div>

      <RaisedButton
      onTouchTap={this.handleBorrow}
      label="Borrow"
      secondary={true}
      style={{marginLeft: '60px',marginRight: '15px', marginBottom: '15px', width: '80%'}}/>
      <Dialog
      title="Confirm"
      actions={actions}
      modal={false}
      contentStyle={customDialog}
      open={this.state.open}
      onRequestClose={this.handleClose}
      >
      Do you want to borrow this DigitalMedia ?
      </Dialog>
      </div>
      </Paper>




      </MuiThemeProvider>

      </div>




    )
  }
}

export default DigitalMedia
