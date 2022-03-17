import { createStyles, makeStyles } from '@material-ui/core/styles'

const styles = makeStyles(() =>
  createStyles({
    headerWidget: {
      '& h5': {
        paddingLeft: 20,
      },
    },
  })
)

export default styles
