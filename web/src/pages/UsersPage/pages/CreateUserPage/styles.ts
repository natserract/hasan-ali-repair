import { createStyles, makeStyles } from '@material-ui/core/styles'
import Theme from 'src/themes/default'

const styles = makeStyles((theme: typeof Theme) =>
  createStyles({
    formRoot: {
      display: 'flex',
      flexDirection: 'column',

      '& > div': {
        marginBottom: 15,
      },
    },
    formActions: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      borderTop: 'solid 1px rgba(0, 0, 0, 0.09)',
      paddingTop: 15,
      marginTop: 30,
    },
  })
)

export default styles
