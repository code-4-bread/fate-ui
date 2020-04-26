import { deepMerge } from 'grommet/es6/utils';
import { grommet } from 'grommet/themes';

const primaryColor = '#476A6F';
const secondaryColor = '#7EB09B';

const theme = deepMerge(grommet, {
  global: {
    colors: {
      brand: primaryColor,
      accent: secondaryColor,
      focus: primaryColor,
    },
    font: {
      family: 'Roboto',
    },
  },
  tabs: {
    gap: 'xlarge',
  },
  tab: {
    active: {
      weight: 'bold',
    },
  },
});

export const Colors = theme.global.colors;

export default theme;
