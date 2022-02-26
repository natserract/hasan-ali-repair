import { useTheme } from '@material-ui/styles'
import TypeTheme from 'src/themes/default'
import { Button as ButtonBase } from '@material-ui/core'
import { createStyled, getColor } from 'src/utils/styled'
import classnames from 'classnames'

type ButtonProps = {
  color: string
  className: string
  select: boolean
  variant: string
  [k: string]: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} & React.HTMLAttributes<any>

const Button: React.FC<Partial<ButtonProps>> = ({
  children,
  color,
  className,
  ...props
}) => {
  const theme = useTheme() as typeof TypeTheme

  const Styled = createStyled({
    root: {
      color: getColor(color, theme),
    },
    contained: {
      backgroundColor: getColor(color, theme),
      boxShadow: theme.customShadows.widget,
      color: `${color ? 'white' : theme.palette.text.primary} !important`,
      '&:hover': {
        backgroundColor: getColor(color, theme, 'light'),
        boxShadow: theme.customShadows.widgetWide,
      },
      '&:active': {
        boxShadow: theme.customShadows.widgetWide,
      },
    },
    outlined: {
      color: getColor(color, theme),
      borderColor: getColor(color, theme),
    },
    select: {
      backgroundColor: theme.palette.primary.main,
      color: '#fff',
    },
  })

  return (
    <Styled>
      {({ classes }) => (
        <ButtonBase
          classes={{
            contained: classes.contained,
            root: classes.root,
            outlined: classes.outlined,
          }}
          {...props}
          className={classnames(
            {
              [classes.select]: props.select,
            },
            className
          )}
        >
          {children}
        </ButtonBase>
      )}
    </Styled>
  )
}

export default Button
