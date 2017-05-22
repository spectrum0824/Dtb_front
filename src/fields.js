import StringWidget from './components/StringWidget';
import NumberWidget from './components/NumberWidget';
import DateWidget from './components/DateWidget';
import BooleanWidget from './components/BooleanWidget';
import SelectWidget from './components/SelectWidget';
import genre from './Genre';

export const award = {name: 'award', displayName: 'Award', widget: StringWidget};
export const pagecount = {name: 'pagecount', displayName: 'Pagecount', widget: NumberWidget};
export const year = {name: 'year', displayName: 'Year', widget: NumberWidget};
export const runtime = {name: 'runtime', displayName: 'Runtime', widget: NumberWidget};
export const dofp = {name: 'dofp', displayName: 'FirstPublished', widget: DateWidget};
// export const married = {name: 'married', displayName: 'Married', widget: BooleanWidget};
export const genres = {name: 'genres', displayName: 'Genre', widget: SelectWidget, widgetOptions: {options: genre}};
