import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { getApiProducts, updateApp, updateAppCredential, createApp, deleteApp } from '../utils/DataService.mjs';
// import sections
import Hero from '../components/sections/Hero';
import FeaturesTiles from '../components/sections/FeaturesTiles';
import FeaturesSplit from '../components/sections/FeaturesSplit';
import Testimonial from '../components/sections/Testimonial';
import Cta from '../components/sections/Cta';
import { map } from 'lodash';
import { getApp } from '../utils/DataService.mjs';
import copyIcon from '../assets/images/copy_icon.png'
import showIcon from '../assets/images/show_icon.png'
import hideIcon from '../assets/images/hide_icon.png'
import deleteIcon from '../assets/images/delete_icon.svg'
import refreshIcon from '../assets/images/refresh_icon.svg'

import Switch from "react-switch";
import { toast } from 'react-toastify';

const AppDetail = (props) => {
  const history = useHistory();

  // const [apis, setApis] = useState([]);
  const [appName, setAppName] = useState(props.match.params.app == undefined ? "" : props.match.params.app);  
  const [isNewApp, setIsNewApp] = useState(props.match.params.app == undefined ? true : false);
  const [appDataLoaded, setAppDataLoaded] = useState(false);

  const [keyInputType, setKeyInputType] = useState("password");
  const [keyInputIcon, setKeyInputIcon] = useState(showIcon);
  const [secretInputType, setSecretInputType] = useState("password");
  const [secretInputIcon, setSecretInputIcon] = useState(showIcon);

  const [apiStatus, setApiStatus] = useState({});

  const [app, setApp] = useState({
    name: appName,
    description: ""
  });

  useEffect(() => {
    if (!appDataLoaded && props.apps && props.apps.length > 0) {
      setAppDataLoaded(true);
      props.apps.forEach((result) => {
        if (result.name === appName) {
          var newStatus = JSON.parse(JSON.stringify(apiStatus));
    
          for(const credential in result.credentials) {
            for (const apiProduct in result.credentials[credential].apiProducts) {
              if (result.credentials[credential].apiProducts[apiProduct].status === "approved")
                newStatus[result.credentials[credential].apiProducts[apiProduct].apiproduct] = true;
              else
                newStatus[result.credentials[credential].apiProducts[apiProduct].apiproduct] = false;
            }
          }
    
          setApiStatus(newStatus);
          setApp(result);
        }
      });
    }
  });

  function copyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
  
    // Place in the top-left corner of screen regardless of scroll position.
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;
  
    // Ensure it has a small width and height. Setting to 1px / 1em
    // doesn't work as this gives a negative w/h on some browsers.
    textArea.style.width = '2em';
    textArea.style.height = '2em';
  
    // We don't need padding, reducing the size if it does flash render.
    textArea.style.padding = 0;
  
    // Clean up any borders.
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
  
    // Avoid flash of the white box if rendered for any reason.
    textArea.style.background = 'transparent';
  
  
    textArea.value = text;
  
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
  
    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Copying text command was ' + msg);
    } catch (err) {
      console.log('Oops, unable to copy');
    }
  
    document.body.removeChild(textArea);

    if (props.toast) props.toast("Copied!");
  }

  function appNameChange(event) {
    var newapp = JSON.parse(JSON.stringify(app));
    newapp.name = event.target.value;
    setApp(newapp);
  }

  function appDescriptionChange(event) {
    var newapp = JSON.parse(JSON.stringify(app));
    newapp.description = event.target.value;
    setApp(newapp);
  }

  function clickProduct(name, value) {
    var newStatus = JSON.parse(JSON.stringify(apiStatus));

    if (newStatus[name] != value) {
      newStatus[name] = value;
      setApiStatus(newStatus);
    }
  }

  function toggleKeyType() {
    if (keyInputType === "password") {
      setKeyInputType("text");
      setKeyInputIcon(hideIcon);
    }
    else {
      setKeyInputType("password");
      setKeyInputIcon(showIcon);
    }
  }

  function toggleSecretType() {
    if (secretInputType === "password") {
      setSecretInputType("text");
      setSecretInputIcon(hideIcon);
    }
    else {
      setSecretInputType("password");
      setSecretInputIcon(showIcon);
    }
  }  

  function saveApp() {

    if(!isNewApp) {

      app.credentials[0].apiProducts = [];

      for (const [key, value] of Object.entries(apiStatus)) {
        if (value) {
          app.credentials[0].apiProducts.push({
            apiproduct: key,
            status: "approved"
          });
        }
      }

      updateAppCredential(props.user.email, app.name, app.credentials[0]).then((credentialResult) => {
        if (props.toast) props.toast("App updated!");
      })
      .catch((error) => {
        console.error(error);
      });

      history.push('/apps');
    }
    else {
      if (props.toast) props.toast("App created!");

      app.apiProducts = [];
      
      for (const [key, value] of Object.entries(apiStatus)) {
        if (value) {
          app.apiProducts.push(key);
        }
      }

      createApp(props.user.email, app.name, app).then((result) => {
        //setApp(result);
        props.apps.push(result);
        setAppDataLoaded(false);
        history.push('/apps');
        history.push('/apps/' + result.name);
        window.scrollTo(0, 0);
      });
    }
  }

  function deleteMyApp() {
    if (toast) toast("App deleted!");

    deleteApp(props.user.email, app.name).then((result) => {

      for( var i = 0; i < props.apps.length; i++){ 
        if ( props.apps[i].name === app.name) { 
          props.apps.splice(i, 1);
          break;
        }
      }

      history.push("/apps");
    });
  }

  return (
    <>
      <section className="testimonial section center-content illustration-section-01">
        <div className="container">
          <div className="testimonial-inner section-inner">
            <div className="testimonial-content  reveal-from-bottom">
              {app.name === ""
              ? <h1 class="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">New <span class="text-color-primary">App</span></h1>
              : <h1 class="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">App <span class="text-color-primary">{app.name}</span></h1> 
              }
              <div className="container-xs">
                <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
                  Create an app and embrace the API revolution with React web templates connected to Apigee X 🚀.
                </p>
                <div class="form">
                  {/* <div class="form-title">Overview</div> */}
                  <div style={{display: "flex", alignContent: "space-between", justifyContent: "space-between"}}>
                    {/* <h3 class="mt-0 mb-16 reveal-from-bottom" style={{textAlign: "left"}} data-reveal-delay="200"><span class="text-color-primary">Apps</span></h3> */}
                    <span class="form-title">Overview</span>
                    {!isNewApp &&
                      <a onClick={deleteMyApp} style={{height: "30px", width: "62px", marginTop: "34px"}} title="Delete app" className="form-submit"><img style={{width: "28px"}} src={deleteIcon}/></a>
                    }
                  </div>                  
                  <div class="form-input-container form-ic1">
                    <input id="appname" class="form-input" type="text" placeholder=" " value={app.name} onChange={appNameChange}></input>
                    <div class="form-cut"></div>
                    <label for="appname" class="form-placeholder">App name</label>
                  </div>
                  <div class="form-area-container form-ic2">
                    <textarea id="appdescription" class="form-input" type="text" placeholder=" " value={app.description} onChange={appDescriptionChange} />
                    <div class="form-cut"></div>
                    <label for="appdescription" class="form-placeholder">App description</label>
                  </div>
                  {app.credentials !== undefined &&
                    <div>
                      <br />
                      <div style={{display: "flex", alignContent: "space-between", justifyContent: "space-between"}}>
                        {/* <h3 class="mt-0 mb-16 reveal-from-bottom" style={{textAlign: "left"}} data-reveal-delay="200"><span class="text-color-primary">Apps</span></h3> */}
                        <span class="form-title">Credentials</span>
                        <div style={{height: "30px", width: "62px", marginTop: "34px"}} title="Refresh credentials" className="form-submit"><img style={{width: "28px"}} src={refreshIcon}/></div>
                      </div>    
                      {app.credentials.map((credential) =>
                        <div>
                          <div class="form-input-container form-ic1">
                            <input id="appname" class="form-input" type={keyInputType} placeholder=" " value={credential.consumerKey} disabled></input>
                            <div class="form-cut"></div>
                            <button onClick={() => copyTextToClipboard(credential.consumerKey)} style={{position: "absolute", right: "6px", top: "11px", width: "auto", height: "26px", marginTop: "0px", backgroundColor: "#33363A"}}  class="form-submit">
                              <img src={copyIcon}></img>
                            </button>
                            <button onClick={() => toggleKeyType()} style={{position: "absolute", right: "40px", top: "11px", width: "auto", height: "26px", marginTop: "0px", backgroundColor: "#33363A"}} class="form-submit">
                              <img src={keyInputIcon}></img>
                            </button>                            
                            <label for="appname" class="form-placeholder">Key</label>
                          </div>
                          <div class="form-input-container form-ic1">
                            <input id="appname" class="form-input" type={secretInputType} placeholder=" " value={credential.consumerSecret} disabled></input>
                            <div class="form-cut"></div>
                            <button onClick={() => copyTextToClipboard(credential.consumerSecret)} style={{position: "absolute", right: "6px", top: "11px", width: "auto", height: "26px", marginTop: "0px", backgroundColor: "#33363A"}}  class="form-submit">
                              <img src={copyIcon}></img>
                            </button>
                            <button onClick={() => toggleSecretType()} style={{position: "absolute", right: "40px", top: "11px", width: "auto", height: "26px", marginTop: "0px", backgroundColor: "#33363A"}} class="form-submit">
                              <img src={secretInputIcon}></img>
                            </button>   
                            <label for="appname" class="form-placeholder">Secret</label>
                          </div>
                        </div>
                      )}
                    </div>
                  }
                  <br/>
                  <div class="form-title">APIs</div>
                  <br/>
                  <table style={{textAlign: "left", tableLayout: "fixed"}}>
                    <colgroup>
                      <col span="1" style={{width: "25%"}} />
                      <col span="1" style={{width: "75%"}} />
                      <col span="1" style={{width: "20%"}} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Active</th>
                            {/* <th>Actions</th> */}
                        </tr>
                    </thead>
                    <tbody>
                      {props.apis.map((product, index) => 
                        <tr>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>
                            <label htmlFor={"material-switch-" + index}>
                              <Switch
                                checked={apiStatus[product.name]}
                                onChange={(e) => clickProduct(product.name, e)}
                                onColor="#6163FF"
                                onHandleColor="#5658DD"
                                handleDiameter={30}
                                uncheckedIcon={false}
                                checkedIcon={false}
                                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                height={20}
                                width={48}
                                className="react-switch"
                                id={"material-switch-" + index}
                              />
                            </label>
                            </td>
                            {/* {apiStatus[product.name]
                            ? <td>Active</td>
                            : <td>Inactive</td>
                            }

                            {apiStatus[product.name]
                            ? <td><button style={{height: "26px", width: "73px", marginTop: "0px"}} class="form-submit" onClick={() => clickProduct(product.name)}>Disable</button></td>
                            : <td><button style={{height: "26px", width: "73px", marginTop: "0px"}} class="form-submit" onClick={() => clickProduct(product.name)}>Enable</button></td>
                            } */}
                        </tr>
                      )}
                    </tbody>
                  </table>                  
                  <button type="text" class="form-submit" onClick={() => saveApp()}>Save</button>
                </div>
              
              </div>
              <div class="tiles-wrap">

              </div>
            </div>

          </div>
          
        </div>
      </section>
    </>
  );
}

export default AppDetail;