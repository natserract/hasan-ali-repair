import { useAuth } from "@redwoodjs/auth";
import { useEffect } from "react";
import useStyles from "./styles";

const DashboardPage = () => {
  const classes = useStyles();
  const { currentUser, userMetadata } = useAuth()

  useEffect(() => {
    console.log('currentUser', currentUser, userMetadata)
  }, [currentUser])

  return (
    <React.Fragment>
      Dashboard Page
    </React.Fragment>
  )
}

export default DashboardPage
