import React from 'react'
import {
  Badge as BadgeBase,
  Typography as TypographyBase,
  Button,
} from '@material-ui/core'
import { useTheme } from '@material-ui/styles'
import classnames from 'classnames'
import useStyles from './styles'
import {
  createStyled,
  getColor,
  getFontWeight,
  getFontSize,
} from 'src/utils/styled'

type BadgeProps = {
  [k: string]: any
}

const Badge: React.FC<BadgeProps> = ({
  children,
  colorBrightness,
  color,
  ...props
}) => {
  const classes = useStyles()
  const theme = useTheme()
  const Styled = createStyled({
    badge: {
      backgroundColor: getColor(color, theme, colorBrightness),
    },
  })

  return (
    <Styled>
      {(styledProps) => (
        <BadgeBase
          classes={{
            badge: classnames(classes.badge, styledProps.classes.badge),
          }}
          {...props}
        >
          {children}
        </BadgeBase>
      )}
    </Styled>
  )
}

type TypographyProps = {
  weight?: string
  variant?: any
  size?: string
  colorBrightness?: string
  color?: string
  [k: string]: any
}

const Typography: React.FC<TypographyProps> = ({
  children,
  weight,
  size,
  colorBrightness,
  color,
  ...props
}) => {
  const theme = useTheme()

  return (
    <TypographyBase
      style={{
        color: getColor(color, theme, colorBrightness),
        fontWeight: getFontWeight(weight),
        fontSize: getFontSize(size, props.variant, theme),
      }}
      {...props}
    >
      {children}
    </TypographyBase>
  )
}

export { Badge, Typography, Button }
