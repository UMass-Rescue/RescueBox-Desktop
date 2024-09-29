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
import JobViewLayout from './JobViewLayout';
import JobViewDetails from './JobViewDetails';
import JobViewOutputs from './JobViewOutputs';

function RootLayout() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between border-b-2 border-black bg-gray-300">
        <NavBar />
        <h1 className="p-3 m-3 text-lg md:text-2xl lg:text-3xl  font-bold">
          RescueBox
        </h1>
      </div>
      <div className="h-svh bg-gray-100 pt-2">
        <div className="mx-4">
          <Outlet />
        </div>
      </div>
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
          <Route path="/models" element={<Models />}>
            <Route
              path="/models/:modelUid/details"
              element={<ModelDetails />}
            />
            <Route path="/models/:modelUid/run" element={<ModelRun />} />
          </Route>
          <Route path="/jobs/:jobId" element={<JobViewLayout />}>
            <Route path="/jobs/:jobId/details" element={<JobViewDetails />} />
            <Route path="/jobs/:jobId/outputs" element={<JobViewOutputs />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
