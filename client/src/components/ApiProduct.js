import React from 'react';

const ApiProduct = (props) => {

  return (
    <div className="tiles-item" data-reveal-delay="200">
      <div className="tiles-item-inner">
        {/* <img src="https://static.vecteezy.com/system/resources/previews/002/492/189/original/saas-software-as-a-service-line-icon-with-cloud-vector.jpg" alt="Avatar" style={{borderRadius: "50%", height: "150px", width: "150px"}} /> */}
        <img src="/static/media/logo.2810a88b.svg" alt="Avatar" style={{borderRadius: "50%", height: "150px", width: "150px"}} />
        <div className="apiproduct-item-content">
          <p className="text-sm mb-0">
            {props.description}
              </p>
        </div>
        <div className="testimonial-item-footer text-xs mt-32 mb-0 has-top-divider">
          <span className="testimonial-item-name text-color-high">Docs</span>
          <span className="text-color-low"> / </span>
          <span className="testimonial-item-link">
            <a href={"/apis/" + props.name}>{props.name}</a>
          </span>
        </div>
      </div>
    </div>
  );  
}

export default ApiProduct;