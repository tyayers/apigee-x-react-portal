import React, { useState, useEffect } from 'react';
import { Provider } from "react-redux";
import {Playground, store} from 'graphql-playground-react';
import { Link } from 'react-router-dom';

const ApiDocGQLView = (props) => {
  const [apiName, setApiName] = useState(props.match.params.api == undefined ? "" : props.match.params.api);
  const [apiProduct, setApiProduct] = useState(undefined);
  const [apiProductSpec, setApiProductSpec] = useState();
  const [apiKey, setApiKey] = useState("");
  const [testQuery, setTestQuery] = useState("");

  const [tabConfig, setTabConfig] = useState([]);

  useEffect(() => {
    if (!apiProduct && props.apis && props.apis.length > 0) {
      for(const api in props.apis) {
        if (props.apis[api].name === apiName) {
          setApiProduct(props.apis[api]);
          setApiProductSpec(props.apis[api].specUrl);

          for (var attrIndex in props.apis[api].attributes) {
            if (props.apis[api].attributes[attrIndex].name == "testQuery") {
              setTestQuery(props.apis[api].attributes[attrIndex].value);
            }
          }
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
          <div className="testimonial-inner section-inner" style={{paddingBottom: "0px"}}>
            <div className="testimonial-content  reveal-from-bottom">
              <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">Explore <span className="text-color-primary">{apiName}</span></h1>
              <div className="container-xs">
                <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
                  Bring new flexibility to your apps with GraphQL 🚀
                </p>
              </div>
            </div>
          </div>
          <div className="container">
            {props.state == "signed-out" &&
              <div>Only registered users can explore this API. <br/> Register for free <Link to="/sign-in"><span className="text-color-primary">here.</span></Link><br/><br/></div>
            }
            {!apiKey && props.apps &&
              <div>You don't yet have an app with access to this API. <br/> Manage your apps <Link to="/apps"><span className="text-color-primary">here.</span></Link><br/><br/></div>
            }
            { apiKey &&
                <div style={{border: "0px", borderRadius: "44px", overflow: "hidden", textAlign: "left"}}>
                  <Provider store={store}>
                    <Playground endpoint={apiProductSpec} tabs={[{
                      query: testQuery,
                      endpoint: apiProductSpec,
                      headers: {
                        "x-api-key": apiKey
                      }
                    }]} />
                  </Provider>
                </div>
            }
          </div>
        </div>
      </section>
    </>
  );
}

export default ApiDocGQLView;