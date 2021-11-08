import React from 'react';
import apiIcon from '../assets/images/api_icon.svg';

const ApiProduct = (props) => {

  return (
    <div className="tiles-item" data-reveal-delay="200">
      <div className="tiles-item-inner" style={{borderRadius: "12%"}}>

      <div className="testimonial-item-footer text-xs mt-4 mb-16">
          {/* <span className="testimonial-item-name text-color-high">Docs</span> */}
          {/* <span className="text-color-low"> / </span> */}
          <span className="testimonial-item-link" style={{fontSize: "27px"}}>
            {props.name}
          </span>
        </div>

        {props.image
        ? <img src={props.image} alt="Avatar" style={{borderRadius: "50%", height: "150px", width: "150px"}} />
        : <img src={apiIcon} alt="Avatar" style={{borderRadius: "50%", height: "150px", width: "150px"}} />
        }
        <div className="apiproduct-item-content">
          <p className="text-sm mb-0" style={{height: "82px", overflow: "hidden", textOverflow: "ellipsis"}}>
            {props.description}
          </p>
        </div>

      </div>
    </div>
  );  
}

export default ApiProduct;