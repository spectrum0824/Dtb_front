import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import RaisedButton from 'material-ui/RaisedButton';
import { deepOrange800 } from 'material-ui/styles/colors';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import styles from './Home.scss'
import { browserHistory } from 'react-router';

function formatName(value) {
  return value;
}

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange800,
  },
});


class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
            newVal: ''
        };
  }

  render() {
    return (


      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <div className={styles['title']}>
      <h2 >
          Hello, {formatName(this.props.location.state.message)}!
      </h2>

  </div>
      </MuiThemeProvider>





    )
  }
}

export default Home
