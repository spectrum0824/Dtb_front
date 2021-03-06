import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { deepOrange800 } from 'material-ui/styles/colors';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import style from './Login.scss';
import $ from 'JQuery';
import { browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import axios from 'axios';


function formatName(value) {
  return value;
}

const customDialog = {
  width: '40%',
  maxWidth: 'none',
};

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 100,

  },
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange800,
  },
});


class Login extends Component {
  componentWillMount() {
    injectTapEventPlugin();
  }
  
  constructor(props, context) {
    super(props, context);

    this.state = {
      canLogin: false,
      cantLogin: false,
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }


  handleClose1 = () => {
    this.setState({ canLogin: false });
    window.location.href = "http://localhost:8080/" + this.state.value;
    // browserHistory.push(`/` + this.state.value);
  };

  handleClose2 = () => {
    this.setState({ cantLogin: false });
  };

  handleLogin = () => {

    axios.get('http://localhost:3943/member').then(res => res.data).then((data) => {
            for(let i = 0;i<data.length;i++){
              if(this.state.value == data[i].Member_ID){
                  this.setState({ canLogin: true });
                  break;
              }
              if(i == data.length-1 && this.state.value != data[i].Member_ID){
                this.setState({cantLogin: true});
              }
            }

    })


  };

  render() {

    const actions = [
      <FlatButton
      label="Okay"
      primary={true}
      keyboardFocused={true}
      onTouchTap={this.handleClose1}
      />,
    ];

    const actions2 = [
      <FlatButton
      label="Okay"
      primary={true}
      keyboardFocused={true}
      onTouchTap={this.handleClose2}
      />,
    ];



    return (

      <div>


      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <div className={style['title']}>



      <h1>Welcome To Library</h1>


      <TextField
      hintText="Input ID Here"
      name="id"
      fullWidth={true}
      value={this.state.value}
      onChange={this.handleChange} />
      <br />
      <RaisedButton
      label="LOGIN"
      secondary={true}
      onTouchTap={this.handleLogin}
      fullWidth={true}
      />
      <Dialog
      title="Welcome"
      actions={actions}
      modal={false}
      contentStyle={customDialog}
      open={this.state.canLogin}
      onRequestClose={this.handleClose1}
      >
      <h1>
      Welcome, {formatName(this.state.value)}!
      </h1>
      </Dialog>

      <Dialog
      title="Error!"
      actions={actions2}
      modal={false}
      contentStyle={customDialog}
      open={this.state.cantLogin}
      onRequestClose={this.handleClose2}
      >
      <h1>
      Error!, {formatName(this.state.value)} not found !!
      </h1>
      </Dialog>

      </div>

      </MuiThemeProvider>

      </div>
    );
  }
}

export default Login;
