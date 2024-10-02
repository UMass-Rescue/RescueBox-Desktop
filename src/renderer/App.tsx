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
import { ImageTitleNavBar, NavBarItem } from './NavBarItem';

function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="title-bar bg-gray-700 h-[30.4px] top-0 sticky z-10" />
      <div className="flex flex-row bg-gray-100 pt-1">
        <div className="flex-grow items-center flex">
          <NavBar />
        </div>
        <div className="pr-2">
          <NavBarItem path="/registration">
            <ImageTitleNavBar path="/registration" />
          </NavBarItem>
        </div>
      </div>
      <hr className="h-[0.75px] border-t-0 bg-gray-300 dark:bg-white/10" />
      <div className="flex-1 bg-gray-100 pt-2">
        <div className="mx-4">
          <Outlet />
        </div>
      </div>
      <div className="bottom-0 sticky z-10 bg-gray-700 text-gray-50 h-4" />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Navigate to="/models" replace />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/models" element={<Models />} />
          <Route path="/models/:modelUid/details" element={<ModelDetails />} />
          <Route path="/models/:modelUid/run" element={<ModelRun />} />
          <Route path="/jobs/:jobId" element={<JobViewLayout />}>
            <Route path="/jobs/:jobId/details" element={<JobViewDetails />} />
            <Route path="/jobs/:jobId/outputs" element={<JobViewOutputs />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
