import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getApps } from '../utils/DataService.mjs';

// import sections
import Hero from '../components/sections/Hero';
import FeaturesTiles from '../components/sections/FeaturesTiles';
import FeaturesSplit from '../components/sections/FeaturesSplit';
import Testimonial from '../components/sections/Testimonial';
import Cta from '../components/sections/Cta';

const Apps = (props) => {
  const [apps, setApps] = useState([]);
  


  useEffect(() => {
    if (props.user) {
      getApps(props.user.email).then((result) => {
        setApps(result.apps);
      });
    }
  }, [props.user]);

  return (
    <>
      <section className="testimonial section center-content illustration-section-01">
        <div className="container">
          <div className="testimonial-inner section-inner">
            <div className="testimonial-content  reveal-from-bottom">
              <h1 class="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">Your <span class="text-color-primary">Apps</span></h1>
              <div className="container-xs">
                <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
                  Embrace the API revolution with React web templates connected to Apigee X 🚀.
                </p>
                <div style={{display: "flex", alignContent: "space-between", justifyContent: "space-between"}}>
                  {/* <h3 class="mt-0 mb-16 reveal-from-bottom" style={{textAlign: "left"}} data-reveal-delay="200"><span class="text-color-primary">Apps</span></h3> */}
                  <span class="form-title">Apps</span>
                  <Link to="/apps/new" style={{height: "30px", width: "60px", marginTop: "34px"}} className="form-submit">Add</Link>
                </div>
                <br/>
                <table style={{textAlign: "left"}}>
                  <thead>
                      <tr>
                          <th>Name</th>
                          <th>Description</th>
                          <th>Created on</th>
                      </tr>
                  </thead>
                  <tbody>
                    {/* <div class="lds-ripple"><div></div><div></div></div> */}
                    {apps.map((app) =>
                      <tr>
                          <td><a href={"/apps/" + app.name}>{app.name}</a></td>
                          <td>{app.description}</td>
                          <td>Sep 20, 2021</td>
                      </tr>
                    )}
                  </tbody>
                </table>
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

export default Apps;