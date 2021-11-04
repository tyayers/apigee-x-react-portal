import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function LayoutDefault(props) {

  return(
    <>
      <Header navPosition="right" className="reveal-from-bottom" signOut={props.children.props.signOut} user={props.children.props.user} state={props.children.props.state}/>
      <main className="site-content">
        {props.children}
      </main>
      <Footer />
    </>
  )
}
// const LayoutDefault = ({ children }) => (

//   <>
//     <Header navPosition="right" className="reveal-from-bottom" signOut={} />
//     <main className="site-content">
//       {children}
//     </main>
//     <Footer />
//   </>
// );

//export default LayoutDefault;  