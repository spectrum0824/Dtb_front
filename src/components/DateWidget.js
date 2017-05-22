import React from 'react';
import DefaultWidget from './DefaultWidget';
import * as operators from '../operators';

class DateWidget extends DefaultWidget {
  getOperators() {
    return {
      [operators.EQUALS]: 'on',
      [operators.GREATER_THAN]: 'after',
      [operators.LESS_THAN]: 'before',
      [operators.BETWEEN]: 'between'
    };
  }

  renderInputElement(value, onChange) {
    const onChangeDate = (e) => {
      const value = e.target.value;
      onChange((value==null) ? DateWidget.defaultValue : value);
    };

    return <input type="string" value={value} onChange={onChangeDate} />;
  }
}

DateWidget.defaultOperator = operators.EQUALS;
DateWidget.defaultValue = 'DD/MM/YYYY';

export default DateWidget;
