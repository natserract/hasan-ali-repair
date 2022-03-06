import React from 'react'
import { MetaTags } from '@redwoodjs/web'
import { SERVICEQUERY, VEHICLES_QUERY, MECHANICS_QUERY } from './query'
import { EDITSERVICES_MUTATION } from './mutation'
import { useQuery } from '@redwoodjs/web'
import { useParams } from 'src/libs/gql-router'
import { useForm } from 'react-hook-form'
import FormInput from 'src/components/form/formInput'
import FormSelect from 'src/components/form/formSelect'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Edit from 'src/components/common/edit'
import TextField from '@material-ui/core/TextField'
import { useAuthState } from 'src/libs/auth/hooks'

const EditServicePage = (props) => {
  const params = useParams()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { currentUser } = useAuthState()

  const form = useForm()
  const {
    formState: { errors },
    control,
  } = form

  const { data: serviceData, loading: loadingServiceData } = useQuery(
    SERVICEQUERY,
    {
      variables: {
        id: +params?.id,
      },
    }
  )
  const service = serviceData?.service

  const { data: vehiclesData, loading: vehiclesLoading } = useQuery(
    VEHICLES_QUERY,
    {
      variables: {
        input: {
          filter: JSON.stringify({
            created_by: service?.customer?.user?.id || undefined,
          }),
        },
      },
    }
  )
  const { data: mechanicsData, loading: mechanicsLoading } =
    useQuery(MECHANICS_QUERY)

  if (!service) return <React.Fragment />

  return (
    <>
      <MetaTags title="Edit Service" description="Edit Service" />

      <Edit
        form={form}
        editMutation={EDITSERVICES_MUTATION}
        id={+params?.id}
        input={({ price, ...data }) => ({
          price: +price,
          ...data,
        })}
        resourceName={props.resourceName}
        showQuery={SERVICEQUERY}
        isLoading={loadingServiceData || vehiclesLoading || mechanicsLoading}
      >
        <FormControl>
          <TextField
            label="Name"
            fullWidth={true}
            variant="outlined"
            disabled
            required
            defaultValue={service?.customer?.user?.name}
            InputLabelProps={{
              className: 'required-label',
              required: true,
            }}
          />
        </FormControl>
        <FormControl>
          <FormSelect
            label="Select Vehicle"
            name="vehicle_id"
            control={control}
            errorobj={errors}
            defaultValue={service?.vehicle_id}
            required
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {vehiclesData?.vehicles.map((vehicle) => (
              <MenuItem key={vehicle.id} value={vehicle.id}>
                {vehicle.name} - {vehicle.serialNum}
              </MenuItem>
            ))}
          </FormSelect>
        </FormControl>
        <FormControl>
          <FormSelect
            label="Select Mechanic"
            name="mechanic_id"
            control={control}
            errorobj={errors}
            defaultValue={service?.mechanic?.id}
            required
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {mechanicsData?.mechanics.map(
              (mechanic) =>
                mechanic.is_active && (
                  <MenuItem key={mechanic.id} value={mechanic.id}>
                    {mechanic.name}
                  </MenuItem>
                )
            )}
          </FormSelect>
        </FormControl>
        <FormControl>
          <FormSelect
            label="Service Status"
            name="status"
            control={control}
            errorobj={errors}
            defaultValue={service?.status}
            required
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="complete">Complete</MenuItem>
          </FormSelect>
        </FormControl>
        <FormControl>
          <FormInput
            control={control}
            name="price"
            label="Price"
            errorobj={errors}
            defaultValue={service?.price}
            required
          />
        </FormControl>
        <FormControl>
          <FormInput
            control={control}
            name="message"
            label="Message"
            defaultValue={service?.message}
            errorobj={errors}
          />
        </FormControl>
      </Edit>
    </>
  )
}

export default EditServicePage
