import { MetaTags } from '@redwoodjs/web'
import Widget from 'src/components/widget'
import useStyles from './styles'
import Typography from '@material-ui/core/Typography'
import InputLabel from '@material-ui/core/InputLabel'

const ContactUsPage = () => {
  const classes = useStyles()

  return (
    <>
      <MetaTags title="Contact Us" description="Contact Us page" />

      <Widget
        headerClass={classes.headerWidget}
        title="Contact Info"
        disablePrevButton
        disableWidgetMenu
      >
        <div className="formGroup">
          <div className="formGroupItem">
            <Typography variant="h6" component="h4">
              Store Name
            </Typography>
            <InputLabel color="secondary">Bengkel Hasan Ali</InputLabel>
          </div>

          <div className="formGroupItem">
            <Typography variant="h6" component="h4">
              Address
            </Typography>
            <InputLabel color="secondary">
              Jl Tukad Baru Timur Gg Masruri 1, No 4B, Denpasar, Bali
            </InputLabel>
          </div>

          <div className="formGroupItem">
            <Typography variant="h6" component="h4">
              WA Phone
            </Typography>
            <InputLabel color="secondary">
              <a
                href="https://wa.me/089653200268"
                target="_blank"
                rel="noreferrer"
              >
                +62 896 5320 0268
              </a>
            </InputLabel>
          </div>

          <div className="formGroupItem">
            <Typography variant="h6" component="h4">
              Email Address
            </Typography>
            <InputLabel color="secondary">
              <a href="mailto:bengkelhasanali@gmail.com">
                bengkelhasanali@gmail.com
              </a>
            </InputLabel>
          </div>
        </div>
      </Widget>
    </>
  )
}

export default ContactUsPage
