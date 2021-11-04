import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ProfileHeader({
  user,
  signOut
}) {

  const [menuOpen, setMenuOpen] = useState(false)

  const picStyle = {
    borderRadius: "100px",
    width: "40px",
    border: "3px #5658DD solid",
    cursor: "pointer"
  }

  const backStyle = {
    left: "0px",
    top: "0px",
    width: "100vw",
    height: "100vh",
    position: "fixed",
    backgroundColor: "transparent"
  }

  const menuStyle = {
    backgroundColor: "#25282C",
    position: "absolute",
    fontSize: "13px",
    padding: "10px 10px 10px 10px",
    cursor: "pointer",
    borderRadius: "9px",
    border: "1px #444 solid",
    marginTop: "5px"
  }

  function doSignOut() {
    setMenuOpen(false);
    signOut();
  }

  return(
    <>
      <img id="profileButton" src={user.photoURL} style={picStyle} onClick={() => setMenuOpen(!menuOpen)}></img>
      {menuOpen &&
        <div>
          <div style={backStyle} onClick={() => setMenuOpen(!menuOpen)}></div>
          {/* <div style={{width: "0px", marginLeft: "10px", borderBottom: "13px solid rgb(37, 40, 44)", borderLeft: "13px solid transparent", borderRight: "13px solid transparent"}}></div> */}
          <div style={menuStyle} >
            <Link to="/apps" style={{padding: "0px"}} onClick={() => setMenuOpen(false)}><div>Apps</div></Link>
            <Link to="/" style={{padding: "0px"}} onClick={() => doSignOut()}><div>Sign out</div></Link>
          </div>
        </div>

      }

    </>
  );
}