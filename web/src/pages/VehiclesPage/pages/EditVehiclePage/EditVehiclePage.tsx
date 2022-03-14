import React from 'react'
import { MetaTags, useQuery } from '@redwoodjs/web'
import FormControl from '@material-ui/core/FormControl'
import { useForm } from 'react-hook-form'
import FormInput from 'src/components/form/formInput'
import Edit from 'src/components/common/edit'
import { EDITVEHICLE_SHOWVEHICLEQUERY } from './query'
import { EDITVEHICLEMUTATION } from './mutation'
import { useParams } from 'src/libs/gql-router'
import { useAuthState } from 'src/libs/auth/hooks'

const EditVehiclePage = (props) => {
  const params = useParams()
  const { currentUser } = useAuthState()

  const form = useForm()
  const {
    formState: { errors },
    control,
  } = form

  const { data: vehicleData, loading: loadingVehicleData } = useQuery(
    EDITVEHICLE_SHOWVEHICLEQUERY,
    {
      variables: {
        id: +params?.id,
      },
    }
  )
  const vehicle = vehicleData?.vehicle

  if (!vehicle) return <React.Fragment />

  return (
    <>
      <MetaTags title="Edit Vehicle" description="Edit Vehicle page" />

      <Edit
        form={form}
        editMutation={EDITVEHICLEMUTATION}
        id={+params?.id}
        input={({ year, ...data }) => ({
          ...data,
          year: +year,
          updated_by: currentUser?.id,
        })}
        resourceName={props.resourceName}
        showQuery={EDITVEHICLE_SHOWVEHICLEQUERY}
        isLoading={loadingVehicleData}
      >
        <FormControl>
          <FormInput
            control={control}
            name="name"
            label="Name"
            errorobj={errors}
            defaultValue={vehicle?.name}
            required
          />
        </FormControl>
        <FormControl>
          <FormInput
            control={control}
            name="serialNum"
            label="Serial Number"
            errorobj={errors}
            defaultValue={vehicle?.serialNum}
            required
          />
        </FormControl>
        <FormControl>
          <FormInput
            control={control}
            name="year"
            label="Year"
            errorobj={errors}
            defaultValue={vehicle?.year}
            type="number"
            required
          />
        </FormControl>
        <FormControl>
          <FormInput
            control={control}
            name="details"
            label="Details"
            defaultValue={vehicle?.details}
            errorobj={errors}
          />
        </FormControl>
      </Edit>
    </>
  )
}

export default EditVehiclePage
