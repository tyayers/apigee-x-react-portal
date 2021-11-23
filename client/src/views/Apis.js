import React, { useState, useEffect } from 'react';

// import sections
import Hero from '../components/sections/Hero';
import FeaturesTiles from '../components/sections/FeaturesTiles';
import FeaturesSplit from '../components/sections/FeaturesSplit';
import Testimonial from '../components/sections/Testimonial';
import Cta from '../components/sections/Cta';
import { Link } from 'react-router-dom';
import SearchInput from '../components/elements/SearchInput';

import apiIcon from '../assets/images/api_icon.svg';

import ApiProduct from '../components/ApiProduct';

const Apis = ({
  apis,
  hideEmptyApis
}) => {

  const [products, setProducts] = useState([]);

  const [productList, setProductList] = useState([]);

  // const [productList, setProductList] = useState(apis.map((api) => {
  //   if (api.access === "public") {
  //     if (api.specUrl) 
  //       return <Link to={"/apis/" + api.name}><ApiProduct className="features-tiles-item-image mb-16" data-reveal-delay="400" name={api.name} description={api.description} image={api.imageUrl} /></Link>
  //     else if (!hideEmptyApis)
  //       return <ApiProduct className="features-tiles-item-image mb-16" data-reveal-delay="400" name={api.name} description={api.description} image={api.imageUrl} />
  //   }
  // }));

  // const productList = apis.map((api) => {
  //   if (api.access === "public") {
  //     if (api.specUrl) 
  //       return <Link to={"/apis/" + api.name}><ApiProduct className="features-tiles-item-image mb-16" data-reveal-delay="400" name={api.name} description={api.description} image={api.imageUrl} /></Link>
  //     else if (!hideEmptyApis)
  //       return <ApiProduct className="features-tiles-item-image mb-16" data-reveal-delay="400" name={api.name} description={api.description} image={api.imageUrl} />
  //   }
  // });

  useEffect(() => {
    if (productList.length == 0 && apis) {
      setProductList(apis.map((api) => {
        if (api.access === "public") {
          if (api.specUrl) 
            return <Link to={"/apis/" + api.name}><ApiProduct className="features-tiles-item-image mb-16" data-reveal-delay="400" name={api.name} description={api.description} image={api.imageUrl} /></Link>
          else if (!hideEmptyApis)
            return <ApiProduct className="features-tiles-item-image mb-16" data-reveal-delay="400" name={api.name} description={api.description} image={api.imageUrl} />
        }
      }));
    }
  });

  const filterApis = function(filterText) {
    setProductList(apis.map((api) => {
      if (api.access === "public" && api.name.toLowerCase().includes(filterText.toLowerCase())) {
        if (api.specUrl) 
          return <Link to={"/apis/" + api.name}><ApiProduct className="features-tiles-item-image mb-16" data-reveal-delay="400" name={api.name} description={api.description} image={api.imageUrl} /></Link>
        else if (!hideEmptyApis)
          return <ApiProduct className="features-tiles-item-image mb-16" data-reveal-delay="400" name={api.name} description={api.description} image={api.imageUrl} />
      }
    }));
  }

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
              
              <div className="container-xs">
                <SearchInput filterCallback={filterApis}></SearchInput>
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