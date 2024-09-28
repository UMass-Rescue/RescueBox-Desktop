import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@shadcn/components/ui/navigation-menu';
import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <NavigationMenu className="p-2 ml-2">
      <NavigationMenuList className="gap-3">
        <NavigationMenuItem className="border-2 border-black p-1 pb-2 rounded-lg">
          <Link to="registration">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <span className="text-sm md:text-lg lg:text-xl xl:text-2xl">
                Registration{' '}
              </span>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="border-2 border-black p-1 pb-2 rounded-lg">
          <Link to="models">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <span className="text-sm md:text-lg lg:text-xl xl:text-2xl">
                Models
              </span>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="border-2 border-black p-1 pb-2 rounded-lg">
          <Link to="jobs">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <span className="text-sm md:text-lg lg:text-xl xl:text-2xl">
                Jobs
              </span>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default NavBar;
