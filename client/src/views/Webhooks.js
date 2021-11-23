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
                {/* <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
                  Embrace the API revolution with React web templates connected to Apigee X 🚀.
                </p> */}

                <div style={{}}>
                  {/* <h1>Real-Time Events</h1> */}

                  <div  style={{textAlign: "left"}}>
                    <p>
                      Webhooks provide real-time integration to data events from our platform. You can easily subscribe and manage your subscriptions.
                    </p>

                    <h3>Webhook topics</h3>
                    <ul>
                      <li>suppliers</li>
                      <li>customers</li>
                      <li>orders</li>
                    </ul>
                    <h3>Create Webhook Subscription</h3>

                    To subscribe to a topic, simply POST a subscription messge to this endpoint using your API key:
                    <br/><br/>
                    <div>
                      <CopyBlock text={subscribeCall} language={"bash"} theme={irBlack} copyBlock />
                    </div>
                    <br/>
                    You will receive back a confirmation of the subscription with a subscription Id:
                    <br/><br/>
                    <div>
                      <CopyBlock text={`{
   "subscriptionId": "jSX86HMgW2O78TJ1"
 }`
                      } language={"json"} theme={irBlack} copyBlock />
                    </div>

                    <h3>Receive Webhook Event</h3>

                    The events follow the cloudevents schema for each topic.
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