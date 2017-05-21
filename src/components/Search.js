import React, { Component } from 'react';
import styles from './Search.scss'
import axios from 'axios'
import $ from 'JQuery';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux'
import * as actionCreators from '../actionCreators';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';




function mapStateToProps(state) {
    return {
        filters: state.get('filters')
    };
}



export default connect(mapStateToProps)(class Search extends Component{



    createTable (){
    document.getElementById('body').innerHTML = '';
    document.getElementById('head').innerHTML = '';

    for(let i=1;i<=this.props.filters.size;i++){
        console.log(this.props.filters.get(i).get('value'))
    }

    axios.get('http://localhost:3943/app', {
        firstName: this.props.value,
        lastName: 'Flintstone'
    }).then(res => res.data).then((data) => {
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

                if (colIndex == 1){
                    const buc = cellValue;
                    const location = `/${this.props.user}/book/${data[i][columns[colIndex-1]]}`;
                    row$.append(`<td><a href=${location}>${buc}</a></td>`);
                }
                else
                    row$.append($('<td/>').html(cellValue));
            }
            $("#excelDataTable").append(row$);
        }
    })
    }
    render() {


        return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div>
        <RaisedButton
        label="SEARCH"
        fullWidth={true}
        secondary={true}
        onTouchTap={this.createTable}/>
        <table id="excelDataTable" className={styles['table']}>
            <thead id="head">
            </thead>
            <tbody id="body">
            </tbody>
        </table>


        </div>
        </MuiThemeProvider>
        )
    }
});
