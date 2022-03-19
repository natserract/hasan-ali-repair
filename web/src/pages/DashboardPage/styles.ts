import { createStyles, makeStyles } from '@material-ui/core/styles'
import Theme from 'src/themes/default'

const styles = makeStyles((theme: typeof Theme) =>
  createStyles({
    notification: {
      background: theme.palette.primary.main,
      borderRadius: 0,
      marginBottom: 25,
    },
  })
)

export default styles
