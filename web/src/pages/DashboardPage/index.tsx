import { useAuth } from "@redwoodjs/auth";
import { useEffect } from "react";
import { AuthClient } from "src/libs/auth";
import { useAuthState } from "src/libs/auth/hooks";
import useStyles from "./styles";

const DashboardPage = () => {
  const classes = useStyles();
  const { currentUser, isSuccess } = useAuthState()

  useEffect(() => {
    if (isSuccess) {
      console.log('currentUser', currentUser)
    }
  }, [currentUser, isSuccess])

  return (
    <React.Fragment>
      Dashboard Page

      {JSON.stringify(currentUser)}
    </React.Fragment>
  )
}

export default DashboardPage
