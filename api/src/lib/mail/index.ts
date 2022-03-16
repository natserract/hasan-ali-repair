import * as nodemailer from 'nodemailer'

interface Options {
  to: string | string[]
  subject: string
  text?: string
  html?: string
}

/**
 * Please if this in local mode
 * First, you must enable this https://myaccount.google.com/lesssecureapps
 * Check your gmail as logged in, and unblock sender in spam menu
 */
export async function sendEmail({ to, subject, text, html }: Options) {
  console.log('Sending email to:', to)

  // create reusable transporter object using SendInBlue for SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.GMAIL_HOST,
    port: process.env.GMAIL_PORT,
    secure: false, // true for 465, false for other ports
    requireTLS: true,
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    },
  })

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"Bengkel Hasan Ali" <${process.env.SENDINBLUE_EMAIL}>`,
    to: Array.isArray(to) ? to : [to], // list of receivers
    subject, // Subject line
    ...(text && {
      text, // plain text body
    }),
    ...(html && {
      html, // html body
    }),
  })

  return info
}
