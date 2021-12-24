import React, { useEffect, useState } from 'react';
import '@fontsource/roboto';
import 'src/styles/_app.scss';
import 'src/styles/_base.scss';
import { Routes, Route, useLocation } from 'react-router-dom';
import routers from 'src/routes/routes';
import PrivateRoute from './routes/PrivateRoute';
import Navbar from './layouts/nav-bar';
import Sidebar from './layouts/side-bar';
import routePath from './constants/routePath';

const App: React.FC = () => {
  const location = useLocation();
  const [isRenderNavbar, setIsRenderNavbar] = useState(false);
  const [isRenderSidebar, setIsRenderSidebar] = useState(false);

  useEffect(() => {
    if ([routePath.SIGN_IN].includes(location.pathname)) {
      setIsRenderNavbar(false);
    } else setIsRenderNavbar(true);

    if ([routePath.SIGN_IN, routePath.QUIZ].includes(location.pathname)) {
      setIsRenderSidebar(false);
    } else setIsRenderSidebar(true);
  }, [location.pathname]);

  return (
    <div
      className={`App
    ${isRenderSidebar || isRenderNavbar ? ' App-grid' : ''}
    ${isRenderNavbar ? ' App-grid-nav-bar' : ''}
    ${isRenderSidebar ? ' App-grid-side-bar' : ''}
    `}
    >
      {isRenderNavbar && (
        <div className="nav-bar">
          <Navbar />
        </div>
      )}

      {isRenderSidebar && (
        <div className="side-bar">
          <Sidebar />
        </div>
      )}

      <div className="content">
        <React.Suspense fallback={<div>....Loading</div>}>
          <Routes>
            {Object.values(routers).map((route) => {
              //@ts-ignore
              return (
                <Route
                  key={route.path}
                  element={route.private ? <PrivateRoute Component={route.component} /> : <route.component />}
                  {...route}
                />
              );
            })}
          </Routes>
        </React.Suspense>
      </div>
    </div>
  );
};

export default App;
