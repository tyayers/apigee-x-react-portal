import React, {useState, useEffect} from 'react'
import { CopyBlock, atomOneDark } from "react-code-blocks";
import FeaturesSplit from '../components/sections/FeaturesSplit';

export function YourSubscriptions({

}) {

  return (
    <>
      <section className="testimonial section center-content illustration-section-01">
        <div className="container">
          <div className="testimonial-inner section-inner">
            <div className="testimonial-content  reveal-from-bottom">
              <h1 class="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">Your <span class="text-color-primary">Subscriptions</span></h1>

                <div className="container-xs">
                  <p>
                    <h2>Coming Soon!</h2>
                    Self-service management of your subscriptions is coming, stay tuned!
                  </p>
                </div>
              </div>
            </div>
          </div>
      </section>
    </>
  );
}