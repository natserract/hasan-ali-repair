import { MetaTags } from '@redwoodjs/web'
import Widget from 'src/components/widget'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import useStyles from './styles'
import Button from 'src/components/button'
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined'
import { Form } from '@redwoodjs/forms'

const CreateUserPage = () => {
  const classes = useStyles()

  const onSubmit = async (event) => {
    event.preventDefault()
    console.log('submitted', event)
  }

  return (
    <>
      <MetaTags title="Create User" description="CreateUser page" />

      <Widget title="Create User">
        <form onSubmit={onSubmit} className={classes.formRoot}>
          <FormControl>
            <TextField name="name" label="Name" required variant="outlined" />
          </FormControl>
          <FormControl>
            <TextField
              name="email"
              type="email"
              label="Email"
              required
              variant="outlined"
            />
          </FormControl>
          <FormControl>
            <TextField name="address" label="Address" variant="outlined" />
          </FormControl>
          <FormControl>
            <TextField
              name="phone_number"
              type="number"
              label="Phone Number"
              variant="outlined"
            />
          </FormControl>
          <FormControl>
            <TextField
              name="password"
              type="password"
              label="Password"
              required
              variant="outlined"
            />
          </FormControl>

          <div className={classes.formActions}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveOutlinedIcon />}
              type="submit"
            >
              Save
            </Button>
          </div>
        </form>
      </Widget>
    </>
  )
}

export default CreateUserPage
