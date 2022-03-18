import { MetaTags, useQuery } from '@redwoodjs/web'
import { useForm } from 'react-hook-form'
import FormInput from 'src/components/form/formInput'
import FormSelect from 'src/components/form/formSelect'
import FormAutoComplete from 'src/components/form/formAutoComplete'
import { CREATESERVICE_MUTATION } from './mutation'
import Create from 'src/components/common/create'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import FormHelperText from '@material-ui/core/FormHelperText'
import MenuItem from '@material-ui/core/MenuItem'
import Tooltip from '@material-ui/core/Tooltip'
import {
  MECHANICS_QUERY,
  CREATESERVICE_SCHEDULES_QUERY,
  CREATESERVICE_PARTSQUERY,
} from './query'
import { useAuthState } from 'src/libs/auth/hooks'
import { parseDate } from 'src/utils/date'
import { useState } from 'react'
import { arrayTransformProperty } from 'src/utils/array'
import { toRupiah } from 'src/utils/currency'
import { copyText } from 'src/utils/string'

const CreateServicePage = (props) => {
  const form = useForm()
  const {
    formState: { errors },
    control,
  } = form

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { currentUser } = useAuthState()

  const { data: schedulesData, loading: loadingSchedulesData } = useQuery(
    CREATESERVICE_SCHEDULES_QUERY,
    {
      variables: {
        input: {
          // eslint-disable-next-line prettier/prettier
          filter: "{\"status\":{\"in\":[\"approved\"]}}",
        },
      },
    }
  )
  const { data: mechanicsData, loading: mechanicsLoading } =
    useQuery(MECHANICS_QUERY)
  const { data: partsData, loading: partsDataLoading } = useQuery(
    CREATESERVICE_PARTSQUERY
  )

  const [scheduleId, setScheduleId] = useState(NaN)
  const [partIds, setPartIds] = useState([])
  const [totalPrice, setTotalPrice] = useState(NaN)
  const [openTooltip, setTooltipOpen] = useState(false)

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

  return (
    <>
      <MetaTags title="Create Service" description="Create Service page" />

      <Create
        isLoading={mechanicsLoading || loadingSchedulesData}
        form={form}
        createMutation={CREATESERVICE_MUTATION}
        resourceName={props.resourceName}
        input={(data) => ({
          mechanic_id: data.mechanic_id,
          schedule_id: scheduleId,
          status: data?.status,
          price: !isNaN(totalPrice) && totalPrice ? totalPrice : undefined,
          created_by: currentUser?.id,
          part_ids: partIds,
        })}
      >
        <FormControl>
          {/* Only show schedule based on status `on review` */}
          <FormAutoComplete
            required
            label="Select Schedules"
            name="schedule_id"
            control={control}
            errorobj={errors}
            isReady={!loadingSchedulesData}
            options={schedulesData?.schedules}
            onChange={(event, value) => setScheduleId(value.id)}
            getOptionLabel={(option: any) => {
              return `Customer: ${option.customer.user.name}, Email: ${
                option.customer.user.email
              }, Date: ${parseDate(option.booking_date)}, Vehicle: ${
                option.vehicle.name
              }`
            }}
          />
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
          <FormAutoComplete
            multiple
            label="Select Parts Used"
            name="part_id"
            control={control}
            errorobj={errors}
            isReady={!partsDataLoading}
            options={partsData?.parts}
            onChange={(_event, values) => {
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
                  disabled={isNaN(totalPrice) || !partIds.length}
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
      </Create>
    </>
  )
}

export default CreateServicePage
