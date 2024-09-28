/* eslint-disable react/no-unescaped-entities */
import {
  MemoryRouter as Router,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';

import './App.css';
import Jobs from './Jobs';
import Models from './Models';
import NavBar from './NavBar';
import Registration from './Registration';
import ModelDetails from './ModelDetails';
import ModelRun from './ModelRun';

function RootLayout() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-between border-b-2 border-black">
        <NavBar />
        <h1 className="p-3 text-sm md:text-lg lg:text-xl xl:text-2xl m-3">
          RescueBox
        </h1>
      </div>
      <Outlet />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/registration" element={<Registration />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/models" element={<Models />} />
          <Route path="/model-details" element={<ModelDetails />} />
          <Route path="/model-run" element={<ModelRun />} />
        </Route>
      </Routes>
    </Router>
  );
}
