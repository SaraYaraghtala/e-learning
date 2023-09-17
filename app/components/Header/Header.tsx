"use client";
import Button from "@mui/material/Button";
import scss from "./Header.module.scss";
import { Typography } from "@mui/material";
import Link from "next/link";

const Header = () => {
  return (
    <header className={scss.header}>
      <ul className={scss.menu}>
        <li>
          <Link href="/"  className={scss.logo}>
          
              <Typography variant="h6">
                CuriosCourses
              </Typography>
          
          </Link>
        </li>
        <li>
          <Link href="/">
            <Typography>Home</Typography>
          </Link>
        </li>
        <li>
          <Link href="/Profile">
            <Typography>Profile</Typography>
          </Link>
        </li>
      </ul>

      <div className={scss.buttonMenu}>
        <Button variant="contained" >Sign in</Button>
        <Button variant="contained" href="/Logout">Sign out</Button>
        <Button variant="contained">Register</Button>
      </div>
    </header>
  );
};

export default Header;
