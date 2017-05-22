import React, { Component } from 'react'
import Dropdown from 'react-dropdown'
import styles from './Query.scss'

import axios from 'axios'
import $ from 'JQuery'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class Query extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      drop: 2
    };
  }

  handleChange = (event, index, drop) => {
      this.setState({drop});
      document.getElementById('body').innerHTML = '';
      document.getElementById('head').innerHTML = '';

      axios.get(`http://localhost:3943/query/${drop}`).then(res => res.data).then((data) => {
          var columns = [];
          var headerTr$ = $('<tr/>');

          for (var i = 0 ; i < data.length ; i++) {
              var rowHash = data[i];
              for (var key in rowHash) {
                  if ($.inArray(key, columns) == -1){
                      columns.push(key);
                      headerTr$.append($('<th/>').html(key));
                  }
              }
          }
          $("#excelDataTable").append(headerTr$);

          for (var i = 0 ; i < data.length ; i++) {
              var row$ = $('<tr/>');
              for (var colIndex = 0 ; colIndex < columns.length ; colIndex++) {
                  var cellValue = data[i][columns[colIndex]];

                  if (cellValue == null) { cellValue = ""; }

                  row$.append($('<td/>').html(cellValue));
              }
              $("#excelDataTable").append(row$);
          }
      })
  }
  render() {

    const options = [
      <MenuItem key={1} value={1} primaryText="Number of genres on each book" />,
      <MenuItem key={2} value={2} primaryText="Authors that born on the same date" />,
      <MenuItem key={3} value={3} primaryText="Total page count of Harry Potter series" />,
      <MenuItem key={4} value={4} primaryText="A member that has both book borrowing bill and digital media borrowing bill" />,
      <MenuItem key={5} value={5} primaryText="The book that has been borrowed the most" />,
      <MenuItem key={6} value={6} primaryText="Digital media that aired between 2000 - 2010" />,

    ]
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>

      <div className={styles['title']}>

      <h2>Frequent Searches</h2>
      <div className={styles['inTable']}>
      <DropDownMenu value={this.state.drop} onChange={this.handleChange} >
          {options}
        </DropDownMenu>

      <table id="excelDataTable" className={styles['table']}>
      <thead id="head">
      </thead>
      <tbody id="body">
      </tbody>
      </table>

      </div>
</div>

        </MuiThemeProvider>
      )
    }
  }

  export default Query
