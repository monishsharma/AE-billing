import { useEffect, useRef, useState } from 'react'
import './App.css';
import SideBar from "./shared/components/sidebar"
import Layout from './shared/components/layout';
import { isMobileDevice } from "./helpers/is-mobile-device";
import { Outlet } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { getVendorList } from './store/config/action';
import { connect } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import { ToastContainer } from 'react-toastify';


const  App = ({getVendorListConnect}) =>  {

  const scrollableDivRef = useRef(null);
  const [isActive, setIsActive] = useState(isMobileDevice() ? true : false);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    return () => {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto';
      }
    };
  }, []);


      useEffect(() => {
          getVendorListConnect();
      }, [getVendorListConnect]);

  const toggleNavigation = () => {
    setIsActive(!isActive);
  };

  const handleScroll = () => {
    if (scrollableDivRef.current && scrollableDivRef.current.scrollTop > 1) {
      localStorage.setItem("scroll", scrollableDivRef.current.scrollTop)
    }
  };

  return (
    <>
      <ToastContainer />
      <Layout>
        <SideBar isActive={isActive} toggleNavigation={setIsActive} onClick={toggleNavigation}/>
        <div className={isActive ? "main active bigmain" : "main smallmain"}>
          <div className="topbar">
            <div className="toggle" onClick={toggleNavigation}>
              <MenuIcon />
            </div>
          </div>
          <div
            className="scrollableDiv"
            ref={scrollableDivRef}
            onScroll={handleScroll}
          >
            <Outlet context={{ref: scrollableDivRef}} />
          </div>
        </div>
      </Layout>
    </>
  )
}

const mapStateToProps = ({
  config
}) => ({config});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getVendorListConnect: getVendorList
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(App);

