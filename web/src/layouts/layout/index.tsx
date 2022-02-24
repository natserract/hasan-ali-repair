import useStyles from "./styles";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { Box, IconButton, Link } from '@material-ui/core'
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';
import Header from "src/layouts/header";
import Sidebar from "src/layouts/sidebar";
import { useResource } from "src/libs/gql-router/resource/hooks";
import React, { useEffect } from "react";
import RoutesHandler from "./routes";

const Layout: React.FC<{}> = (props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Header />
      <Sidebar />
      <div
        className={classnames(classes.content, {
          // [classes.contentShift]: layoutState.isSidebarOpened,
        })}
      >
        <div className={classes.fakeToolbar} />
        <RoutesHandler />

        <Box
          mt={5}
          width={"100%"}
          display={"flex"}
          alignItems={"center"}
          justifyContent="space-between"
        >
          <div>
            <Link
              color={'primary'}
              href={'https://flatlogic.com/'}
              target={'_blank'}
              className={classes.link}
            >
              Flatlogic
                </Link>
            <Link
              color={'primary'}
              href={'https://flatlogic.com/about'}
              target={'_blank'}
              className={classes.link}
            >
              About Us
                </Link>
            <Link
              color={'primary'}
              href={'https://flatlogic.com/blog'}
              target={'_blank'}
              className={classes.link}
            >
              Blog
                </Link>
          </div>
          <div>
            <Link
              href={'https://www.facebook.com/flatlogic'}
              target={'_blank'}
            >
              <IconButton aria-label="facebook">
                <FacebookIcon
                  htmlColor="#6E6E6E99"
                />
              </IconButton>
            </Link>
            <Link
              href={'https://twitter.com/flatlogic'}
              target={'_blank'}
            >
              <IconButton aria-label="twitter">
                <TwitterIcon
                  htmlColor="#6E6E6E99"
                />
              </IconButton>
            </Link>
            <Link
              href={'https://github.com/flatlogic'}
              target={'_blank'}
            >
              <IconButton
                aria-label="github"
                style={{ marginRight: -12 }}
              >
                <GitHubIcon
                  htmlColor="#6E6E6E99"
                />
              </IconButton>
            </Link>
          </div>
        </Box>
      </div>
    </React.Fragment>
  )
}

export default withRouter(Layout)
