import { createStyles, makeStyles } from '@material-ui/core/styles'

const styles = makeStyles(() =>
  createStyles({
    actionButtonContainer: {
      '& > button': {
        '&:not(:last-child)': {
          marginRight: 10,
        },
      },
    },
    menuItemRoot: {
      '&:hover, &:focus': {
        backgroundColor: 'transparent',
      },
    },
  })
)

export default styles
