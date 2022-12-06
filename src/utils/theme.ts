// eslint-disable-next-line import/no-extraneous-dependencies
import colors from 'tailwindcss/colors';

export type ColorShade =
  | '50'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';
type DefaultColors = Omit<
  typeof colors,
  'lightBlue' | 'warmGray' | 'trueGray' | 'coolGray' | 'blueGray'
> & { [name: string]: string | { [Shade in ColorShade]: string } };

export type ThemeColors = DefaultColors & {
  [name: string]: { [Shade in ColorShade]: string } | string;
  accent: DefaultColors['sky'];
  info: DefaultColors['sky'];
  danger: DefaultColors['red'];
  success: DefaultColors['green'];
  main: DefaultColors['zinc'];
  border: DefaultColors['gray'];
};

const deprecatedColors = ['lightBlue', 'warmGray', 'trueGray', 'coolGray', 'blueGray'];

// Filter out deprecated colors to prevent console.log messages
const validColors: DefaultColors = Object.keys(colors)
  .filter((k) => !deprecatedColors.includes(k))
  .reduce((acc, k) => {
    const c = colors[k];
    return { ...acc, [k]: c };
  }, {} as DefaultColors);

export const themeColors: ThemeColors = {
  ...validColors,
  accent: validColors.sky,
  info: validColors.sky,
  danger: validColors.red,
  success: validColors.green,
  main: validColors.zinc,
  border: validColors.gray,
};
