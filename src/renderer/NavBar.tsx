import { NavLink } from 'react-router-dom';
import { cn } from './lib/utils';

const navBarPaths = {
  '/registration': 'Registration',
  '/models': 'Models',
  '/jobs': 'Jobs',
};

function NavBar() {
  return (
    <div className="p-2 ml-2 flex flex-row space-x-4">
      {Object.entries(navBarPaths).map(([path, name]) => (
        <div key={path} className="border-2 border-black w-1/3 rounded-lg">
          <NavLink
            key={path}
            to={path}
            className={({ isActive, isPending }) =>
              cn(
                'px-8 py-2 text-center flex items-center justify-center rounded-lg transition-all',
                isPending ? 'bg-gray-50' : 'hover:bg-gray-100',
                isActive ? 'bg-sky-300 hover:bg-sky-200' : '',
              )
            }
          >
            <span
              key={path}
              className="text-sm md:text-lg lg:text-xl xl:text-2xl font-bold"
            >
              {name}
            </span>
          </NavLink>
        </div>
      ))}
    </div>
  );
}

export default NavBar;
