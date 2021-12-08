import React, {useState, useEffect} from 'react'
import { CopyBlock, atomOneDark } from "react-code-blocks";
import FeaturesSplit from '../components/sections/FeaturesSplit';

export function Documentation({

}) {

  return (
    <>
      <section className="testimonial section center-content illustration-section-01">
        <div className="container">
          <div className="testimonial-inner section-inner">
            <div className="testimonial-content  reveal-from-bottom">
              <h1 class="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">Cloud10X <span class="text-color-primary">Docs</span></h1>

                <div className="container-xs">
                  <p>
                    <h2>Get Started</h2>
                    It's easy to get started using Cloud10X APIs and Events, and build out your own AI-powered industry API ecosystem hub.
                  </p>
                </div>
                <FeaturesSplit invertMobile topDivider imageFill className="illustration-section-02" />
                <br/>
                <div className="container-xs">
                  Sign-in and start for free!
                </div>
              </div>
            </div>
          </div>
      </section>
    </>
  );
}