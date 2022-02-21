import { createStyles, makeStyles } from '@material-ui/core/styles'
import Theme from 'src/themes/default'

const styles = makeStyles(
  (theme: typeof Theme) => createStyles({
    avatar: {
      width: 30,
      height: 30,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
    },
    text: {
      color: "white",
    },
  })
);

export default styles
