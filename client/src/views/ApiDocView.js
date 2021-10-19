import React, { useState, useEffect } from 'react';
import 'rapidoc'; 
// import sections
import Hero from '../components/sections/Hero';
import FeaturesTiles from '../components/sections/FeaturesTiles';
import FeaturesSplit from '../components/sections/FeaturesSplit';
import Testimonial from '../components/sections/Testimonial';
import Cta from '../components/sections/Cta';

import ApiProduct from '../components/ApiProduct';

const ApiDocView = (props) => {
  const [loaded, setLoaded] = useState(false);
  const [apis, setApis] = useState([]);
  const [apiName, setApiName] = useState(props.match.params.api);  

  useEffect(() => {
    if (!loaded) {
      fetch('/config')
      .then(response => response.json())
      .then(data => {
        setApis(data.apis);
        setLoaded(true);
      }).catch(error => {
        console.error(error);
        fetch('/testdata/apiproducts.json')
        .then(response => response.json())
        .then(data => {
          setApis(data);
          setLoaded(true);
        }).catch(error => {
          console.log(error);
          setLoaded(true);
        });
      });
    }
  }, loaded);  

  return (
    <>
      <section className="testimonial section center-content illustration-section-01">
        <div className="container" style={{height: "auto"}}>
          <div className="testimonial-inner section-inner">
            <div className="testimonial-content  reveal-from-bottom">
              <h1 class="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">Explore <span class="text-color-primary">{apiName}</span></h1>
              <div className="container-xs">
                <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
                  Embrace the API revolution with React web templates connected to Apigee X 🚀.
                </p>
              </div>
            </div>
          </div>
          <rapi-doc
            spec-url="https://raw.githubusercontent.com/mrin9/RapiDoc/master/docs/specs/petstore_extended.yaml"
            show-header = 'false'
            show-info = 'false'
            allow-authentication ='false'
            allow-server-selection = 'false'
            allow-api-list-style-selection ='false'
            theme = 'dark'
            bg-color = '#151719'
            primary-color = '#6163FF'
            render-style = "view"
            style = {{ textAlign: "left" }}
            class = "reveal-from-bottom" 
            data-reveal-delay="200"
          > </rapi-doc>
        </div>
      </section>
    </>
  );
}

export default ApiDocView;