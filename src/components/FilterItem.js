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

class FilterItem extends Component {
  shouldComponentUpdate(nextProps) {
    const {filter, availableFields} = this.props;
    return !is(nextProps.filter, filter) ||
      !is(nextProps.availableFields, availableFields);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <Card
      style={{marginBottom: '5px',opacity: '0.95'}}>
       <CardActions>
      <div>
        {this.renderAvailable()}
        {this.renderWidget()}
        <RaisedButton
        label="Remove"
        primary={true}
        style={{marginTop: '10px'}}
        fullWidth={true}
        onTouchTap={this.props.onRemoveClick}/>
        </div>
        </CardActions>

       </Card>
        </MuiThemeProvider>

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
