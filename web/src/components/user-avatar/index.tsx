import React from "react";
import { useTheme } from "@material-ui/styles";
import useStyles from "./styles";
import Theme from 'src/themes/default'
import { Typography } from "src/layouts/wrappers";

type UserAvatarProps = {
  name: string;
  color?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = (props) => {
  const classes = useStyles();
  const theme = useTheme() as typeof Theme;

  var letters = props.name
    .split(" ")
    .map(word => word[0])
    .join("");

  return (
    <div
      className={classes.avatar}
      style={{ backgroundColor: theme.palette[props?.color ?? "primary"].main }}
    >
      <Typography className={classes.text}>{letters}</Typography>
    </div>
  );
}

export default UserAvatar
