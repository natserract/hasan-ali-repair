/* eslint-disable prettier/prettier */

export const mailTemplate = (to:string, content: string) => `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
    <link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600&display=swap' rel='stylesheet'
        type='text/css'>
    <style>
      * {
        margin: 0;
        padding: 0;
      }

      html,
      body {
        height: 100%;
      }

      body {
        font-family: "Lato", sans-serif;
      }

      p {
        line-height: 1.3em;
      }

      a {
        color: #ce7dfc;
        text-decoration: none;
        outline: 0;
        box-shadow: none;
      }

      a:hover {
        opacity: 0.8;
      }

      .email-header {
        background: linear-gradient(90deg, rgba(31,201,209,1) 0%, rgba(64,169,248,1) 49%);
        height: 131px;
        padding-top: 40px;
        box-sizing: border-box;
      }

      .container {
        padding-left: 110px;
        padding-right: 110px;
      }

      .hd-brand a {
        font-size: 36px;
        font-weight: 500;
        display: inline-block;
        margin: 0 0 30px;
        text-decoration: none;
        color: #ffff;
      }

      .hd-brand a:hover {
        opacity: 1 !important;
      }

      .email-body {
        padding: 60px 0;
        min-height: 280px;
        font-size: 24px;
        color: #202020;
      }


      .email-body p:not(:last-child) {
        margin-bottom: 20px;
      }

      .email-footer {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 130px;
        font-size: 20px;
        color: #202020;
      }

      @media (max-width: 981px) {
        .container {
            padding-left: 30px;
            padding-right: 30px;
        }
        .email-header {
            height: 91px;
            padding-top: 30px;
        }
        .hd-brand {
            text-align: center;
        }
        .hd-brand a {
            font-size: 24px;
        }
        .email-body {
            font-size: 18px;
            min-height: auto;
            padding: 90px 0;
        }

        .email-footer {
            font-size: 16px;
            text-align: center;
            height: 90px;
        }
      }

      @media only screen and (min-device-width: 375px) and (max-device-width: 825px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape) {
        .email-footer {
            position: relative;
        }
      }
      @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
        .email-footer {
            position: relative;
        }
      }

      @media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
        .email-footer {
            position: relative;
        }
      }
    </style>
</head>

<body>
    <header class="email-header">
        <div class="container">
            <div class="hd-brand">
                <a href="/">
                    <span>Bengkel Hasan Ali</span>
                </a>
            </div>
        </div>

    </header>

    <section class="email-body">
        <div class="container">
          <p>Hi, ${to}</p>
           ${content}
        </div>
    </section>

    <footer class="email-footer">
        <div class="container">
            <p>Copyright © 2022 Bengkel Hasan Ali</p>
        </div>
    </footer>
</body>

</html>

`
