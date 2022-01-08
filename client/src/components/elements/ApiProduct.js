import React from 'react';
import apiIcon from '../../assets/images/api_icon.svg';

const ApiProduct = (props) => {

  const typeTagStyle = {
    textAlign: "right"
  }

  const graphQlLabelStyle = {
    background: "#DE33A6",
    padding: "5px",
    fontSize: "15px",
    fontWeight: "bold",
    borderRadius: "14px"
  }  

  const restLabelStyle = {
    background: "#5658DD",
    padding: "5px",
    fontSize: "15px",
    fontWeight: "bold",
    borderRadius: "14px"
  }

  return (
    <div className="tiles-item" data-reveal-delay="200">
      <div className="tiles-item-inner" style={{borderRadius: "12%"}}>

      {props.type && props.type.toLowerCase() == "graphql"
      ?
      <div style={typeTagStyle}>
        <span style={graphQlLabelStyle}>{props.type}</span>
      </div>
      :
      <div style={typeTagStyle}>
        <span style={restLabelStyle}>{props.type}</span>
      </div>      
      }

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