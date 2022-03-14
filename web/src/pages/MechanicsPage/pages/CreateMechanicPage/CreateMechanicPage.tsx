import { MetaTags } from '@redwoodjs/web'
import { CREATEMECHANIC_MUTATION } from './mutation'
import FormInput from 'src/components/form/formInput'
import FormControl from '@material-ui/core/FormControl'
import { useForm } from 'react-hook-form'
import Create from 'src/components/common/create'
import FormSelect from 'src/components/form/formSelect'
import MenuItem from '@material-ui/core/MenuItem'

const CreateMechanicPage = (props) => {
  const form = useForm()
  const {
    formState: { errors },
    control,
  } = form

  return (
    <>
      <MetaTags title="Create Mechanic" description="Create Mechanic page" />

      <Create
        form={form}
        createMutation={CREATEMECHANIC_MUTATION}
        resourceName={props.resourceName}
        input={({ person_id, is_active, ...data }) => ({
          ...data,
          person_id: +person_id,
          is_active: is_active == 1,
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
            name="person_id"
            label="Person ID (KTP)"
            type="number"
            errorobj={errors}
            required
          />
        </FormControl>

        <FormControl>
          <FormSelect
            label="Status"
            name="is_active"
            control={control}
            errorobj={errors}
            required
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={0}>In Active</MenuItem>
            <MenuItem value={1}>Active</MenuItem>
          </FormSelect>
        </FormControl>

        <FormControl>
          <FormInput
            control={control}
            name="address"
            label="Address"
            errorobj={errors}
            required
          />
        </FormControl>
      </Create>
    </>
  )
}

export default CreateMechanicPage
