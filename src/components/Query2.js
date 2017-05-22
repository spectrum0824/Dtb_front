import React, { Component } from 'react'
import Dropdown from 'react-dropdown'
import styles from './Query.scss'
import axios from 'axios'
import $ from 'JQuery'

class Query extends Component {
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
        const options = [
            { value: '1', label: 'Number of genres on each book' },
            { value: '2', label: 'Authors that born on the same date' },
            { value: '3', label: 'Total page count of Harry Potter series' },
            { value: '4', label: 'A member that has both book borrowing bill and digital media borrowing bill' },
            { value: '5', label: 'The book that has been borrowed the most' },
            { value: '6', label: 'Digital media that aired between 2000 - 2010' },
        ]
        const defaultOption = {value: '0', label: 'Most Frequence Search'}
        return (
        <div>
            <div><Dropdown options={options} onChange={this.handleChange} value={defaultOption} placeholder="Select an option" /></div>
            <table id="excelDataTable" className={styles['table']}>
                <thead id="head">
                </thead>
                <tbody id="body">
                </tbody>
            </table>
        </div>
        )
    }
}

export default Query
