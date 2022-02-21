import { createStyles, makeStyles } from '@material-ui/core/styles'
import Theme from 'src/themes/default'

const styles = makeStyles(
  (theme: typeof Theme) => createStyles({
    root: {
      display: "flex",
      maxWidth: "100vw",
      overflowX: "hidden",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      width: `calc(100vw - 240px)`,
      minHeight: "100vh",
    },
    contentShift: {
      width: `calc(100vw - ${240 + theme.spacing(6)}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    fakeToolbar: {
      ...theme.mixins.toolbar,
    },
    link: {
      '&:not(:first-child)': {
        paddingLeft: 15
      }
    }
  })
);

export default styles
