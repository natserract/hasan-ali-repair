import { MetaTags, useQuery } from '@redwoodjs/web'
import { SHOWPART_QUERY } from './query'
import { useParams } from 'src/libs/gql-router/hooks'
import Widget from 'src/components/widget'
import Typography from '@material-ui/core/Typography'
import InputLabel from '@material-ui/core/InputLabel'
import { parseDate } from 'src/utils/date'
import { toRupiah } from 'src/utils/currency'

const ShowPartPage = () => {
  const params = useParams()

  const { data: partData, loading: loadingPartData } = useQuery(
    SHOWPART_QUERY,
    {
      variables: {
        id: +params?.id,
      },
    }
  )
  const part = partData?.part

  return (
    <>
      <MetaTags title="Show Part" description="Show Part page" />

      <Widget
        isLoading={loadingPartData}
        title="View Vehicle"
        disableWidgetMenu
      >
        <div className="formGroup">
          <div className="formGroupItem">
            <Typography variant="h6" component="h4">
              Part Name
            </Typography>
            <InputLabel color="secondary">{part?.name}</InputLabel>
          </div>

          <div className="formGroupItem">
            <Typography variant="h6" component="h4">
              Part Number
            </Typography>
            <InputLabel color="secondary">{part?.part_number}</InputLabel>
          </div>

          <div className="formGroupItem">
            <Typography variant="h6" component="h4">
              In Date
            </Typography>
            <InputLabel color="secondary">
              {parseDate(part?.in_date)}
            </InputLabel>
          </div>

          <div className="formGroupItem">
            <Typography variant="h6" component="h4">
              Price
            </Typography>
            <InputLabel color="secondary">{toRupiah(part?.price)}</InputLabel>
          </div>

          <div className="formGroupItem">
            <Typography variant="h6" component="h4">
              Qty
            </Typography>
            <InputLabel color="secondary">{part?.qty}</InputLabel>
          </div>

          <div className="formGroupItem">
            <Typography variant="h6" component="h4">
              Description
            </Typography>
            <InputLabel color="secondary">{part?.description}</InputLabel>
          </div>
        </div>
      </Widget>
    </>
  )
}

export default ShowPartPage
