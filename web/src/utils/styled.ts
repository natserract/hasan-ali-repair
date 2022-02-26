import { withStyles } from '@material-ui/core'
import { Styles } from '@material-ui/styles'
import { Theme } from '@material-ui/core/styles'

function createStyled(styles: Styles<Theme, {}, string>, options?: any) {
  const Styled = function (props) {
    const { children, ...other } = props
    return children(other)
  }

  return withStyles(styles, options)(Styled)
}

function getColor(color, theme, brigthness = 'main') {
  if (color && theme.palette[color] && theme.palette[color][brigthness]) {
    return theme.palette[color][brigthness]
  }
}

function getFontWeight(style) {
  switch (style) {
    case 'light':
      return 300
    case 'medium':
      return 500
    case 'bold':
      return 600
    default:
      return 400
  }
}

function getFontSize(size, variant = '', theme) {
  let multiplier

  switch (size) {
    case 'sm':
      multiplier = 0.8
      break
    case 'md':
      multiplier = 1.5
      break
    case 'xl':
      multiplier = 2
      break
    case 'xxl':
      multiplier = 3
      break
    default:
      multiplier = 1
      break
  }

  const defaultSize =
    variant && theme.typography[variant]
      ? theme.typography[variant].fontSize
      : theme.typography.fontSize + 'px'

  return `calc(${defaultSize} * ${multiplier})`
}

export { createStyled, getColor, getFontWeight, getFontSize }
