import React, { useCallback, useEffect, useState } from 'react'
import { MetaTags } from '@redwoodjs/web'
import {
  EDITSERVICE_SHOWSERVICEQUERY,
  MECHANICS_QUERY,
  EDITSERVICE_PARTSQUERY,
} from './query'
import { EDITSERVICES_MUTATION } from './mutation'
import { useQuery } from '@redwoodjs/web'
import { useParams } from 'src/libs/gql-router'
import { useForm } from 'react-hook-form'
import FormInput from 'src/components/form/formInput'
import FormSelect from 'src/components/form/formSelect'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Edit from 'src/components/common/edit'
import { useAuthState } from 'src/libs/auth/hooks'
import FormAutoComplete from 'src/components/form/formAutoComplete'
import { parseDate } from 'src/utils/date'
import Tooltip from '@material-ui/core/Tooltip'
import FormHelperText from '@material-ui/core/FormHelperText'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { toRupiah } from 'src/utils/currency'
import { arrayTransformProperty } from 'src/utils/array'
import { copyText } from 'src/utils/string'

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
    EDITSERVICE_SHOWSERVICEQUERY,
    {
      variables: {
        id: +params?.id,
      },
    }
  )
  const service = serviceData?.service

  const { data: mechanicsData, loading: mechanicsLoading } =
    useQuery(MECHANICS_QUERY)
  const { data: partsData, loading: partsDataLoading } = useQuery(
    EDITSERVICE_PARTSQUERY
  )

  const [scheduleId, setScheduleId] = useState(NaN)
  const [parts, setParts] = useState([])
  const [partIds, setPartIds] = useState([])
  const [totalPrice, setTotalPrice] = useState(NaN)
  const [openTooltip, setTooltipOpen] = useState(false)

  const updatePartsUsed = useCallback((items: any[]) => {
    const partsUsed = Array.from(items)

    if (partsUsed.length) {
      const newParts = arrayTransformProperty(partsUsed, 'parts')
      const ids = arrayTransformProperty(newParts, 'id')
      const prices = arrayTransformProperty(newParts, 'price')
      const price = prices.length && prices.reduce((acc, curr) => acc + curr)

      setParts(newParts)
      setPartIds(ids)
      setTotalPrice(price)
    }
  }, [])

  useEffect(() => {
    if (service) {
      const { partsUsed, schedule } = service
      updatePartsUsed(partsUsed)

      setScheduleId(schedule?.id)
    }
  }, [service, updatePartsUsed])

  const handleTooltipOpen = () => {
    setTooltipOpen(true)

    if (totalPrice) {
      copyText(toRupiah(totalPrice))
    }
  }

  const handleTooltipClose = () => {
    setTimeout(() => {
      setTooltipOpen(false)
    }, 700)
  }
  if (!service) return <React.Fragment />

  return (
    <>
      <MetaTags title="Edit Service" description="Edit Service" />

      <Edit
        form={form}
        editMutation={EDITSERVICES_MUTATION}
        id={+params?.id}
        input={(data) => ({
          mechanic_id: data.mechanic_id,
          schedule_id: scheduleId,
          status: data?.status,
          price: !isNaN(totalPrice) && totalPrice ? totalPrice : undefined,
          created_by: currentUser?.id,
          part_ids: partIds,
        })}
        resourceName={props.resourceName}
        showQuery={EDITSERVICE_SHOWSERVICEQUERY}
        isLoading={loadingServiceData || mechanicsLoading}
      >
        <FormControl disabled>
          <FormInput
            control={control}
            name="schedule_id"
            label="Schedule "
            errorobj={errors}
            required
            disabled
            defaultValue={parseDate(service?.schedule?.booking_date)}
          />
        </FormControl>

        <FormControl>
          <FormSelect
            useKey
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
          <FormAutoComplete
            multiple
            label="Select Parts Used"
            name="part_id"
            control={control}
            errorobj={errors}
            isReady={!partsDataLoading}
            options={partsData?.parts}
            value={parts}
            filterSelectedOptions
            getOptionSelected={(option, value) => {
              return option.id === value.id
            }}
            onChange={(_event, values) => {
              setParts(values)
              const ids = arrayTransformProperty(values, 'id')
              const prices = arrayTransformProperty(values, 'price')
              const price =
                prices.length && prices.reduce((acc, curr) => acc + curr)

              setPartIds(ids)
              setTotalPrice(price)

              if (!ids.length) {
                setTotalPrice(NaN)
              }
            }}
            getOptionLabel={(option: any) => {
              return `${option.name} - ${option.part_number}`
            }}
          />

          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            style={{
              margin: '10px 0',
            }}
          >
            <FormHelperText>
              <span style={{ marginRight: 10 }}>
                Total calculate price:{' '}
                {isNaN(totalPrice) ? '0,00' : toRupiah(totalPrice, 'currency')}
              </span>
            </FormHelperText>
            <Tooltip
              title="Text Copied"
              disableHoverListener
              onClose={handleTooltipClose}
              open={openTooltip}
            >
              <span>
                <Button
                  size="small"
                  variant="outlined"
                  style={{ textTransform: 'capitalize', fontSize: 11 }}
                  onClick={handleTooltipOpen}
                  disabled={isNaN(totalPrice) || !parts.length}
                >
                  Copy Price
                </Button>
              </span>
            </Tooltip>
          </Grid>
        </FormControl>

        <FormControl>
          <FormInput
            control={control}
            name="price"
            label="Price"
            errorobj={errors}
            value={isNaN(totalPrice) ? '' : totalPrice}
            readOnly
          />
        </FormControl>
      </Edit>
    </>
  )
}

export default EditServicePage
