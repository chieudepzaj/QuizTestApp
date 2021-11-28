import React from 'react';
import '@fontsource/roboto';
import 'src/styles/_app.scss';
import 'src/styles/_base.scss';
import { Routes, Route } from 'react-router-dom';
import routers from 'src/routes/routes';
import PrivateRoute from './routes/PrivateRoute';

const App: React.FC = () => {
  return (
    <div className="App">
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
  );
};

export default App;
