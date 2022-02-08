import React, { useState, useEffect } from 'react'
import { render } from "react-dom";
import Highlight, { defaultProps } from "prism-react-renderer";
import CodePurple from '../assets/themes/CodePurple';
import copyIcon from '../assets/images/copy_icon.png'
// import { CopyBlock, atomOneDark } from "react-code-blocks";
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import atomDark from 'react-syntax-highlighter/dist/esm/styles/prism/atom-dark';
// import Highlight from 'react-highlight.js';
// import Highlight from 'react-highlight'

export function EventDetails({
  match,
  events,
  toast
}) {

  const [eventName, seteventName] = useState(match.params.event == undefined ? "" : match.params.event.charAt(0).toUpperCase() + match.params.event.slice(1));
  const [event, setevent] = useState();
  const [subscribeCall, setSubscribeCall] = useState(`curl -X POST 
'https://test.apigee.hybrid.cloud10x.net/events/subscriptions'
--header "x-api-key: YOUR_API_KEY"
--data
{
  "topic": "${eventName.toLowerCase()}",
  "pushConfig": 
      "pushEndpoint": "YOUR_ENDPOINT"
  }
}`);
  const [subscribeResponse, setSubscribeResponse] = useState(`{
  "subscriptionId": "gzAe0sgSVED6P2UO"
}`);
  const [deleteRequest, setDeleteRequest] = useState(`curl -X DELETE 
'https://test.apigee.hybrid.cloud10x.net/events/subscriptions/YOUR_SUBSCRIPTION_ID'
 --header "x-api-key: YOUR_API_KEY"`);

  useEffect(() => {
    if (!event && events && events.length > 0) {
      for (var apiIndex in events) {
        let api = events[apiIndex];
        if (api.name.toLowerCase() === eventName.toLowerCase()) {
          setevent(api);
        }
      }
    }
  });

  const codeBlockStyle = {
    borderRadius: "54px"
  }

  function copyTextToClipboard(text) {
    var textArea = document.createElement("textarea");

    // Place in the top-left corner of screen regardless of scroll position.
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;

    // Ensure it has a small width and height. Setting to 1px / 1em
    // doesn't work as this gives a negative w/h on some browsers.
    textArea.style.width = '2em';
    textArea.style.height = '2em';

    // We don't need padding, reducing the size if it does flash render.
    textArea.style.padding = 0;

    // Clean up any borders.
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';

    // Avoid flash of the white box if rendered for any reason.
    textArea.style.background = 'transparent';


    textArea.value = text;

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Copying text command was ' + msg);
    } catch (err) {
      console.log('Oops, unable to copy');
    }

    document.body.removeChild(textArea);

    if (toast) toast("Copied!");
  }

  return (
    <>
      <section className="testimonial section center-content illustration-section-01">
        <div className="container">
          <div className="testimonial-inner section-inner">
            <div className="testimonial-content  reveal-from-bottom">
              <h1 class="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">{eventName} <span class="text-color-primary">Event</span></h1>

              <div className="container-xs">
                <p>
                  {event &&
                    event.description
                  }
                </p>

              </div>

              <div className="container-xs">
                <h3>Subscribe</h3>
                <div>
                  To subscribe to {eventName} events, simply POST a subscription messge to this endpoint using your API key:
                  <br /><br />
                  <div style={{ textAlign: "left", position: "relative" }}>
                    <Highlight {...defaultProps} code={subscribeCall} language="js" theme={CodePurple}>
                      {({ className, style, tokens, getLineProps, getTokenProps }) => (
                        <pre className={className} style={Object.assign(codeBlockStyle, style)}>
                          {tokens.map((line, i) => (
                            <div {...getLineProps({ line, key: i })}>
                              {line.map((token, key) => (
                                <span {...getTokenProps({ token, key })} />
                              ))}
                            </div>
                          ))}
                        </pre>
                      )}
                    </Highlight>
                    <button onClick={() => copyTextToClipboard(subscribeCall)} style={{ position: "absolute", right: "19px", bottom: "21px", width: "50px", height: "35px", marginTop: "0px" }} class="form-submit">
                      <img src={copyIcon}></img>
                    </button>
                  </div>
                  <br />
                  You will receive back a confirmation of the subscription with a subscription Id:
                  <br /><br />
                  <div style={{ textAlign: "left", position: "relative" }}>
                    <Highlight {...defaultProps} code={subscribeResponse} language="javascript" theme={CodePurple}>
                      {({ className, style, tokens, getLineProps, getTokenProps }) => (
                        <pre className={className} style={{borderRadius: "54px", background: "#25282c"}} >
                          {tokens.map((line, i) => (
                            <div {...getLineProps({ line, key: i })}>
                              {line.map((token, key) => (
                                <span {...getTokenProps({ token, key })} />
                              ))}
                            </div>
                          ))}
                        </pre>
                      )}
                    </Highlight>
                    <button onClick={() => copyTextToClipboard(subscribeResponse)} style={{ position: "absolute", right: "19px", bottom: "21px", width: "50px", height: "35px", marginTop: "0px" }} class="form-submit">
                      <img src={copyIcon}></img>
                    </button>
                  </div>
                  <h3>Receive Events</h3>
                  <div>
                  You will receive events pushed to your endpoint
                  </div>
                  <h3>Delete Subscription</h3>
                  <div>
                  You can delete your subscription by like this:
                  <br /><br />
                  <div style={{ textAlign: "left", position: "relative" }}>
                    <Highlight {...defaultProps} code={deleteRequest} language="js" theme={CodePurple}>
                      {({ className, style, tokens, getLineProps, getTokenProps }) => (
                        <pre className={className} style={{borderRadius: "54px", background: "#25282c"}}>
                          {tokens.map((line, i) => (
                            <div {...getLineProps({ line, key: i })}>
                              {line.map((token, key) => (
                                <span {...getTokenProps({ token, key })} />
                              ))}
                            </div>
                          ))}
                        </pre>
                      )}
                    </Highlight>
                    <button onClick={() => copyTextToClipboard(subscribeCall)} style={{ position: "absolute", right: "19px", bottom: "21px", width: "50px", height: "35px", marginTop: "0px" }} class="form-submit">
                      <img src={copyIcon}></img>
                    </button>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}