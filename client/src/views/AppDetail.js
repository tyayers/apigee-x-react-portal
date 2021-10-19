import React, { useState, useEffect } from 'react';
import { getApiProducts, updateApp } from '../utils/DataService.mjs';
// import sections
import Hero from '../components/sections/Hero';
import FeaturesTiles from '../components/sections/FeaturesTiles';
import FeaturesSplit from '../components/sections/FeaturesSplit';
import Testimonial from '../components/sections/Testimonial';
import Cta from '../components/sections/Cta';
import { map } from 'lodash';
import { getApp } from '../utils/DataService.mjs';

const AppDetail = (props) => {
  const [apis, setApis] = useState([]);
  const [appName, setAppName] = useState(props.match.params.app == undefined ? "" : props.match.params.app);  
  const [isNewApp, setIsNewApp] = useState(appName == undefined ? true : false);

  const [apiStatus, setApiStatus] = useState({});

  const [app, setApp] = useState({
    name: appName,
    description: ""
  });

  useEffect(() => {
    if (props.user) {
      getApiProducts().then((result) => {
        setApis(result.apiproducts);
      }).catch((error) => {
        console.error(error);
      });

      if (!isNewApp) {
        getApp(props.user.email, appName).then((result) => {
          setApp(result);
        }).catch((error) => {
          console.error(error);
        });
      }   
    }
  }, [props.user]);

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

  function clickProduct(name) {
    var newStatus = JSON.parse(JSON.stringify(apiStatus));
    if (newStatus[name])
      newStatus[name] = false;
    else
      newStatus[name] = true;

    setApiStatus(newStatus);
  }

  function saveApp() {
    app.apiProducts = [];

    for (const [key, value] of Object.entries(apiStatus)) {
      if (value)
        app.apiProducts.push(key);
    }
    
    if(!isNewApp) {
      var response = updateApp(props.user.email, app.name, app);
    }
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
                  <div class="form-title">Overview</div>
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
                        <span class="form-title">Credentials</span>
                        {/* <button style={{height: "22px", width: "60px", marginTop: "34px"}} class="form-submit">Add</button> */}
                      </div>
                      {app.credentials.map((credential) =>
                        <div>
                          <div class="form-input-container form-ic1">
                            <input id="appname" class="form-input" type="text" placeholder=" " value={credential.consumerKey}></input>
                            <div class="form-cut"></div>
                            <button style={{position: "absolute", right: "6px", top: "-10px", width: "auto", height: "26px", marginTop: "0px"}} class="form-submit">copy</button>
                            <label for="appname" class="form-placeholder">Key</label>
                          </div>
                          <div class="form-input-container form-ic1">
                            <input id="appname" class="form-input" type="text" placeholder=" " value={credential.consumerSecret}></input>
                            <div class="form-cut"></div>
                            <button style={{position: "absolute", right: "6px", top: "-10px", width: "auto", height: "26px", marginTop: "0px"}} class="form-submit">copy</button>
                            <label for="appname" class="form-placeholder">Secret</label>
                          </div>
                        </div>
                      )}
                    </div>
                  }
                  <br/>
                  <div class="form-title">APIs</div>
                  <br/>
                  <table style={{textAlign: "left"}}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                      {apis.map((product) => 
                        <tr>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            {apiStatus[product.name]
                            ? <td>Active</td>
                            : <td>Inactive</td>
                            }

                            {apiStatus[product.name]
                            ? <td><button style={{height: "26px", width: "73px", marginTop: "0px"}} class="form-submit" onClick={() => clickProduct(product.name)}>Disable</button></td>
                            : <td><button style={{height: "26px", width: "73px", marginTop: "0px"}} class="form-submit" onClick={() => clickProduct(product.name)}>Enable</button></td>
                            }
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