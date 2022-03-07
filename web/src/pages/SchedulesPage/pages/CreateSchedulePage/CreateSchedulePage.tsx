import { Link, routes } from '@redwoodjs/router'
import { MetaTags, useQuery } from '@redwoodjs/web'
import FormPicker from 'src/components/form/formPicker'
import { useForm } from 'react-hook-form'
import Create from 'src/components/common/create'
import { VEHICLES_QUERY } from './query'
import { useAuthState } from 'src/libs/auth/hooks'
import { CREATESCHEDULE_MUTATION } from './mutation'
import FormInput from 'src/components/form/formInput'
import FormSelect from 'src/components/form/formSelect'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'

const CreateSchedulePage = (props) => {
  const { currentUser } = useAuthState()

  const form = useForm({
    mode: 'onSubmit',
  })
  const {
    formState: { errors },
    control,
  } = form

  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2014-08-18T21:11:54')
  )

  const { data: vehiclesData, loading: vehiclesLoading } = useQuery(
    VEHICLES_QUERY,
    {
      variables: {
        input: {
          filter: JSON.stringify({
            created_by: currentUser?.id,
          }),
        },
      },
    }
  )

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  return (
    <>
      <MetaTags title="Create Schedule" description="Create Schedule page" />

      <Create
        isLoading={vehiclesLoading}
        form={form}
        createMutation={CREATESCHEDULE_MUTATION}
        resourceName={props.resourceName}
        input={({ price, ...data }) => ({
          ...data,
          price: +price,
        })}
      >
        <FormControl>
          <FormPicker
            control={control}
            label="Time From"
            name="time_from"
            errorobj={errors}
            value={selectedDate}
            onChange={handleDateChange}
            required
          />
        </FormControl>
        <FormControl variant="outlined">
          <FormPicker
            control={control}
            label="Time To"
            name="time_to"
            errorobj={errors}
            value={selectedDate}
            onChange={handleDateChange}
            required
          />
        </FormControl>
        <FormControl>
          <FormSelect
            label="Select Vehicle"
            name="vehicle_id"
            control={control}
            errorobj={errors}
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

export default CreateSchedulePage
