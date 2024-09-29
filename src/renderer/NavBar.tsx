import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@shadcn/components/ui/navigation-menu';
import { Link } from 'react-router-dom';
import { cn } from './lib/utils';

function NavBar() {
  return (
    <NavigationMenu className="p-2 ml-2">
      <NavigationMenuList className="gap-3">
        <NavigationMenuItem className="border-2 border-black  rounded-lg">
          <Link
            to="/registration"
            className={cn(
              navigationMenuTriggerStyle(),
              'bg-gray-50 px-4 py-6 text-center flex items-center justify-center',
              'focus:bg-sky-300',
            )}
          >
            <span className="text-sm md:text-lg lg:text-xl xl:text-2xl">
              Registration{' '}
            </span>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="border-2 border-black  rounded-lg">
          <Link
            to="/models"
            className={cn(
              navigationMenuTriggerStyle(),
              'bg-gray-50 px-4 py-6 text-center flex items-center justify-center',
              'focus:bg-sky-300',
            )}
          >
            <span className="text-sm md:text-lg lg:text-xl xl:text-2xl">
              Models
            </span>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="border-2 border-black  rounded-lg">
          <Link
            to="/jobs"
            className={cn(
              navigationMenuTriggerStyle(),
              'bg-gray-50 px-4 py-6 text-center flex items-center justify-center',
              'focus:bg-sky-300',
            )}
          >
            <span className="text-sm md:text-lg lg:text-xl xl:text-2xl">
              Jobs
            </span>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default NavBar;
