import { createStyles, makeStyles } from '@material-ui/core/styles'
import Theme from 'src/themes/default'

const styles = makeStyles((theme: typeof Theme) =>
  createStyles({
    labelGroup: {
      '&:not(:last-child)': {
        marginBottom: 25,
      },
      '& h4': {
        paddingBottom: theme.spacing(2),
      },
    },
  })
)

export default styles
