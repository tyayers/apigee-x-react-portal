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

import ApiProduct from '../components/elements/ApiProduct';

const Apis = ({
  apis,
  hideEmptyApis
}) => {

  const [products, setProducts] = useState([]);

  const [productList, setProductList] = useState([]);
  const [categoryProductList, setCategoryProductList] = useState({});

  const [filterText, setFilterText] = useState("");
  const [selectedCategories, setSelectedCategories] = useState({});
  const [selectedProtocols, setSelectedProtocols] = useState({});

  useEffect(() => {
    if (productList.length == 0 && apis && apis.length > 0) {
      for (var apiIndex in apis) {
        let api = apis[apiIndex];
        if (api.type && !(api.type in Object.keys(selectedProtocols))) {
          var newProtocols = selectedProtocols;
          newProtocols[api.type] = true
          setSelectedProtocols(newProtocols);
        }

        if (api.categories) {
          for (var catIndex in api.categories) {
            var catName = api.categories[catIndex];
  
            if (! (catName in Object.keys(selectedCategories))) {
              var newSelectedCategories = selectedCategories;
              newSelectedCategories[catName] = true;
              setSelectedCategories(newSelectedCategories);
            }
          }
        }       
      }
    }
  });

  useEffect(() => {
    console.log('Do something after state has changed');
    buildApiList();
  }, [apis, filterText, selectedProtocols, selectedCategories]);

  const filterApis = function(filterText, selProtocols, selCategories) {
    setFilterText(filterText);
    setSelectedProtocols(selProtocols);
    setSelectedCategories(selCategories);
  }

  function buildApiList() {
    setProductList(apis.map((api) => {
      if (checkApiToDisplay(api)
        && (!api.categories || api.categories.length == 0)) {
        return getProductFormatted(api);        
      }
    }));

    var newCategoryProductList = {};
    for (var apiIndex in apis) {
      var api = apis[apiIndex];
      if (checkApiToDisplay(api)
        && (api.categories && api.categories.length > 0)) {

        for (var catIndex in api.categories) {
          var catName = api.categories[catIndex];

          if (! (newCategoryProductList[catName])) 
            newCategoryProductList[catName] = [ getProductFormatted(api) ];
          else
            newCategoryProductList[catName].push(getProductFormatted(api));
        }
      }
    }

    setCategoryProductList(newCategoryProductList);
  }

  function checkApiToDisplay(api) {
    let result = false;
    if (api.access === "public"
      && api.name.toLowerCase().includes(filterText.toLowerCase())
      && (!api.type || Object.keys(selectedProtocols).length == 0 || selectedProtocols[api.type])) {
        if (api.categories && api.categories.length > 0 && Object.keys(selectedCategories).length > 0) {
          for (var cat in api.categories) {
            if (selectedCategories[api.categories[cat]]) {
              result = true;
              break;
            }
          }
        }
        else
          result = true;
      }

    return result;
  }

  function getProductFormatted(api) {
    var path = "/apis/";
    var type = api.type ? api.type.toLowerCase() : "rest";

    if (type == "graphql") path = "/gqlapis/";

    if (api.specUrl) 
      return <Link to={path + api.name}><ApiProduct className="features-tiles-item-image mb-16" data-reveal-delay="400" name={api.name} type={type} description={api.description} image={api.imageUrl} /></Link>
    else if (!hideEmptyApis)
      return <ApiProduct className="features-tiles-item-image mb-16" data-reveal-delay="400" name={api.name} type={type} description={api.description} image={api.imageUrl} />
  }

  function getProductCategoriesList() {
    return Object.keys(categoryProductList).map((category) => 
      selectedCategories[category] &&
        <div>
          <h3>{category} <span class="text-color-primary">APIs</span></h3>
          <div class="container tiles-wrap" style={{textAlign: "center"}}>
            {categoryProductList[category]}
          </div>
        </div>
    );
  }

  return (
    <>
      <section className="testimonial section center-content illustration-section-01">
        <div className="container">
          <div className="testimonial-inner section-inner">
            <div className="testimonial-content  reveal-from-bottom">
              <h1 class="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">Cloud10X <span class="text-color-primary">APIs</span></h1>
              <div className="container-xs">
                <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
                  Embrace the API revolution with React web templates connected to Apigee X 🚀.
                </p>
              </div>
              
              <div className="container-xs">
                <SearchInput filterCallback={filterApis} protocols={selectedProtocols} categories={selectedCategories}></SearchInput>
              </div>

              <div class="container tiles-wrap" style={{textAlign: "center"}}>
                {productList}
              </div>

              {getProductCategoriesList()}
            </div>

          </div>
          
        </div>
      </section>
    </>
  );
}

export default Apis;