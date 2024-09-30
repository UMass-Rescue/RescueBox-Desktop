/* eslint-disable react/no-unescaped-entities */
import {
  MemoryRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
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
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row border-b-2 border-black bg-gray-300">
        <div className="flex-grow items-center flex">
          <NavBar />
        </div>
        <h1 className="p-3 m-3 flex-grow-0 flex items-center justify-center text-lg md:text-2xl lg:text-3xl font-bold">
          RescueBox
        </h1>
      </div>
      <div className="flex-1 bg-gray-100 pt-2">
        <div className="mx-4">
          <Outlet />
        </div>
      </div>
      <div className="bottom-0 sticky bg-gray-700 text-gray-50 h-4" />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Navigate to="/registration" replace />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/models" element={<Models />} />
          <Route path="/model-details" element={<ModelDetails />} />
          <Route path="/model-run" element={<ModelRun />} />
          <Route path="/jobs/:jobId" element={<JobViewLayout />}>
            <Route path="/jobs/:jobId/details" element={<JobViewDetails />} />
            <Route path="/jobs/:jobId/outputs" element={<JobViewOutputs />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
