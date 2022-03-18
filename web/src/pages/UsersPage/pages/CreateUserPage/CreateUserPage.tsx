import { MetaTags } from '@redwoodjs/web'
import FormControl from '@material-ui/core/FormControl'
import useStyles from './styles'
import { useForm } from 'react-hook-form'
import FormInput from 'src/components/form/formInput'
import FormSelect from 'src/components/form/formSelect'
import { CREATEUSERPAGE_CREATEUSERMUTATION } from './mutation'
import MenuItem from '@material-ui/core/MenuItem'
import Create from 'src/components/common/create'

interface CreateUserInput {
  name: string
  email: string
  password: string
  user_type: string
  phone_number?: string
  address?: string
}

const CreateUserPage = (props) => {
  const _classes = useStyles()

  const form = useForm<CreateUserInput>({
    mode: 'onSubmit',
  })
  const {
    formState: { errors },
    control,
  } = form

  return (
    <>
      <MetaTags title="Create User" description="Create User page" />

      <Create
        form={form}
        createMutation={CREATEUSERPAGE_CREATEUSERMUTATION}
        resourceName={props.resourceName}
        input={(data: CreateUserInput) => ({
          ...data,
          hashedPassword: data.password,
        })}
      >
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
            pattern={/^[\w.+\-]+@gmail\.com$/}
            errormessage="Email must be valid! Please use gmail account."
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
      </Create>
    </>
  )
}

export default CreateUserPage
