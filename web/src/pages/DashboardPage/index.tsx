import React from 'react'
import Theme from 'src/themes'
import useStyles from './styles'
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
import Widget from 'src/components/widget'
import { MetaTags } from '@redwoodjs/web'

const lineChartData = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
]

const DashboardPage = () => {
  const _classes = useStyles()
  const theme = useTheme() as typeof Theme

  return (
    <React.Fragment>
      <MetaTags title="Dashboard" description="Dashboard page" />
      <Typography
        component="h1"
        variant="h2"
        color="textPrimary"
        // eslint-disable-next-line react/no-children-prop
        children="Latest Reports"
        gutterBottom
      />

      <Grid style={{ marginTop: 15 }} item xs={12} md={8}>
        <Widget
          title="Based on Months"
          noBodyPadding
          disablePrevButton
          disableWidgetMenu
        >
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
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pv"
                stroke={theme.palette.primary.main}
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="uv"
                stroke={theme.palette.secondary.main}
              />
            </LineChart>
          </ResponsiveContainer>
        </Widget>
      </Grid>
    </React.Fragment>
  )
}

export default DashboardPage
