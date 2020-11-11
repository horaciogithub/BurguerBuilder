import React, { useState } from "react";
import Auxiliary from "../Auxiliary/Auxiliary";
import Toolbar from "../../components/Navigation/Toolbar";
import SideDrawer from "../../components/SideDrawer/SideDrawer";
import Classes from "./Layout.css";
import { connect } from "react-redux";

function Layout (props) {

  const [showSideDrawer, setShowSideDrawer] = useState(false)

    return (
      <Auxiliary>
        <Toolbar
          isAuth={props.isAuthenticated}
          drawerToggleClicked={() =>
            setShowSideDrawer((prevState) => (!prevState.showSideDrawer ))
          }
        />
        <SideDrawer
          isAuth={props.isAuthenticated}
          open={showSideDrawer}
          closed={() => setShowSideDrawer(false )}
        />
        <main className={Classes.Content}>{props.children}</main>
      </Auxiliary>
    );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
