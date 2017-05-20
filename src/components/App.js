import React, { Component } from 'react';
import { render } from 'react-dom'
import Autosuggest from 'react-autosuggest';
import './App.css';
import styles from './App.scss'
import Search from './Search';
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


const fruit = [
  'Apple', 'Apricot', 'Avocado',
  'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry',
  'Boysenberry', 'Blood Orange',
  'Cantaloupe', 'Currant', 'Cherry', 'Cherimoya', 'Cloudberry',
  'Coconut', 'Cranberry', 'Clementine',
  'Damson', 'Date', 'Dragonfruit', 'Durian',
  'Elderberry',
  'Feijoa', 'Fig',
  'Goji berry', 'Gooseberry', 'Grape', 'Grapefruit', 'Guava',
  'Honeydew', 'Huckleberry',
  'Jabouticaba', 'Jackfruit', 'Jambul', 'Jujube', 'Juniper berry',
  'Kiwi fruit', 'Kumquat',
  'Lemon', 'Lime', 'Loquat', 'Lychee',
  'Nectarine',
  'Mango', 'Marion berry', 'Melon', 'Miracle fruit', 'Mulberry', 'Mandarine',
  'Olive', 'Orange',
  'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Physalis', 'Plum', 'Pineapple',
  'Pumpkin', 'Pomegranate', 'Pomelo', 'Purple Mangosteen',
  'Quince',
  'Raspberry', 'Raisin', 'Rambutan', 'Redcurrant',
  'Salal berry', 'Satsuma', 'Star fruit', 'Strawberry', 'Squash', 'Salmonberry',
  'Tamarillo', 'Tamarind', 'Tomato', 'Tangerine',
  'Ugli fruit',
  'Watermelon',
];



class App extends Component {

  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: []
    };
  }
  componentWillMount(){
    this.props.actions.unselectField(fields.year);
    this.props.actions.unselectField(fields.runtime);
  }
  componentWillUnmount(){
    this.props.actions.clearFilters();
    this.props.actions.selectField(fields.year);
    this.props.actions.selectField(fields.runtime);
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };



  render() {
    const {selectedFields, availableFields, actions} = this.props;
    const { value, suggestions } = this.state;

      const AutoCompleteExampleFilters = () => (
      <div>
        <AutoComplete
          floatingLabelText="Type here"
          filter={AutoComplete.caseInsensitiveFilter}
          dataSource={fruit}
          maxSearchResults={5}
          fullWidth={true}
        />
      </div>
    );

    return (
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div className={styles['title']}>
        <h2 style={{marginBottom: '10px'}}>Search The Book Here</h2>

        <AutoCompleteExampleFilters />
          <FilterList />
          <Search user={this.props.params.user} value={this.state.value}/>

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
