import { createStyles, makeStyles } from '@material-ui/core/styles'
import Theme from 'src/themes/default'

const styles = makeStyles((theme: typeof Theme) =>
  createStyles({
    widgetWrapper: {
      display: 'flex',
      minHeight: 'auto',
      position: 'relative',
    },
    widgetWrapperLoading: {
      '&:after': {
        cursor: 'not-allowed',
        content: `''`,
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(255, 255, 255, 0.40)',
        fontSize: 30,
        zIndex: 10,
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
    },
    widgetHeader: {
      padding: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerTitle: {
      display: 'flex',
      alignItems: 'center',

      '& button': {
        color: '#4A4A4A',
        marginTop: '-1px',
        marginRight: 5,
      },
    },
    widgetRoot: {
      boxShadow: theme.customShadows.widget,
    },
    widgetBody: {
      paddingBottom: theme.spacing(5),
      paddingRight: theme.spacing(7),
      paddingLeft: theme.spacing(9),
    },
    noPadding: {
      padding: 0,
    },
    paper: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      overflow: 'auto',
    },
    moreButton: {
      margin: -theme.spacing(1),
      padding: 0,
      width: 40,
      height: 40,
      color: theme.palette.text.hint,
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: 'rgba(255, 255, 255, 0.35)',
      },
    },
    printButton: {
      marginRight: theme.spacing(1),
      padding: 0,
      width: 40,
      height: 40,
      color: theme.palette.text.primary,
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: 'rgba(255, 255, 255, 1)',
      },
    },
    noWidgetShadow: {
      boxShadow: 'none',
    },
  })
)

export default styles
