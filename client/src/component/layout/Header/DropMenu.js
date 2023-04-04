import * as React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Backdrop from "@mui/material/Backdrop";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import { Link } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";
import LoginIcon from "@mui/icons-material/Login";

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Sign-In/Sign-Up">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <PersonAdd className="link-icon" />
            <small className="link-text">Sign Up Here</small>
            <FaCaretDown fontSize={20} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link to="/login" style={{ textDecoration: "none", color: "#111" }}>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            Log To Account
          </MenuItem>
        </Link>
        <Divider />
        <Link to="/login" style={{ textDecoration: "none", color: "#111" }}>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <PersonAdd />
            </ListItemIcon>
            Create New Account
          </MenuItem>
        </Link>
      </Menu>
    </React.Fragment>
  );
}
