import React, { useState, useEffect } from 'react';
// import sections
import Hero from '../components/sections/Hero';
import FeaturesTiles from '../components/sections/FeaturesTiles';
import FeaturesSplit from '../components/sections/FeaturesSplit';
import Testimonial from '../components/sections/Testimonial';
import Cta from '../components/sections/Cta';

import { getDeveloper, createDeveloper } from '../utils/DataService.mjs'

import firebase from 'firebase/app'

var firebaseui = require('firebaseui');

const SignIn = (props) => {
  const [ui, setUI] = useState();
  //setUI(props.ui);

  useEffect(() => {
    if (!ui) {
      var uiConfig = {
        callbacks: {
          signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.

            return true;


          },
          uiShown: function() {
            // The widget is rendered.
            // Hide the loader.
            //document.getElementById('loader').style.display = 'none';
          }
        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
        signInSuccessUrl: '/apis',
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        tosUrl: '<your-tos-url>',
        // Privacy policy url.
        privacyPolicyUrl: '<your-privacy-policy-url>'
      };
      
      props.ui.start('#firebaseui-auth-container', uiConfig);

      setUI(props.ui);
    }
  }, ui);

  return (
    <>
      <section className="testimonial section center-content illustration-section-01">
        <div className="container">
          <div className="testimonial-inner section-inner">
            <div className="testimonial-content">
            <h1 class="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">Sign <span class="text-color-primary">in</span></h1>
              <div className="container-xs">
                <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
                  Embrace the API revolution with React web templates connected to Apigee X 🚀.
                </p>
              </div>
              <div class="tiles-wrap">
                <div id="firebaseui-auth-container"></div>
              </div>
            </div>

          </div>
          
        </div>
      </section>
    </>
  );
}

export default SignIn;