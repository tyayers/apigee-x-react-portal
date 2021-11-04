import React, { useState, useEffect } from 'react';
import appIcon from '../../assets/images/app_icon.svg'

export default function AppCard({
  AppName = "", 
  AppApis = [],
  CreatedDate
}) {

  return (
    <>
      <div className={"appRowButton"} style={{textAlign: "left", borderRadius: "12px", marginTop: "5px", padding: "10px", display: "flex", alignItems: "center"}}>
        <div style={{borderRadius: "100%", backgroundColor: "#1a1a1a", width: "60px", height: "60px", minWidth: "60px"}}>
          <img src={appIcon} style={{marginTop: "9px", width: "39px"}}></img>
        </div>
        <div style={{marginLeft: "10px", marginTop: "8px", flexGrow: "4"}}>
          <div style={{fontWeight: "bold"}}>{AppName}</div>
          <div style={{position: "relative", left: "-2px", marginTop: "15px", display: "flex", flexWrap: "wrap"}}>
            {/* <div style={{fontSize: "12px"}}>Subscribed APIs</div> */}
            {AppApis.map((api) => 
              <span className="form-submit" style={{flexBasis: "content", padding: "0px 5px", height: "20px", margin: "2px", fontSize: "11px", whiteSpace: "nowrap", lineHeight: "20px"}}>{api.apiproduct}</span>
            )}
          </div>
        </div>
        <div style={{fontSize: "12px", alignSelf: "end", color: "darkgray"}}>
          Created: {(new Date(parseFloat(CreatedDate))).toDateString()}
        </div>
      </div>
    </>

    // Alternative layout with the API tags on the right-hand side
    // <>
    //   <div className={"appRowButton"} style={{textAlign: "left", borderRadius: "12px", marginTop: "5px", padding: "10px", display: "flex"}}>
    //     <div style={{borderRadius: "100%", backgroundColor: "#1a1a1a", width: "50px", height: "50px", minWidth: "50px"}}>
    //       <img src={appIcon} style={{marginTop: "7px", width: "34px"}}></img>
    //     </div>
    //     <div style={{textWeight: "bold", marginLeft: "10px", marginTop: "8px", flexGrow: "4"}}>
    //       {AppName}
    //     </div>
    //     <div style={{display: "flex", flexWrap: "wrap", flexDirection: "row-reverse", maxWidth: "185px"}}>
    //       {/* <div style={{fontSize: "12px"}}>Subscribed APIs</div> */}
    //       {AppApis.map((api) => 
    //         <span className="form-submit" style={{flexBasis: "content", padding: "0px 5px", height: "29px", margin: "2px", fontSize: "11px", whiteSpace: "nowrap"}}>{api.apiproduct}</span>
    //       )}
    //     </div>
    //   </div>  
    // </>

  )
}