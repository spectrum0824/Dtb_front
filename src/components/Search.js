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
    swapDate (str) {
        var date = str.split("/");
        str = date[2] + '/' + date[1] + '/' + date[0];
        return str;
    }
    createTable (){
        document.getElementById('body').innerHTML = '';
        document.getElementById('head').innerHTML = '';

        let award = "";
        let pagecount = "0";
        let pagecountState = ">=";
        let genres = "";
        let dateState = "";
        let dateStr = "";
        let betweenStr = "";

        for(let i=1;i<=this.props.filters.size;i++){
            if(this.props.filters.get(i).get('field').name == "award"){
                if(this.props.filters.get(i).get('operator') == "CONTAINS")
                    award = this.props.filters.get(i).get('value')
            }
            if(this.props.filters.get(i).get('field').name == "pagecount"){
                if(this.props.filters.get(i).get('operator') == "GREATER_THAN_EQUALS") {
                    pagecount = this.props.filters.get(i).get('value')
                    pagecountState = ">="
                } else if(this.props.filters.get(i).get('operator') == "LESS_THAN_EQUALS"){
                    pagecount = this.props.filters.get(i).get('value')
                    pagecountState = "<="
                }
            }
            if(this.props.filters.get(i).get('field').name == "genres"){
                for(let j = 0;j < this.props.filters.get(i).get('value').length ; j++){
                    genres+=(this.props.filters.get(i).get('value')[j]) + ",";
                }
            }
            if(this.props.filters.get(i).get('field').name == "dofp"){
                dateState = this.props.filters.get(i).get('operator')
                if (dateState == "BETWEEN") {
                    betweenStr = this.swapDate(this.props.filters.get(i).get('value')[1])
                    dateStr = this.swapDate(this.props.filters.get(i).get('value')[0])
                }
                else
                    dateStr = this.swapDate(this.props.filters.get(i).get('value'))

            }
        }
        axios.post('http://localhost:3943/app', {
            text: this.props.value,
            award: award,
            pagecountState: pagecountState,
            pagecount: pagecount,
            genres: genres,
            dateStr: dateStr,
            dateState: dateState,
            betweenStr: betweenStr
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
                        row$.append(`<td><a href=${location} style="color: white">${buc}</a></td>`);
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
            <div className={styles['inTable']}>
            <RaisedButton
            label="SEARCH"
            fullWidth={true}
            secondary={true}
            onTouchTap={(e) => this.createTable(e)}/>

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
