import React, { useState, useEffect } from 'react';

const ApiDocGQLView = (props) => {
  const [apiName, setApiName] = useState(props.match.params.api == undefined ? "" : props.match.params.api);
  const [apiProduct, setApiProduct] = useState(undefined);
  const [apiProductSpec, setApiProductSpec] = useState();

  useEffect(() => {
    if (!apiProduct && props.apis && props.apis.length > 0) {
      for(const api in props.apis) {
        if (props.apis[api].name === apiName) {
          setApiProduct(props.apis[api]);
          setApiProductSpec(props.apis[api].specUrl);
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
                  Bring new flexibility to your developer integrations with GraphQL .
                </p>
              </div>
            </div>
          </div>
          <div className="container">
            <iframe style={{width: "100%", height: "800px", border: "0px", borderRadius: "44px"}} src={apiProductSpec}>

            </iframe>
          </div>
        </div>
      </section>
    </>
  );
}

export default ApiDocGQLView;