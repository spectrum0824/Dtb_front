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


function formatName(value) {
  return value;
}



const books = [

  'A Gathering of Shadows',
'A Great Reckoning',
'A Rogue by Any Other Name',
'After I\'m Gone',
'Algorithm Design',
'End of Watch',
'Feverborn',
'Halfway to the Grave',
'Harry Potter and the Chamber of Secrets(Harry Potter #2)',
'Harry Potter and the Cursed Child - Parts One and Two (Harry Potter, #8)',
'Harry Potter and the Deathly Hallows (Harry Potter #7)',
'Harry Potter and the Goblet of Fire (Harry Potter #4)',
'Harry Potter and the Half-Blood Prince(Harry Potter #6)',
'Harry Potter and the Order of the Phoenix(Harry Potter #5)',
'Harry Potter and the Prisoner of Azkaban(Harry Potter #3)',
'Harry Potter and the Sorcerer\'s Stone (Harry Potter #1)',
'His at Night',
'It Ends with Us',
'Kill me once',
'Middlemarch',
'Moby-Dick',
'Mr. Mercedes',
'Need',
'No Good Duke Goes Unpunished',
'Ordinary Grace',
'Peril at End House',
'The Bands of Mourning',
'The Beast',
'The Beautiful Mystery',
'The Castle Cross the Magnet Carter',
'The Fireman',
'The Little Men',
'The Murder Of Roger Ackroyd',
'The Obsession',
'The Underground Railroad',
'Truly Madly Guilty','How to lose weight in a week',


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
        <h2 style={{marginBottom: '0px',textAlign: 'center'}}>Search The Book Here</h2>

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
