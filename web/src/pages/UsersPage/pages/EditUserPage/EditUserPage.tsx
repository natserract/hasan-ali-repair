import React from 'react'
import { MetaTags, useQuery } from '@redwoodjs/web'
import FormControl from '@material-ui/core/FormControl'
import useStyles from './styles'
import { EDITUSERPAGE_UPDATEUSERMUTATION } from './mutation'
import { useForm } from 'react-hook-form'
import FormInput from 'src/components/form/formInput'
import FormSelect from 'src/components/form/formSelect'
import MenuItem from '@material-ui/core/MenuItem'
import { useParams } from 'src/libs/gql-router'
import { EDITUSERPAGE_USERQUERY } from './query'
import { CurrentUser } from 'src/types/share'
import { useAuthState } from 'src/libs/auth/hooks'
import Edit from 'src/components/common/edit'

interface EditUserInput {
  name: string
  email: string
  password: string
  user_type: string
  phone_number?: string
  address?: string
}

const EditUserPage = (props) => {
  const _classes = useStyles()
  const params = useParams()
  const { currentUser } = useAuthState()

  const form = useForm<EditUserInput>({
    mode: 'onSubmit',
  })
  const {
    formState: { errors },
    control,
  } = form

  const { data: userDataQuery, loading: loadingUserDataQuery } = useQuery(
    EDITUSERPAGE_USERQUERY,
    {
      variables: {
        id: +params?.id,
      },
    }
  )
  const user = userDataQuery?.user as CurrentUser

  const isCurrentUserUpdated = () => {
    const { email } = currentUser
    return user?.email === email
  }

  if (!user) return <React.Fragment />

  return (
    <>
      <MetaTags title="Edit User" description="Edit User" />

      <Edit
        form={form}
        editMutation={EDITUSERPAGE_UPDATEUSERMUTATION}
        id={+params?.id}
        input={(data) => ({ ...data })}
        resourceName={props.resourceName}
        showQuery={EDITUSERPAGE_USERQUERY}
        isLoading={loadingUserDataQuery}
        isCurrentUserUpdated={isCurrentUserUpdated()}
      >
        <FormControl>
          <FormInput
            control={control}
            name="name"
            label="Name"
            errorobj={errors}
            required
            defaultValue={user?.name}
          />
        </FormControl>
        <FormControl disabled>
          <FormInput
            control={control}
            name="email"
            label="Email"
            type="email"
            errorobj={errors}
            required
            disabled
            defaultValue={user?.email}
          />
        </FormControl>
        <FormControl>
          <FormInput
            control={control}
            name="address"
            label="Address"
            errorobj={errors}
            defaultValue={user?.address}
          />
        </FormControl>
        <FormControl>
          <FormInput
            control={control}
            name="phone_number"
            label="Phone Number"
            type="number"
            errorobj={errors}
            defaultValue={user?.phone_number}
          />
        </FormControl>
        <FormControl>
          <FormInput
            control={control}
            name="password"
            label="Password"
            type="password"
            errorobj={errors}
            defaultValue={user?.password}
            required
          />
        </FormControl>
        <FormSelect
          label="User Role"
          name="user_type"
          control={control}
          errorobj={errors}
          defaultValue={user?.user_type}
          required
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="customer">Customer</MenuItem>
        </FormSelect>
      </Edit>
    </>
  )
}

export default EditUserPage
