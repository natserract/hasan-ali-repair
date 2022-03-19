import { createStyles, makeStyles } from '@material-ui/core/styles'
import Theme from 'src/themes/default'

const styles = makeStyles((theme: typeof Theme) =>
  createStyles({
    notificationContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    notificationContained: {
      borderRadius: 0,
      minHeight: 45,
      boxShadow: theme.customShadows.widgetDark,
      padding: '15px 20px',
    },
    notificationContainedShadowless: {
      boxShadow: 'none',
    },
    notificationIconContainer: {
      minWidth: 25,
      height: 25,
      borderRadius: 25,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 14,
    },
    notificationIconContainerContained: {
      fontSize: 18,
      color: '#FFFFFF80',
    },
    notificationIconContainerRounded: {
      marginRight: theme.spacing(2),
    },
    containedTypography: {
      color: 'white',
    },
    messageContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexGrow: 1,
      marginLeft: 15,
    },
    extraButton: {
      color: 'white',
      '&:hover, &:focus': {
        background: 'transparent',
      },
    },
  })
)

export default styles
