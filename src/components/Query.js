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
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

class Query extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }
  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  handleChange (event) {
    event._onSelect;
    document.getElementById('body').innerHTML = '';
    document.getElementById('head').innerHTML = '';

    axios.get(`http://localhost:3943/query/${event.value}`).then(res => res.data).then((data) => {
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
    // const options = [
    //     { value: '1', label: 'Number of genres on each book' },
    //     { value: '2', label: 'Authors that born on the same date' },
    //     { value: '3', label: 'Total page count of Harry Potter series' },
    //     { value: '4', label: 'A member that has both book borrowing bill and digital media borrowing bill' },
    //     { value: '5', label: 'A member that has both book borrowing bill and digital media borrowing bill(innerJoin version)' },
    //     { value: '6', label: 'The book that has been borrowed the most' },
    //     { value: '7', label: 'Join three tables' },
    //     { value: '8', label: 'Digital media that aired between 2000 - 2010' },
    // ]

    const options = [
      <MenuItem value={1} primaryText="Number of genres on each book" />,
      <MenuItem value={2} primaryText="Authors that born on the same date" />,
      <MenuItem value={3} primaryText="Total page count of Harry Potter series" />,
      <MenuItem value={4} primaryText="A member that has both book borrowing bill and digital media borrowing bill" />,
      <MenuItem value={5} primaryText="A member that has both book borrowing bill and digital media borrowing bill(innerJoin version)" />,
      <MenuItem value={6} primaryText="The book that has been borrowed the most" />,
      <MenuItem value={7} primaryText="Join three tables" />,
      <MenuItem value={8} primaryText="Digital media that aired between 2000 - 2010" />,

    ]
    const defaultOption = {value: '0', label: 'Select Ultimate Query'}
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <div className={styles['title']}>
      <h2>The Ultimate Query</h2>
      <RaisedButton
      fullWidth={true}
      secondary={true}
      onTouchTap={this.handleTouchTap}
      label="Select Ultimate Query"
      />
      <Popover
      open={this.state.open}
      anchorEl={this.state.anchorEl}
      anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
      targetOrigin={{horizontal: 'left', vertical: 'top'}}
      onRequestClose={this.handleRequestClose}
      animation={PopoverAnimationVertical}
      >
      <Menu
      onChange={this.handleChange}
      value={0}>
      {options}
      </Menu>
      </Popover>
      </div>
      {/* <div>
        <div><Dropdown options={options} onChange={this.handleChange} value={defaultOption} placeholder="Select an option" /></div>
        <table id="excelDataTable" className={styles['table']}>
        <thead id="head">
        </thead>
        <tbody id="body">
        </tbody>
        </table>
        </div> */}
        </MuiThemeProvider>
      )
    }
  }

  export default Query
