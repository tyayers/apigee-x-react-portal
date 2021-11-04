import React, { useState, useEffect } from 'react';

// import sections
import Hero from '../components/sections/Hero';
import FeaturesTiles from '../components/sections/FeaturesTiles';
import FeaturesSplit from '../components/sections/FeaturesSplit';
import Testimonial from '../components/sections/Testimonial';
import Cta from '../components/sections/Cta';
import { Link } from 'react-router-dom';

import apiIcon from '../assets/images/api_icon.svg';

import ApiProduct from '../components/ApiProduct';

const Apis = (props) => {
  // const [apisLoaded, setApisLoaded] = useState(false);
  // const [apis, setApis] = useState([]);

  // useEffect(() => {
  //   if (!apisLoaded) {
  //     getApiProducts().then((result) => {
  //       setApis(result.apiproducts);
  //       setApisLoaded(true);
  //     });
  //   }
  // }, apisLoaded);

  const productList = props.apis.map((api) => {
    if (api.access === "public") {
      if (api.specUrl) 
        return <Link to={"/apis/" + api.name}><ApiProduct className="features-tiles-item-image mb-16" data-reveal-delay="400" name={api.name} description={api.description} image={api.imageUrl} /></Link>
      else
        return <ApiProduct className="features-tiles-item-image mb-16" data-reveal-delay="400" name={api.name} description={api.description} image={api.imageUrl} />
    }
  });

  return (
    <>
      <section className="testimonial section center-content illustration-section-01">
        <div className="container">
          <div className="testimonial-inner section-inner">
            <div className="testimonial-content  reveal-from-bottom">
              <h1 class="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">Our <span class="text-color-primary">APIs</span></h1>
              <div className="container-xs">
                <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
                  Embrace the API revolution with React web templates connected to Apigee X 🚀.
                </p>
              </div>
              <div class="tiles-wrap">
                {productList}
              </div>
            </div>

          </div>
          
        </div>
      </section>
    </>
  );
}

export default Apis;