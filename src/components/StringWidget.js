import DefaultWidget from './DefaultWidget';
import * as operators from '../operators';

class StringWidget extends DefaultWidget {
  getOperators() {
    return {
      [operators.CONTAINS]: 'contains'
    };
  }
}

StringWidget.defaultOperator = operators.CONTAINS;
StringWidget.defaultValue = '';

export default StringWidget;
