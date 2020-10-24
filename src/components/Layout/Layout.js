import React from "react";
import Auxiliary from "../../hoc/Auxiliary";
import Toolbar from "../Navigation/Toolbar";
import SideDrawer from "../SideDrawer/SideDrawer";
import Classes from "./Layout.css";

const Layout = (props) => {
  return (
    <Auxiliary>
      <Toolbar />
      <SideDrawer />
      <main className={Classes.Content}>{props.children}</main>
    </Auxiliary>
  );
};

export default Layout;
