import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../actionCreators';
import FilterItem from './FilterItem';
import { deepOrange800 } from 'material-ui/styles/colors';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';

class FilterList extends Component {
  render() {
    const {actions, filters} = this.props;
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <div style={{marginBottom: '10px'}}>
        {this.renderList()}
         <FlatButton
         label="Add Filter"
         primary={true}
         onTouchTap={actions.addFilter}
         style={{width: '50%'}}
         />
         <FlatButton
         label="Clear All"
         disabled={filters.isEmpty()}
         onTouchTap={actions.clearFilters}
         style={{width: '50%'}}
         />
      </div>
      </MuiThemeProvider>
    );
  }

  renderList() {
    const {filters} = this.props;

    if (filters.isEmpty()) {
      return null;
    }

    return (
      <ul className="filter-list">
        {filters.entrySeq().map(this.renderItem.bind(this))}
      </ul>
    );
  }

  renderItem([filterId, filter]) {
    const {actions, availableFields} = this.props;
    return <FilterItem
      key={filterId}
      availableFields={availableFields}
      onFieldChange={(fieldName) => actions.changeFilterField(filterId, fieldName)}
      onOperatorChange={(operator) => actions.changeFilterOperator(filterId, operator)}
      onValueChange={(value) => actions.changeFilterValue(filterId, value)}
      onRemoveClick={() => actions.removeFilter(filterId)}
      filter={filter} />;
  }
}

function mapStateToProps(state) {
  return {
    filters: state.get('filters'),
    availableFields: state.get('selectedFields')
  };
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actionCreators, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterList);
