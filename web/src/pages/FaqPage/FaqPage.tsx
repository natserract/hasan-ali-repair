// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { MetaTags } from '@redwoodjs/web'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { faqs } from 'src/constant/faq'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: theme.typography.fontWeightMedium,
  },
}))

const FaqPage = () => {
  const classes = useStyles()

  return (
    <>
      <MetaTags title="Faq" description="Faq page" />

      <Grid container spacing={4}>
        <Grid item xs={12}>
          {faqs.map((faq) => (
            <Accordion key={faq.id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>{faq.title}</Typography>
              </AccordionSummary>
              <AccordionDetails
                dangerouslySetInnerHTML={{
                  __html: faq.content,
                }}
              />
            </Accordion>
          ))}
        </Grid>
      </Grid>
    </>
  )
}

export default FaqPage
