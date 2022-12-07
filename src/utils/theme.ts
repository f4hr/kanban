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
const getValidColors = (allColors: DefaultColors) =>
  Object.keys(allColors)
    .filter((k) => !deprecatedColors.includes(k))
    .reduce((acc, k) => ({ ...acc, [k]: allColors[k] }), {} as DefaultColors);

// Disable lint because tailwind's DefaultColors type doesn't have index signature
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
const validColors = getValidColors(colors as any);

export const themeColors: ThemeColors = {
  ...validColors,
  accent: validColors.sky,
  info: validColors.sky,
  danger: validColors.red,
  success: validColors.green,
  main: validColors.zinc,
  border: validColors.gray,
};
