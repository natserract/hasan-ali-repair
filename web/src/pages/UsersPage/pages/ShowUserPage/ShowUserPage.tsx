import { MetaTags } from '@redwoodjs/web'
import Widget from 'src/components/widget'
import Typography from '@material-ui/core/Typography'
import InputLabel from '@material-ui/core/InputLabel'
import useStyles from './styles'

const ShowUserPage = () => {
  const classes = useStyles()

  return (
    <>
      <MetaTags title="ShowUser" description="ShowUser page" />

      <Widget title="View User">
        <div className={classes.labelGroup}>
          <Typography variant="h6" component="h4">
            Name
          </Typography>
          <InputLabel color="secondary">Joe James</InputLabel>
        </div>

        <div className={classes.labelGroup}>
          <Typography variant="h6" component="h4">
            Company
          </Typography>
          <InputLabel color="secondary">Example Inc.</InputLabel>
        </div>

        <div className={classes.labelGroup}>
          <Typography variant="h6" component="h4">
            City
          </Typography>
          <InputLabel color="secondary">Yonkers</InputLabel>
        </div>

        <div className={classes.labelGroup}>
          <Typography variant="h6" component="h4">
            State
          </Typography>
          <InputLabel color="secondary">NY</InputLabel>
        </div>
      </Widget>
    </>
  )
}

export default ShowUserPage
