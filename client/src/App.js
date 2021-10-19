import React, { useRef, useEffect, useState } from 'react';
import { useLocation, Switch, useHistory } from 'react-router-dom';
import AppRoute from './utils/AppRoute';
import ScrollReveal from './utils/ScrollReveal';
import ReactGA from 'react-ga';

// Layouts
import LayoutDefault from './layouts/LayoutDefault';

// Views 
import Home from './views/Home';
import SignIn from './views/SignIn';
import Apps from './views/Apps';
import AppDetail from './views/AppDetail';
import Apis from './views/Apis';
import ApiDocView from './views/ApiDocView';

// Import the functions you need from the SDKs you need
import firebase from 'firebase/app'
var firebaseui = require('firebaseui');

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZ1cFRg67OYBUdPhlO3xoluL8J_dRfHxM",
  authDomain: "apigee-react-portal.firebaseapp.com",
  projectId: "apigee-react-portal",
  storageBucket: "apigee-react-portal.appspot.com",
  messagingSenderId: "934753593195",
  appId: "1:934753593195:web:3845dc382bce2b10438e2e",
  measurementId: "G-RDJS0VD7B8"
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
  const history = useHistory();
  const childRef = useRef();
  let location = useLocation();

  useEffect(() => {
    if (!user) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setUser(user);
          //history.push("/apis");
        } else {
          // User is signed out
          history.push("/");
          // ...
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

  return (
    <ScrollReveal
      ref={childRef}
      children={() => (
        <Switch>
          <AppRoute exact path="/" component={Home} layout={LayoutDefault} user={user}/>
          <AppRoute exact path="/sign-in" component={SignIn} fb={app} ui={fbui} layout={LayoutDefault} />
          <AppRoute exact path="/apps" component={Apps} layout={LayoutDefault} user={user}/>
          <AppRoute exact path="/apps/new" component={AppDetail} layout={LayoutDefault} user={user}/>
          <AppRoute exact path="/apps/:app" component={AppDetail} layout={LayoutDefault} user={user}/>
          <AppRoute exact path="/apis" component={Apis} layout={LayoutDefault} user={user}/>
          <AppRoute exact path="/apis/:api" component={ApiDocView} layout={LayoutDefault}/>
        </Switch>
      )} />
  );
}

export default App;