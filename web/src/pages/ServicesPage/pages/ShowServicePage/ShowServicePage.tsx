import { MetaTags, useQuery } from '@redwoodjs/web'
import Widget from 'src/components/widget'
import Typography from '@material-ui/core/Typography'
import InputLabel from '@material-ui/core/InputLabel'
import { SHOWSERVICE_QUERY } from './query'
import { useParams } from 'src/libs/gql-router/hooks'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { parseDate } from 'src/utils/date'
import { toRupiah } from 'src/utils/currency'

const ShowServicePage = () => {
  const params = useParams()

  const { data: serviceQueryData, loading: loadingServiceQuery } = useQuery(
    SHOWSERVICE_QUERY,
    {
      variables: {
        id: +params?.id,
      },
    }
  )
  const service = serviceQueryData?.service

  return (
    <>
      <MetaTags title="ShowService" description="ShowService page" />

      <Widget
        isLoading={loadingServiceQuery}
        title="View Service"
        disableWidgetMenu
      >
        <div className="formGroup">
          <div className="formGroupItem">
            <Typography variant="h6" component="h4">
              Customer Name
            </Typography>
            <InputLabel color="secondary">
              {service?.schedule?.customer?.user?.name}
            </InputLabel>
          </div>

          <div className="formGroupItem">
            <Typography variant="h6" component="h4">
              Booking Date
            </Typography>
            <InputLabel color="secondary">
              {parseDate(service?.schedule?.booking_date)}
            </InputLabel>
          </div>

          <div className="formGroupItem">
            <Typography variant="h6" component="h4">
              Vehicle Check Date
            </Typography>
            <InputLabel color="secondary">
              {parseDate(service?.created_at)}
            </InputLabel>
          </div>

          <div className="formGroupItem">
            <Typography variant="h6" component="h4">
              Status
            </Typography>
            <InputLabel color="secondary" style={{ fontWeight: 'bold' }}>
              {service?.schedule?.status}
            </InputLabel>
          </div>

          <div className="formGroupItem">
            <Typography variant="h6" component="h4">
              Vehicle
            </Typography>
            <InputLabel color="secondary">
              {service?.schedule?.vehicle?.name}
            </InputLabel>
          </div>

          <div className="formGroupItem">
            <Typography variant="h6" component="h4">
              Vehicle Serial Num
            </Typography>
            <InputLabel color="secondary">
              {service?.schedule?.vehicle?.serialNum}
            </InputLabel>
          </div>

          <div className="formGroupItem">
            <Typography variant="h6" component="h4">
              Mechanic Name
            </Typography>
            <InputLabel color="secondary">{service?.mechanic?.name}</InputLabel>
          </div>

          <div className="formGroupItem">
            <Typography variant="h6" component="h4">
              Mechanic Id
            </Typography>
            <InputLabel color="secondary">
              {service?.mechanic?.person_id}
            </InputLabel>
          </div>

          <div className="formGroupItem">
            <Typography variant="h6" component="h4">
              Parts Used
            </Typography>

            <InputLabel color="secondary">
              <List dense>
                {service?.partsUsed.length
                  ? service?.partsUsed.map((item) => (
                      <ListItem
                        divider
                        style={{
                          paddingTop: 0,
                          paddingBottom: 0,
                        }}
                        key={item?.id}
                      >
                        <ListItemText
                          primary={`Part Name`}
                          secondary={item?.parts?.name}
                        />
                        <ListItemText
                          primary={`Part Serial Num`}
                          secondary={item?.parts?.part_number}
                        />
                      </ListItem>
                    ))
                  : 'Not Yet'}
              </List>
            </InputLabel>
          </div>

          <div className="formGroupItem">
            <Typography variant="h6" component="h4">
              Total Price
            </Typography>
            <InputLabel color="secondary" style={{ fontWeight: 'bold' }}>
              {service?.price
                ? toRupiah(service?.price, 'currency')
                : 'Not Yet'}
            </InputLabel>
          </div>

          <div className="formGroupItem">
            <Typography variant="h6" component="h4">
              Message
            </Typography>
            <InputLabel color="secondary">{service?.message ?? '-'}</InputLabel>
          </div>
        </div>
      </Widget>
    </>
  )
}

export default ShowServicePage
