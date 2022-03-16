import React from 'react'
import { MetaTags, useQuery } from '@redwoodjs/web'
import { SHOWMECHANIC_QUERY } from '../ShowMechanicPage/query'
import { EDITMECHANIC_MUTATION } from './mutation'
import FormSelect from 'src/components/form/formSelect'
import MenuItem from '@material-ui/core/MenuItem'
import { useParams } from 'src/libs/gql-router'
import Edit from 'src/components/common/edit'
import { useForm } from 'react-hook-form'
import FormControl from '@material-ui/core/FormControl'
import FormInput from 'src/components/form/formInput'

const EditMechanicPage = (props) => {
  const params = useParams()

  const form = useForm({
    mode: 'onSubmit',
  })
  const {
    formState: { errors },
    control,
  } = form

  const { data: mechanicData, loading: loadingMechanicData } = useQuery(
    SHOWMECHANIC_QUERY,
    {
      variables: {
        id: +params?.id,
      },
    }
  )
  const mechanic = mechanicData?.mechanic

  if (!mechanic) return <React.Fragment />

  return (
    <>
      <MetaTags title="Edit Mechanic" description="Edit Mechanic page" />
      <Edit
        form={form}
        editMutation={EDITMECHANIC_MUTATION}
        id={+params?.id}
        input={({ is_active, ...data }) => ({
          ...data,
          is_active: is_active == 1,
        })}
        resourceName={props.resourceName}
        showQuery={SHOWMECHANIC_QUERY}
        isLoading={loadingMechanicData}
      >
        <FormControl>
          <FormInput
            control={control}
            name="name"
            label="Name"
            errorobj={errors}
            defaultValue={mechanic?.name}
          />
        </FormControl>

        <FormControl>
          <FormInput
            control={control}
            name="person_id"
            label="Person ID (KTP)"
            errorobj={errors}
            inputProps={{
              minLength: 16,
              maxLength: 16,
            }}
            defaultValue={mechanic?.person_id}
          />
        </FormControl>

        <FormControl>
          <FormSelect
            label="Status"
            name="is_active"
            control={control}
            errorobj={errors}
            defaultValue={mechanic?.is_active ? 1 : 0}
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
            defaultValue={mechanic?.address}
            errorobj={errors}
          />
        </FormControl>
      </Edit>
    </>
  )
}

export default EditMechanicPage
