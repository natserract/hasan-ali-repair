import { MetaTags, useQuery } from '@redwoodjs/web'
import { useForm } from 'react-hook-form'
import FormInput from 'src/components/form/formInput'
import FormSelect from 'src/components/form/formSelect'
import { CREATESERVICE_MUTATION } from './mutation'
import Create from 'src/components/common/create'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import { VEHICLES_QUERY, MECHANICS_QUERY, CUSTOMERS_QUERY } from './query'
import { useAuthState } from 'src/libs/auth/hooks'
import { useState } from 'react'

const CreateServicePage = (props) => {
  const form = useForm()
  const {
    formState: { errors },
    control,
  } = form

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { currentUser } = useAuthState()

  const [customerId, setCustomerId] = useState(NaN)
  const { data: vehiclesData, loading: vehiclesLoading } = useQuery(
    VEHICLES_QUERY,
    {
      variables: {
        input: {
          filter: JSON.stringify({
            created_by: customerId || undefined,
          }),
        },
      },
    }
  )
  const { data: mechanicsData, loading: mechanicsLoading } =
    useQuery(MECHANICS_QUERY)
  const { data: customersData, loading: customersLoading } =
    useQuery(CUSTOMERS_QUERY)

  return (
    <>
      <MetaTags title="CreateService" description="CreateService page" />

      <Create
        isLoading={vehiclesLoading || mechanicsLoading || customersLoading}
        form={form}
        createMutation={CREATESERVICE_MUTATION}
        resourceName={props.resourceName}
        input={({ price, ...data }) => ({
          ...data,
          price: +price,
        })}
      >
        <FormControl>
          <FormSelect
            label="Select Customer"
            name="customer_id"
            control={control}
            errorobj={errors}
            onChange={(e) => {
              const value = e.target.value
              if (value) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                const item = Array.from(customersData.customers).find(
                  (v: { id: number }) => v.id === value
                ) as any
                setCustomerId(item?.user_id)
              }
            }}
            required
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {customersData?.customers.map((customer) => (
              <MenuItem key={customer.id} value={customer.id}>
                {customer.user.name}
              </MenuItem>
            ))}
          </FormSelect>
        </FormControl>

        <FormControl>
          <FormSelect
            label="Select Vehicle"
            name="vehicle_id"
            control={control}
            errorobj={errors}
            disabled={!customerId}
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
            required
          />
        </FormControl>
        <FormControl>
          <FormInput
            control={control}
            name="message"
            label="Message"
            errorobj={errors}
          />
        </FormControl>
      </Create>
    </>
  )
}

export default CreateServicePage
