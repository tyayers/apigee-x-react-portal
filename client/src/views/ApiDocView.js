import React, { useState, useEffect } from 'react';
import 'rapidoc'; 
// import sections
import Hero from '../components/sections/Hero';
import FeaturesTiles from '../components/sections/FeaturesTiles';
import FeaturesSplit from '../components/sections/FeaturesSplit';
import Testimonial from '../components/sections/Testimonial';
import Cta from '../components/sections/Cta';

const ApiDocView = (props) => {
  const [apiName, setApiName] = useState(props.match.params.api == undefined ? "" : props.match.params.api);
  const [apiProduct, setApiProduct] = useState(undefined);
  const [apiProductSpec, setApiProductSpec] = useState();
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    if (!apiProduct && props.apis && props.apis.length > 0) {
      for(const api in props.apis) {
        if (props.apis[api].name === apiName) {
          setApiProduct(props.apis[api]);
          setApiProductSpec(props.apis[api].specUrl);
        }
      }
    }

    if (!apiKey && props.apps && props.apps.length > 0) {
      var key = "";
      for (var appIndex in props.apps) {
        if (props.apps[appIndex].credentials) {
          for (var credIndex in props.apps[appIndex].credentials) {
            for (var apiProdIndex in props.apps[appIndex].credentials[credIndex].apiProducts) {
              if (props.apps[appIndex].credentials[credIndex].apiProducts[apiProdIndex].apiproduct == apiName) {
                // YES WE FOUND IT, WOOPEE!!!
                key = props.apps[appIndex].credentials[credIndex].consumerKey;
                setApiKey(key);
                break;
              }
            }
          }
        }
      }
    }    
  });  

  return (
    <>
      <section className="testimonial section center-content illustration-section-01">
        <div className="container" style={{height: "auto"}}>
          <div className="testimonial-inner section-inner">
            <div className="testimonial-content  reveal-from-bottom">
              <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">Explore <span className="text-color-primary">{apiName}</span></h1>
              <div className="container-xs">
                <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
                  Embrace the API revolution with React web templates connected to Apigee X 🚀.
                </p>
              </div>
            </div>
          </div>
            <rapi-doc
              spec-url={apiProductSpec}
              show-header = 'false'
              show-info = 'true'
              api-key-name = 'x-api-key'
              api-key-location = 'header'
              api-key-value = {apiKey}
              allow-authentication ='true'
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