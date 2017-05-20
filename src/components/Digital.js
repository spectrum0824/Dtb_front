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




// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
const escapeRegexCharacters = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const getSuggestions = value => {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return languages.filter(language => regex.test(language.name));
}

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => suggestion.name;

const renderSuggestionsContainer = ({ containerProps, children, query }) => (
  <div {...containerProps}>
    {children}
    {
      <div className="footer">
        Press Enter to search <strong>{query}</strong>
      </div>
    }
  </div>
);

class Digital extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: []
    };
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


  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const {selectedFields, availableFields, actions} = this.props;
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Fill in the blank",
      value,
      onChange: this.onChange,

    };

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
      <h2 style={{marginBottom: '10px'}}>Search Digital Media Here</h2>

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

export default connect(mapStateToProps, mapDispatchToProps)(Digital);
