import React, {useState, useEffect} from 'react'
import { CopyBlock, atomOneDark } from "react-code-blocks";

export function Pricing({

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

  const pricing = [
    {
      name: "Developer",
      description: "This starter plan allows for 100 calls per hour for free, with automatic throttling being applied."
    },
    {
      name: "Business",
      description: "The business plan allows for unlimited consumption at only $10 per 1,000 calls."
    },
    {
      name: "Enterprise",
      description: "Unlimited calls for a monthly flat fee (get in touch with sales for details)."
    }
  ];
  
  return (
    <>
      <section className="testimonial section center-content illustration-section-01">
        <div className="container">
          <div className="testimonial-inner section-inner">
            <div className="testimonial-content  reveal-from-bottom">
              <h1 class="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">Cloud10X <span class="text-color-primary">Pricing</span></h1>

                <div className="container-xs">
                  <p>
                    Our simple and transparent pricing makes it simple to start for free, and grow with your user base.
                  </p>
                  
                  <h3>Pricing Tiers</h3>
                </div>
                <div class="tiles-wrap">
                  {pricing.map((item) =>
                    <div className="tiles-item" data-reveal-delay="200">
                      <div className="tiles-item-inner">

                        <div className="testimonial-item-footer text-xs mt-4 mb-16">
                          <span className="testimonial-item-link" style={{fontSize: "27px"}}>
                            {item.name}
                          </span>
                        </div>
                        <div className="">
                          <p className="text-sm mb-0" style={{height: "82px", overflow: "hidden", textOverflow: "ellipsis"}}>
                            {item.description}
                          </p>
                          <button type="text" class="form-submit" onClick={() => console.log("hi")}>Subscribe</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <br/>
                <div className="container-xs">
                  After subscribing you can manage your subscription in your profile under <b>Your Subscriptions</b>
                </div>
              </div>
            </div>
          </div>
      </section>
    </>
  );
}