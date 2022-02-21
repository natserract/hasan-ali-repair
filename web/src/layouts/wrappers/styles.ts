import { createStyles, makeStyles } from '@material-ui/core/styles'
import Theme from 'src/themes/default'

const styles = makeStyles(
  (theme: typeof Theme) => createStyles({
    badge: {
      fontWeight: 600,
      height: 16,
      minWidth: 16,
    },
  })
);

export default styles
