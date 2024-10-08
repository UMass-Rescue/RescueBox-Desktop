/* eslint-disable react/no-unescaped-entities */
import {
  MemoryRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import './App.css';
import { ErrorBoundary } from 'react-error-boundary';
import { ChevronLeftIcon } from '@radix-ui/react-icons';
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
import FallbackError from './components/FallbackError';
import RegistrationIcon from './components/RegistrationIcon';
import LogsIcon from './components/LogsIcon';
import AuditLogs from './AuditLogs';

function RootLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="title-bar bg-gray-700 h-[30.4px] top-0 sticky z-10" />
      <div className="flex flex-row bg-gray-100 pt-1">
        <div className="flex-grow items-center flex ml-6">
          <button
            type="button"
            aria-label="Back"
            className="group disabled:pointer-events-none disabled:bg-transparent px-2 py-2 text-center hover:bg-slate-200 rounded-md flex items-center justify-center transition-all"
            onClick={() => location.pathname !== '/models' && navigate(-1)}
            disabled={location.pathname === '/models'}
          >
            <ChevronLeftIcon className="font-bold text-blue-500 group-disabled:text-gray-500 size-5 sm:size-6 lg:size-7" />
          </button>
          <NavBar />
        </div>
        <div className="pr-2 flex flex-row">
          <NavBarItem path="/logs">
            <ImageTitleNavBar path="/logs">
              <LogsIcon className="fill-black group-[.is-active]:fill-blue-500" />
            </ImageTitleNavBar>
          </NavBarItem>
          <NavBarItem path="/registration">
            <ImageTitleNavBar path="/registration">
              <RegistrationIcon className="group-[.is-active]:fill-blue-500" />
            </ImageTitleNavBar>
          </NavBarItem>
        </div>
      </div>
      <hr className="h-[0.75px] border-t-0 bg-gray-300 dark:bg-white/10" />
      <div className="flex-1 flex flex-col bg-gray-100 pt-2">
        <div className="flex-1 mx-4 flex flex-col">
          <ErrorBoundary FallbackComponent={FallbackError}>
            <Outlet />
          </ErrorBoundary>
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
          <Route path="/logs" element={<AuditLogs />} />
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
