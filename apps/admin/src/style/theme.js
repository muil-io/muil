const colors = {
  primary: '#6735E0',
  primaryDark: '#6033cc',
  white: '#ffffff',
  dark: '#424242',
  gray1: '#adadad',
  gray2: '#d6d6d6',
  gray3: '#f1f1f1',
  gray4: '#f8f8f8',
  category1: '#5783FC',
  category2: '#ffa600',
  category3: '#46D39A',
  category4: '#d86adf',
  category5: '#EB4559',
  transparent: 'transparent',
  error: '#fa4251',
  success: '#46D39A',
};

const theme = {
  colors,
  button: {
    primary: {
      normal: { background: colors.primary, color: colors.white, border: colors.transparent },
      disabled: { background: colors.gray4, color: colors.dark, border: colors.gray2 },
      hover: { background: colors.primaryDark, color: colors.white, border: colors.transparent },
    },
    secondary: {
      normal: { background: colors.white, color: colors.primary, border: colors.primary },
      disabled: { background: colors.gray3, color: colors.dark, border: colors.gray2 },
      hover: { background: colors.gray4, color: colors.primaryDark, border: colors.primaryDark },
    },
    tertiary: {
      normal: { background: colors.transparent, color: colors.primary, border: colors.transparent },
      disabled: { background: colors.transparent, color: colors.gray1, border: colors.transparent },
      hover: {
        background: `${colors.primary}11`,
        color: colors.primary,
        border: colors.transparent,
      },
    },
  },
  input: {
    placeholder: colors.gray1,
    color: colors.dark,
    normal: {
      background: colors.white,
      border: colors.gray2,
    },
    disabled: {
      background: colors.gray4,
      border: colors.gray2,
    },
    focus: {
      background: colors.white,
      border: colors.primary,
    },
    error: {
      background: colors.white,
      border: colors.error,
    },
  },
};

export default theme;
