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
import $ from 'JQuery';
import axios from 'axios'



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

  componentWillMount(){
        this.bookTable()
        this.digitalMediaTable()

  }

    bookTable(){
          axios.get(`http://localhost:3943/userBook/${this.props.params.user}`).then(res => res.data).then((data) => {
              var columns = [];
              var headerTr$ = $('<tr/>');
              for (let i = 0 ; i < data.length ; i++) {
                  var rowHash = data[i];
                  for (var key in rowHash) {
                      if ($.inArray(key, columns) == -1){
                          columns.push(key);
                              headerTr$.append($('<th/>').html(key));
                      }
                  }
              }
              $("#excelDataTable").append(headerTr$);

              for (let i = 0 ; i < data.length ; i++) {
                  var row$ = $('<tr/>');
                  for (var colIndex = 0 ; colIndex < columns.length ; colIndex++) {
                      var cellValue = data[i][columns[colIndex]];

                      if (cellValue == null) { cellValue = ""; }

                      if (colIndex == 2){
                          row$.append(`<td><button>Return</button></td>`).click( function(){
                            axios.get(`http://localhost:3943/bookReturn/${data[i][columns[colIndex-6]]}`).then(
                              function(){
                                window.location.reload();
                              })
                          });
                      } else
                          row$.append($('<td/>').html(cellValue));
                  }
                  $("#excelDataTable").append(row$);
              }
          })
    }

    digitalMediaTable(){
          axios.get(`http://localhost:3943/userDigitalMedia/${this.props.params.user}`).then(res => res.data).then((data) => {
              var columns = [];
              var headerTr$ = $('<tr/>');


              for (let i = 0 ; i < data.length ; i++) {
                  var rowHash = data[i];
                  for (var key in rowHash) {
                      if ($.inArray(key, columns) == -1){
                          columns.push(key);
                              headerTr$.append($('<th/>').html(key));
                      }
                  }
              }
              $("#excelDataDigitalTable").append(headerTr$);

              for (let i = 0 ; i < data.length ; i++) {
                  var row$ = $('<tr/>');
                  for (var colIndex = 0 ; colIndex < columns.length ; colIndex++) {
                      var cellValue = data[i][columns[colIndex]];

                      if (cellValue == null) { cellValue = ""; }

                      if (colIndex == 2){
                          row$.append(`<td><button>Return</button></td>`).click( function(){

                            axios.get(`http://localhost:3943/digitalMediaReturn/${data[i][columns[colIndex-6]]}`).then(
                              function(){
                                window.location.reload();
                              })
                          });
                      } else
                          row$.append($('<td/>').html(cellValue));
                  }
                  $("#excelDataDigitalTable").append(row$);
              }
          })
    }

  render() {
    return (

      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <div>
      <div className={styles['title']}>
      <h2 style={{textAlign: 'center'}}>
          Hello, {formatName(this.props.params.user)}!
      </h2>
        </div>
        <div className={styles['inTable']}>
      <table id="excelDataTable" className={styles['table']}>
            <thead id="head">
            </thead>
            <tbody id="body">
            </tbody>
        </table>
        <table id="excelDataDigitalTable" className={styles['table']}>
            <thead id="headDigital">
            </thead>
            <tbody id="bodyDigital">
            </tbody>
        </table>
        </div>
        </div>


      </MuiThemeProvider>




    )
  }
}

export default Home
