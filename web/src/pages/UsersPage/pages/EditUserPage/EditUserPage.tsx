import React from 'react'
import { MetaTags, useMutation, useQuery } from '@redwoodjs/web'
import Widget from 'src/components/widget'
import FormControl from '@material-ui/core/FormControl'
import useStyles from './styles'
import Button from 'src/components/button'
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined'
import { EDITUSERPAGE_UPDATEUSERMUTATION } from './mutation'
import { useForm } from 'react-hook-form'
import FormInput from 'src/components/form/formInput'
import FormSelect from 'src/components/form/formSelect'
import MenuItem from '@material-ui/core/MenuItem'
import { toast } from '@redwoodjs/web/toast'
import { extractError } from 'src/utils/errors'
import { useNavigate, useParams } from 'src/libs/gql-router'
import { useState } from 'react'
import { EDITUSERPAGE_USERQUERY } from './query'
import { CurrentUser } from 'src/types/share'
import { toastPromise } from 'src/utils/info'
import { useAuthState } from 'src/libs/auth/hooks'
import { useAuth } from '@redwoodjs/auth'

interface EditUserInput {
  name: string
  email: string
  password: string
  user_type: string
  phone_number?: string
  address?: string
}

const EditUserPage = (_props) => {
  const classes = useStyles()
  const params = useParams()
  const navigate = useNavigate()

  const { logOut } = useAuth()
  const { currentUser } = useAuthState()

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<EditUserInput>({
    mode: 'onSubmit',
  })

  const [loadingEditUser, setLoadingEditUser] = useState(false)

  const { data: userDataQuery, loading: loadingUserDataQuery } = useQuery(
    EDITUSERPAGE_USERQUERY,
    {
      variables: {
        id: +params?.id,
      },
    }
  )
  const user = userDataQuery?.user as CurrentUser
  const [mutateEditUserFunc] = useMutation(EDITUSERPAGE_UPDATEUSERMUTATION, {
    refetchQueries: [EDITUSERPAGE_USERQUERY],
  })

  const isCurrentUserUpdated = () => {
    const { email } = currentUser
    return user?.email === email
  }

  const onSubmit = async (data: EditUserInput) => {
    setLoadingEditUser(true)

    try {
      await mutateEditUserFunc({
        variables: {
          id: +params?.id,
          input: {
            ...data,
          },
        },
      })

      if (!isCurrentUserUpdated()) {
        toastPromise('User succesfully Updated!', 'success').finally(() => {
          setLoadingEditUser(false)

          navigate.push('/app/users')
        })
      } else {
        // If current user has update,
        // We need to logout
        logOut()
      }
    } catch (error) {
      toast.error(extractError(error).message)
      setLoadingEditUser(false)
    }
  }

  if (!user) return <React.Fragment />

  return (
    <>
      <MetaTags title="Edit User" description="EditUser page" />

      <Widget
        isLoading={!user || loadingUserDataQuery || loadingEditUser}
        title="Edit User"
      >
        <form onSubmit={handleSubmit(onSubmit)} className={classes.formRoot}>
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

export default EditUserPage
