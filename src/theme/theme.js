import { deepMerge } from 'grommet/es6/utils';
import { grommet } from 'grommet/themes';


const theme = deepMerge(grommet, {
  global: {
    colors: {
      brand: '#2f4858',
      accent: '#33658a',
    },
    font: {
      family: 'Roboto',
    },
  },
});

export const Colors = theme.global.colors;

export default theme;
