import { MetaTags, useQuery } from '@redwoodjs/web'
import Widget from 'src/components/widget'
import Typography from '@material-ui/core/Typography'
import InputLabel from '@material-ui/core/InputLabel'
import { parseDate } from 'src/utils/date'
import { useParams } from 'src/libs/gql-router/hooks'
import { SHOWSCHEDULE_QUERY } from './query'

const ShowSchedulePage = () => {
  const params = useParams()

  const { data: scheduleData, loading: loadingScheduleData } = useQuery(
    SHOWSCHEDULE_QUERY,
    {
      variables: {
        id: +params?.id,
      },
    }
  )
  const schedule = scheduleData?.schedule

  return (
    <>
      <MetaTags title="Show Schedule" description="Show Schedule page" />

      <Widget
        isLoading={loadingScheduleData}
        title="View Schedule"
        disableWidgetMenu
      >
        <div className="formGroup">
          <div className="formGroupItem">
            <Typography variant="h6" component="h4">
              Customer Name
            </Typography>
            <InputLabel color="secondary">
              {schedule?.customer?.user?.name}
            </InputLabel>
          </div>

          <div className="formGroupItem">
            <Typography variant="h6" component="h4">
              Booking Date
            </Typography>
            <InputLabel color="secondary">
              {parseDate(schedule?.booking_date)}
            </InputLabel>
          </div>

          <div className="formGroupItem">
            <Typography variant="h6" component="h4">
              Booking Status
            </Typography>
            <InputLabel color="secondary">{schedule?.status}</InputLabel>
          </div>

          <div className="formGroupItem">
            <Typography variant="h6" component="h4">
              Vehicle
            </Typography>
            <InputLabel color="secondary">{schedule?.vehicle?.name}</InputLabel>
          </div>

          <div className="formGroupItem">
            <Typography variant="h6" component="h4">
              Vehicle Serial Num
            </Typography>
            <InputLabel color="secondary">
              {schedule?.vehicle?.serialNum}
            </InputLabel>
          </div>

          <div className="formGroupItem">
            <Typography variant="h6" component="h4">
              Message
            </Typography>
            <InputLabel color="secondary">{schedule?.message}</InputLabel>
          </div>
        </div>
      </Widget>
    </>
  )
}

export default ShowSchedulePage
