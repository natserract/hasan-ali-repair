import { MetaTags, useQuery } from '@redwoodjs/web'
import { CREATEVEHICLE_CUSTOMERSQUERY } from './query'
import { CREATEVEHICLE_MUTATION } from './mutation'
import Create from 'src/components/common/create'
import FormControl from '@material-ui/core/FormControl'
import { useForm } from 'react-hook-form'
import FormInput from 'src/components/form/formInput'
import FormAutoComplete from 'src/components/form/formAutoComplete'
import { useAuthState } from 'src/libs/auth/hooks'
import { useAccess } from 'src/libs/gql-router'
import { useState } from 'react'

const CreateVehiclePage = (props) => {
  const form = useForm()
  const {
    formState: { errors },
    control,
  } = form

  const { currentUser } = useAuthState()
  const { currentRole } = useAccess()
  const isAdmin = currentRole === 'admin'

  const { data: customersData, loading: loadingCustomersData } = useQuery(
    CREATEVEHICLE_CUSTOMERSQUERY
  )
  const [userId, setUserId] = useState(NaN)

  return (
    <>
      <MetaTags title="Create Vehicle" description="Create Vehicle page" />

      <Create
        form={form}
        createMutation={CREATEVEHICLE_MUTATION}
        resourceName={props.resourceName}
        input={({ year, ...data }) => ({
          ...data,
          year: +year,
          user_id: isAdmin ? userId : currentUser?.id,
          created_by: currentUser?.id,
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
            name="serialNum"
            label="Serial Number"
            errorobj={errors}
            required
          />
        </FormControl>
        <FormControl>
          <FormInput
            control={control}
            name="year"
            label="Year"
            errorobj={errors}
            type="number"
            required
          />
        </FormControl>
        <FormControl>
          <FormInput
            control={control}
            name="details"
            label="Details"
            errorobj={errors}
          />
        </FormControl>

        {isAdmin && (
          <FormControl>
            <FormAutoComplete
              label="Select Customer"
              name="user_id"
              control={control}
              errorobj={errors}
              isReady={!loadingCustomersData}
              options={customersData?.customers}
              onChange={(_event, value) => {
                if (value) {
                  setUserId(value.user.id)
                }
              }}
              getOptionLabel={(option: any) => {
                return `${option.user.name} - ${option.user.email}`
              }}
            />
          </FormControl>
        )}
      </Create>
    </>
  )
}

export default CreateVehiclePage
