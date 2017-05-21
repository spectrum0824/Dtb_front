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
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';


function formatName(value) {
  return value;
}

const customDialog = {

  maxWidth: 'none',
};



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
      value: "",
      suggestions: [],
      open: false,
    };
    this.onChange = this.onChange.bind(this);
  }

    handleClose = () => {
      this.setState({ open: false });


    };


  componentWillMount(){
    this.props.actions.unselectField(fields.year);
    this.props.actions.unselectField(fields.runtime);
  }
  componentWillUnmount(){
    this.props.actions.clearFilters();
    this.props.actions.selectField(fields.year);
    this.props.actions.selectField(fields.runtime);
  }



  onChange = (chosenRequest: string) => {
    this.setState({ value: chosenRequest});
    this.setState({ open: true });
  };



  render() {
    const {selectedFields, availableFields} = this.props;
    const { value, suggestions } = this.state;

    const actions = [
      <FlatButton
      label="Okay"
      primary={true}
      keyboardFocused={true}
      onTouchTap={this.handleClose}
      />,
    ];


      const AutoCompleteExampleFilters = () => (
      <div>
        <AutoComplete
          floatingLabelText="Type here"
          filter={AutoComplete.caseInsensitiveFilter}
          dataSource={fruit}
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
        <h2 style={{marginBottom: '10px'}}>Search Digital Media Here</h2>

        <AutoCompleteExampleFilters />
          <FilterList />
          <Search user={this.props.params.user} value={this.state.value}/>


          <Dialog
          title="Tester"
          actions={actions}
          modal={false}
          contentStyle={customDialog}
          open={this.state.open}
          onRequestClose={this.handleClose}
          >
          <h1>
           Search for '{formatName(this.state.value)}'!
          </h1>
          </Dialog>

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
