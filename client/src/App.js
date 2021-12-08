import React, { useRef, useEffect, useState } from 'react';
import { useLocation, Switch, useHistory } from 'react-router-dom';
import AppRoute from './utils/AppRoute';
import ScrollReveal from './utils/ScrollReveal';
import ReactGA from 'react-ga';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getApiProducts, getApps, getDeveloper, createDeveloper } from './utils/DataService.mjs';

// Layouts
import LayoutDefault from './layouts/LayoutDefault';

// Views 
import Home from './views/Home';
import SignIn from './views/SignIn';
import YourApps from './views/YourApps';
import AppDetail from './views/AppDetail';
import Apis from './views/Apis';
import ApiDocView from './views/ApiDocView';
import ApiDocGQLView from './views/ApiDocGQLView';
import { Webhooks } from './views/Webhooks';
import { Pricing } from './views/Pricing';
import { Documentation } from './views/Documentation';
import { YourSubscriptions } from './views/YourSubscriptions';
import { YourHooks } from './views/YourHooks';

// Import the functions you need from the SDKs you need
import firebase from 'firebase/app'
import { getConfig } from './utils/DataService.mjs';
var firebaseui = require('firebaseui');

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPGPFRTmRSdUvGK0LBt_EA3DmP5glyQ1U",
  authDomain: "bruno-1407a.firebaseapp.com",
  databaseURL: "https://bruno-1407a.firebaseio.com",
  projectId: "bruno-1407a",
  storageBucket: "bruno-1407a.appspot.com",
  messagingSenderId: "541397649480",
  appId: "1:541397649480:web:db7de60ee861a0fbe8b07d"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
var fbui = new firebaseui.auth.AuthUI(firebase.auth());

// Initialize Google Analytics
ReactGA.initialize(process.env.REACT_APP_GA_CODE);

const trackPage = page => {
  ReactGA.set({ page });
  ReactGA.pageview(page);
};

const App = () => {
  const [user, setUser] = useState();
  const [state, setState] = useState("startup");
  const [config, setConfig] = useState({});
  const [apiProducts, setApiProducts] = useState([]);
  const [apps, setApps] = useState([]);

  const history = useHistory();
  const childRef = useRef();
  let location = useLocation();

  const showToast = function(message) {
    toast.success(message);
  };

  useEffect(() => {
    if (!user) {

      getConfig().then((result) => {
        setConfig(result);
      });

      getApiProducts().then((result) => {
        setApiProducts(result.apiproducts);
      });

      firebase.auth().onAuthStateChanged((updatedUser) => {

        setUser(updatedUser);

        if (updatedUser) {
          setState("signed-in");

          getDeveloper(updatedUser.email).then((result) => {
            if (result.error && result.error.code == 404) {
              // developer doesn't exist in Apigee, so create...
              createDeveloper(updatedUser.email, updatedUser.displayName, updatedUser.displayName).then((result) => {
                console.log("Created developer");
                getApps(updatedUser.email).then((result) => {
                  setApps(result.apps);
                }); 
              }).catch((error) => {
                console.error(error);
              });
            }
            else {
              getApps(updatedUser.email).then((result) => {
                setApps(result.apps);
              }); 
            }
          }).catch((error) => {
            console.log(error);
          })
        }
        else {
          setState("signed-out");
          history.push("/");
        }
      });
    }
  }, [user]);

  useEffect(() => {
    const page = location.pathname;
    document.body.classList.add('is-loaded')
    childRef.current.init();
    trackPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  function signOut() {
    firebase.auth().signOut();
  }

  function getAppState() {

  }

  return (
    <>
      <ScrollReveal
        ref={childRef}
        children={() => (
          <Switch>
            <AppRoute exact path="/" component={Home} layout={LayoutDefault} user={user} signOut={signOut} state={state}/>
            <AppRoute exact path="/sign-in" component={SignIn} fb={app} ui={fbui} layout={LayoutDefault}  state={state}/>
            <AppRoute exact path="/apps" component={YourApps} layout={LayoutDefault} user={user} apps={apps} signOut={signOut} state={state}/>
            <AppRoute exact path="/new-app" component={AppDetail} layout={LayoutDefault} user={user} apps={apps} apis={apiProducts} signOut={signOut} toast={showToast} state={state}/>
            <AppRoute exact path="/apps/:app" component={AppDetail} layout={LayoutDefault} user={user} apis={apiProducts} apps={apps} signOut={signOut} toast={showToast} state={state}/>
            <AppRoute exact path="/apis" component={Apis} layout={LayoutDefault} hideEmptyApis={config.hideApisWithoutSpecs} user={user} apis={apiProducts} signOut={signOut} state={state}/>
            <AppRoute exact path="/apis/:api" component={ApiDocView} layout={LayoutDefault} user={user} apis={apiProducts} signOut={signOut} state={state}/>
            <AppRoute exact path="/gqlapis/:api" component={ApiDocGQLView} layout={LayoutDefault} user={user} apis={apiProducts} signOut={signOut} state={state}/>
            <AppRoute exact path="/webhooks" component={Webhooks} layout={LayoutDefault} user={user} state={state}/>
            <AppRoute exact path="/pricing" component={Pricing} layout={LayoutDefault} user={user} state={state}/>
            <AppRoute exact path="/docs" component={Documentation} layout={LayoutDefault} user={user} state={state}/>
            <AppRoute exact path="/hooks" component={YourHooks} layout={LayoutDefault} user={user} state={state}/>
            <AppRoute exact path="/subscriptions" component={YourSubscriptions} layout={LayoutDefault} user={user} state={state}/>
          </Switch>
        )} />
        <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;