import React, {useState, useEffect} from 'react'
import { CopyBlock, irBlack } from "react-code-blocks";

export function Webhooks({

}) {

  const [subscribeCall, setSubscribeCall] = useState(`POST 'https://api-dev.apigee-x.theapishop.com/hooks'
  --header "x-apikey: YOUR_API_KEY"
  --data
  {
    "topic": "suppliers|customers|orders",
    "pushConfig": {
        "pushEndpoint": "YOUR_ENDPOINT"
    }
  }`);
  
  return (
    <>
      <section className="testimonial section center-content illustration-section-01">
        <div className="container">
          <div className="testimonial-inner section-inner">
            <div className="testimonial-content  reveal-from-bottom">
              <h1 class="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">Our <span class="text-color-primary">Webhooks</span></h1>

                <div className="container-xs">
                  <p>
                    Webhooks provide real-time integration to data events from our platform. You can easily subscribe and manage your subscriptions.
                  </p>
                  
                  <h3>Webhook topics</h3>
                </div>
                <div class="tiles-wrap">
                  <div className="tiles-item" data-reveal-delay="200">
                    <div className="tiles-item-inner" style={{borderRadius: "47%"}}>

                      <div className="testimonial-item-footer text-xs mt-4 mb-16">
                        <span className="testimonial-item-link" style={{fontSize: "27px"}}>
                          Suppliers
                        </span>
                      </div>
                      <div className="">
                        <p className="text-sm mb-0" style={{height: "82px", overflow: "hidden", textOverflow: "ellipsis"}}>
                          This topic covers updates of all supplier data, including contact and goods information.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="tiles-item" data-reveal-delay="200">
                    <div className="tiles-item-inner" style={{borderRadius: "47%"}}>
                      <div className="testimonial-item-footer text-xs mt-4 mb-16">
                        <span className="testimonial-item-link" style={{fontSize: "27px"}}>
                          Orders
                        </span>
                      </div>
                      <div className="">
                        <p className="text-sm mb-0" style={{height: "82px", overflow: "hidden", textOverflow: "ellipsis"}}>
                          The Orders topic covers order status updates.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="container-xs">
                  <h3>Create Webhook Subscription</h3>
                  <div>
                    To subscribe to a topic, simply POST a subscription messge to this endpoint using your API key:
                    <br/><br/>
                    <div style={{textAlign: "left"}}>
                      <CopyBlock text={subscribeCall} language={"bash"} theme={irBlack} copyBlock />
                    </div>
                    <br/>
                    You will receive back a confirmation of the subscription with a subscription Id:
                    <br/><br/>
                    <div style={{textAlign: "left"}}>
                      <CopyBlock text={`{
  "subscriptionId": "jSX86HMgW2O78TJ1"
}`
                      } language={"json"} theme={irBlack} copyBlock />
                    </div>
                  </div>                  
                </div>
              </div>
            </div>
          </div>
      </section>
    </>
  );
}