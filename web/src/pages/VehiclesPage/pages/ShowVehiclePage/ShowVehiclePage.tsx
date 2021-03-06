import { MetaTags, useQuery } from '@redwoodjs/web'
import Widget from 'src/components/widget'
import Typography from '@material-ui/core/Typography'
import InputLabel from '@material-ui/core/InputLabel'
import { SHOWVEHICLEQUERY } from './query'
import { useParams } from 'src/libs/gql-router/hooks'
import { parseDate } from 'src/utils/date'

const ShowVehiclePage = () => {
  const params = useParams()

  const { data: vehicleData, loading: loadingVehicleData } = useQuery(
    SHOWVEHICLEQUERY,
    {
      variables: {
        id: +params?.id,
      },
    }
  )
  const vehicle = vehicleData?.vehicle

  return (
    <>
      <MetaTags title="View Vehicle" description="View Vehicle page" />

      <Widget
        isLoading={loadingVehicleData}
        title="View Vehicle"
        disableWidgetMenu
      >
        <div className="formGroup">
          <div className="formGroupItem">
            <Typography variant="h6" component="h4">
              Name
            </Typography>
            <InputLabel color="secondary">{vehicle?.name}</InputLabel>
          </div>

          <div className="formGroupItem">
            <Typography variant="h6" component="h4">
              Serial Number
            </Typography>
            <InputLabel color="secondary">{vehicle?.serialNum}</InputLabel>
          </div>

          <div className="formGroupItem">
            <Typography variant="h6" component="h4">
              Created At
            </Typography>
            <InputLabel color="secondary">
              {parseDate(vehicle?.created_at)}
            </InputLabel>
          </div>

          <div className="formGroupItem">
            <Typography variant="h6" component="h4">
              Year
            </Typography>
            <InputLabel color="secondary">{vehicle?.year}</InputLabel>
          </div>

          <div className="formGroupItem">
            <Typography variant="h6" component="h4">
              Details
            </Typography>
            <InputLabel color="secondary">{vehicle?.details}</InputLabel>
          </div>
        </div>
      </Widget>
    </>
  )
}

export default ShowVehiclePage
