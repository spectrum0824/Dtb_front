import React, { Component } from 'react';
import styles from './DigitalSearch.scss'
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

export default connect(mapStateToProps)(class DigitalSearch extends Component{
    createTable (){
    document.getElementById('body').innerHTML = '';
    document.getElementById('head').innerHTML = '';
    let runtime = '';
    let year = '';
    let runtimeState = '';
    let yearState = '';

    for(let i=1;i<=this.props.filters.size;i++){
        if(this.props.filters.get(i).get('field').name == "runtime"){
            runtime = this.props.filters.get(i).get('value')
            if(this.props.filters.get(i).get('operator') == "GREATER_THAN_EQUALS"){
                runtimeState = ">=";
            }
            else if(this.props.filters.get(i).get('operator') == "LESS_THAN_EQUALS"){
                runtimeState = "<=";
            }
        }
        if(this.props.filters.get(i).get('field').name == 'year'){
            year = this.props.filters.get(i).get('value');
            if(this.props.filters.get(i).get('operator') == "GREATER_THAN_EQUALS"){
                yearState = ">=";
            }
            else if(this.props.filters.get(i).get('operator') == "LESS_THAN_EQUALS"){
                yearState = "<=";
            }
        }
    }

    axios.post('http://localhost:3943/digital', {
        text: this.props.value,
        runtime: runtime,
        year: year,
        runtimeState: runtimeState,
        yearState:  yearState
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
                    const location = `/${this.props.user}/digitalMedia/${data[i][columns[colIndex-1]]}`;
                    row$.append(`<td><a href=${location} style="color: white">${buc}</a></td>`);
                }
                else
                    row$.append($('<td/>').html(cellValue));
            }
            $("#excelDataTable").append(row$);
        }
    })
    }    render() {
        return (
        <div>
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
          <div className={styles['inTable']}>
          <RaisedButton
          label="SEARCH"
          fullWidth={true}
          secondary={true}
          onTouchTap={(e) => this.createTable(e)} />
        <table id="excelDataTable" className={styles['table']}>
            <thead id="head">
            </thead>
            <tbody id="body">
            </tbody>
        </table>
        </div>
        </MuiThemeProvider>
        </div>

        )
    }
});
