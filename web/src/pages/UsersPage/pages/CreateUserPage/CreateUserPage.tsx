import { MetaTags } from '@redwoodjs/web'
import Widget from 'src/components/widget'
import FormControl from '@material-ui/core/FormControl'
import useStyles from './styles'
import Button from 'src/components/button'
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined'
import { useForm } from 'react-hook-form'
import FormInput from 'src/components/form/formInput'

interface CreateUserInput {
  name: string
  email: string
  hashedPassword: string
  user_type: string
  phone_number?: string
  address?: string
}

const CreateUserPage = () => {
  const classes = useStyles()

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreateUserInput>({
    mode: 'onSubmit',
  })

  const onSubmit = async (data) => {
    console.log('submitted', data)
  }

  return (
    <>
      <MetaTags title="Create User" description="CreateUser page" />

      <Widget title="Create User">
        <form onSubmit={handleSubmit(onSubmit)} className={classes.formRoot}>
          <FormControl>
            <FormInput
              control={control}
              name="name"
              label="Name"
              errorobj={errors}
              required
            />
          </FormControl>
          <FormControl>
            <FormInput
              control={control}
              name="email"
              label="Email"
              type="email"
              errorobj={errors}
              required
            />
          </FormControl>
          <FormControl>
            <FormInput
              control={control}
              name="address"
              label="Address"
              errorobj={errors}
            />
          </FormControl>
          <FormControl>
            <FormInput
              control={control}
              name="phone_number"
              label="Phone Number"
              type="number"
              errorobj={errors}
            />
          </FormControl>
          <FormControl>
            <FormInput
              control={control}
              name="password"
              label="Password"
              type="password"
              errorobj={errors}
              required
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
