import { createStyles, makeStyles } from '@material-ui/core/styles'
import Theme from 'src/themes/default'

const styles = makeStyles((theme: typeof Theme) =>
  createStyles({
    actionButtonContainer: {
      '& > button': {
        '&:not(:last-child)': {
          marginRight: 10,
        },
      },
    },
    menuItemRoot: {
      '&:hover, &:focus': {
        backgroundColor: 'transparent',
      },
    },
  })
)

export default styles
