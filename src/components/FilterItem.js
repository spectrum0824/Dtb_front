import React, {Component, createElement} from 'react';
import {is} from 'immutable';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

const items = [
  <MenuItem key={1} value={1} primaryText="Member" />,
  <MenuItem key={2} value={2} primaryText="Award" />,
  <MenuItem key={3} value={3} primaryText="Page Count" />,
  <MenuItem key={4} value={4} primaryText="Year" />,
  <MenuItem key={5} value={5} primaryText="Runyime" />,
  <MenuItem key={6} value={6} primaryText="DOFP" />,
  <MenuItem key={7} value={7} primaryText="Genre" />,
];

const toDo = [
  <MenuItem key={1} value={1} primaryText="Contains" />,
  <MenuItem key={2} value={2} primaryText="Is" />,

];



class FilterItem extends Component {
  shouldComponentUpdate(nextProps) {
    const {filter, availableFields} = this.props;
    return !is(nextProps.filter, filter) ||
      !is(nextProps.availableFields, availableFields);
  }
  state = {
    value1: null,
    value2: null,
  };
handleChange1 = (event, index, value1) => this.setState({value1});
handleChange2 = (event, index, value2) => this.setState({value2});

  render() {
    return (
       <Card
       style={{marginBottom: '10px',opacity: '0.95'}}>
        <CardActions>
        <SelectField
          value={this.state.value1}
          onChange={this.handleChange1}
          floatingLabelText="Kind"
        >
          {items}
        </SelectField>
        <SelectField
          style={{width: '30%'}}
          value={this.state.value2}
          onChange={this.handleChange2}
          floatingLabelText="Does"
        >
          {toDo}
        </SelectField>
        <br />
        <TextField
        fullWidth={true}
     hintText="Type Here..."
     floatingLabelText="Searching Filter"
     floatingLabelFixed={true}
   />
        <RaisedButton
        label="Remove"
        primary={true}
        fullWidth={true}
        onTouchTap={this.props.onRemoveClick}/>
        </CardActions>

       </Card>
    );
  }

  renderAvailable() {
    const {availableFields, onFieldChange, filter} = this.props;
    return (
      <select value={filter.get('field').name} onChange={(e) => onFieldChange(e.target.value)}>
        {availableFields.map(this.renderField.bind(this))}
      </select>
    );
  }

  renderField({name, displayName}) {
    return <option key={name} value={name}>{displayName}</option>;
  }

  renderWidget() {
    const {filter, onOperatorChange, onValueChange} = this.props;
    const field = filter.get('field');
    const props = Object.assign({
      operator: filter.get('operator'),
      value: filter.get('value'),
      onOperatorChange,
      onValueChange
    }, field.widgetOptions);

    return createElement(field.widget, props);
  }
}

export default FilterItem;
