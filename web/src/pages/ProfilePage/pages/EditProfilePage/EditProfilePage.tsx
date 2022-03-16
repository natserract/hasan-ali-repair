import React from 'react'
import { MetaTags, useQuery } from '@redwoodjs/web'
import { useForm } from 'react-hook-form'
import { EDITPROFILE_CURRENTUSER_QUERY } from './query'
import Edit from 'src/components/common/edit'
import { EDITPROFILE_UPDATEUSERMUTATION } from './mutation'
import FormControl from '@material-ui/core/FormControl'
import FormInput from 'src/components/form/formInput'
import { useAuthState } from 'src/libs/auth/hooks'

const EditProfilePage = (props) => {
  const { currentUser } = useAuthState()

  const form = useForm()
  const {
    formState: { errors },
    control,
  } = form

  const { data: currentUserData, loading: loadingCurrentUser } = useQuery(
    EDITPROFILE_CURRENTUSER_QUERY,
    {
      variables: {
        email: currentUser?.email,
      },
    }
  )
  const user = currentUserData?.currentUser
  if (!user) return <React.Fragment />

  return (
    <>
      <MetaTags title="Edit Profile" description="Edit Profile page" />

      <Edit
        form={form}
        editMutation={EDITPROFILE_UPDATEUSERMUTATION}
        id={+currentUser?.id}
        input={({ ...data }) => ({
          ...data,
        })}
        resourceName={props.resourceName}
        showQuery={EDITPROFILE_CURRENTUSER_QUERY}
        isLoading={loadingCurrentUser}
        redirectTo="/app/profile"
      >
        <FormControl variant="outlined">
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
      </Edit>
    </>
  )
}

export default EditProfilePage
