import {Button as MuiButton} from "@mui/material";
import { forwardRef } from "react";

const Button = forwardRef((props, ref) => <MuiButton  {...props} ref={ref} disableFocusRipple={true}></MuiButton>);
Button.displayName = "Button";

export default Button;
