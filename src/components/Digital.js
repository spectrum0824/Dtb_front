import React, { Component } from 'react';
import { render } from 'react-dom'
import Autosuggest from 'react-autosuggest';
import './App.css';
import styles from './App.scss'
import DigitalSearch from './DigitalSearch';
import { Link } from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import FilterList from './FilterList';
import * as actionCreators from '../actionCreators';
import * as fields from '../fields';
import RaisedButton from 'material-ui/RaisedButton';
import { deepOrange800 } from 'material-ui/styles/colors';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AutoComplete from 'material-ui/AutoComplete';


function formatName(value) {
  return value;
}



const books = [

'A Class Divided',
'ABC Africa',
'Ape to Man',
'Black Lives Matter',
'Breaking The Silence: Truth and Lies in the War On Terror',
'Earthlings',
'Food, Inc.',
'Four Horsemen',
'Space Station Tour',
'Tashi and the Monk',
'The Great Culling: Our Water',
'The Light Bulb Conspiracy',
'The Magical Forest',
'The Power Principle',
'The Wall Street Code',
'The World According to Monsanto',
'Thorium: The NASA Story',
'Waking Life',
'War By Other Means',


];



class App extends Component {

  constructor() {
    super();

    this.state = {
      value: "",
      suggestions: [],

    };
    this.onChange = this.onChange.bind(this);
  }




  componentWillMount() {
    this.props.actions.unselectField(fields.award);
    this.props.actions.unselectField(fields.pagecount);
    this.props.actions.unselectField(fields.dofp);
    this.props.actions.unselectField(fields.genres);
  }
  componentWillUnmount(){
    this.props.actions.clearFilters();
    this.props.actions.selectField(fields.award);
    this.props.actions.selectField(fields.pagecount);
    this.props.actions.selectField(fields.dofp);
    this.props.actions.selectField(fields.genres);
  }


  onChange = (chosenRequest: string) => {
    this.setState({ value: chosenRequest});
  };



  render() {
    const {selectedFields, availableFields} = this.props;
    const { value, suggestions } = this.state;


      const AutoCompleteExampleFilters = () => (
      <div>
        <AutoComplete
          floatingLabelText="Type Your Book Here"
          filter={AutoComplete.caseInsensitiveFilter}
          dataSource={books}
          maxSearchResults={5}
          fullWidth={true}
          onNewRequest={this.onChange}
          searchText={this.state.value}
        />
      </div>
    );



    return (
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div className={styles['title']}>
        <h2 style={{marginBottom: '0px',textAlign: 'center'}}>Search Digital Media Here</h2>

        <AutoCompleteExampleFilters />
          <FilterList />
          <DigitalSearch user={this.props.params.user} value={this.state.value}/>



        </div>
        </MuiThemeProvider>
    );


  }
}

function mapStateToProps(state) {
  return {
    filters: state.get('filters'),
    availableFields: state.get('availableFields')
  };
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actionCreators, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
