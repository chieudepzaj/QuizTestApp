import React from 'react';
import 'src/styles/_app.scss';
import { Routes, useLocation, Route } from 'react-router-dom';
import routers from 'src/routes/routes';
import PrivateRoute from './routes/PrivateRoute';

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="Navbar"></div>

      <div className="Content">
        <React.Suspense fallback={<div>....Loading</div>}>
          <Routes>
            {Object.values(routers).map((route) => {
              //@ts-ignore
              return (
                <Route
                  key={route.path}
                  element={route.private ? <PrivateRoute component={route.component} /> : <route.component />}
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
