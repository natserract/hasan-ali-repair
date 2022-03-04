import { MetaTags, useMutation } from '@redwoodjs/web'
import Widget from 'src/components/widget'
import FormControl from '@material-ui/core/FormControl'
import useStyles from './styles'
import Button from 'src/components/button'
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined'
import { useForm } from 'react-hook-form'
import FormInput from 'src/components/form/formInput'
import FormSelect from 'src/components/form/formSelect'
import { CREATEUSERPAGE_CREATEUSERMUTATION } from './mutation'
import MenuItem from '@material-ui/core/MenuItem'
import { toast } from '@redwoodjs/web/toast'
import { extractError } from 'src/utils/errors'
import { useNavigate } from 'src/libs/gql-router'
import { useState } from 'react'
import { toastPromise } from 'src/utils/info'

interface CreateUserInput {
  name: string
  email: string
  password: string
  user_type: string
  phone_number?: string
  address?: string
}

const CreateUserPage = () => {
  const classes = useStyles()
  const navigate = useNavigate()

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreateUserInput>({
    mode: 'onSubmit',
  })

  const [loadingCreateUser, setLoadingCreateUser] = useState(false)
  const [mutateCreateUserFunc] = useMutation(CREATEUSERPAGE_CREATEUSERMUTATION)

  const onSubmit = async (data: CreateUserInput) => {
    setLoadingCreateUser(true)

    try {
      await mutateCreateUserFunc({
        variables: {
          input: {
            ...data,
            hashedPassword: data.password,
          },
        },
      })

      toastPromise('User succesfully Added!', 'success').finally(() => {
        setLoadingCreateUser(false)
        navigate.push('/app/users')
      })
    } catch (error) {
      toast.error(extractError(error).message)
      setLoadingCreateUser(false)
    }
  }

  return (
    <>
      <MetaTags title="Create User" description="CreateUser page" />

      <Widget isLoading={loadingCreateUser} title="Create User">
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
          <FormSelect
            label="User Role"
            name="user_type"
            control={control}
            errorobj={errors}
            defaultValue=""
            required
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="customer">Customer</MenuItem>
          </FormSelect>

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
