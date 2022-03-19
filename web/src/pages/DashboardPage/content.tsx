/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react'
import Theme from 'src/themes'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import useTheme from '@material-ui/styles/useTheme'
import { Grid, Typography } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import { useQuery } from '@redwoodjs/web'
import { ArrowRightAlt as ArrowRightAltIcon } from '@material-ui/icons'
import { DASHBOARDREPORTS_QUERY } from './query'
import { dates } from 'src/constant/data'
import { useAccess, useNavigate } from 'src/libs/gql-router'
import { adminCardListData, clientCardListData } from './constants'
import { useAuthState } from 'src/libs/auth/hooks'

const Content = () => {
  const theme = useTheme() as typeof Theme
  const navigate = useNavigate()

  const { currentRole } = useAccess()
  const { currentUser } = useAuthState()

  const { data: reportsData } = useQuery(DASHBOARDREPORTS_QUERY, {
    variables: {
      email: currentUser?.email ?? '',
    },
  })
  const reports = reportsData?.dashboardReports

  const [lineChartData, setLineChartData] = useState([])

  useEffect(() => {
    const servicesDaily = reports?.serviceDaily

    if (servicesDaily) {
      const objs = dates().map((day) => {
        const activeDay = servicesDaily.find((v) => +v.day == day)

        return {
          day,
          price: activeDay?.price || 0,
          count: activeDay?.count || 0,
        }
      })
      setLineChartData(objs)
    }
  }, [reports])

  const renderCardLists = () => {
    const items =
      currentRole === 'admin' ? adminCardListData : clientCardListData

    return items.map((item) => (
      <Grid key={item.id} item md={3} xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              {item.title}
              <Typography
                component="i"
                variant="subtitle2"
                color="textSecondary"
                style={{
                  fontSize: 13,
                  paddingLeft: 5,
                }}
              >
                ({item.category})
              </Typography>
            </Typography>
            <Typography
              variant="h1"
              color="textPrimary"
              style={{ marginTop: 10 }}
            >
              {reports ? reports[item.value] : 0}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              color="primary"
              size="small"
              endIcon={<ArrowRightAltIcon />}
              onClick={() => navigate.push(`${item.href}`)}
            >
              See {item.buttonTxt}
            </Button>
          </CardActions>
        </Card>
      </Grid>
    ))
  }

  return (
    <Grid container spacing={3}>
      {renderCardLists()}

      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography
              variant="h3"
              color="textPrimary"
              style={{
                padding: 15,
                marginBottom: 15,
              }}
              gutterBottom
            >
              30 Days Orders History
            </Typography>

            <ResponsiveContainer width="100%" height={350}>
              <LineChart
                width={500}
                height={300}
                data={lineChartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke={theme.palette.primary.main}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke={theme.palette.secondary.main}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Content
