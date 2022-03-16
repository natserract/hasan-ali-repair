import { createStyles, makeStyles } from '@material-ui/core/styles'

const styles = makeStyles(() =>
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
    headerWidget: {
      '& h5': {
        paddingLeft: 20,
      },
    },
  })
)

export default styles
