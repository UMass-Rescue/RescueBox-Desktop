import { NavLink } from 'react-router-dom';
import React, { ReactNode } from 'react';
import { cn } from './lib/utils';

export function RegularTitleNavBar({
  path,
  name,
}: {
  path: string;
  name: string;
}) {
  return (
    <span key={path} className="relative sm:text-lg lg:text-xl font-bold">
      <span className="absolute hidden group-[.is-active]:block -bottom-2 sm:-bottom-2 lg:-bottom-3 inset-x-0 bg-sky-500 h-0.5 rounded-full transition-opacity duration-150" />
      {name}
    </span>
  );
}

export function ImageTitleNavBar({ path }: { path: string }) {
  return (
    <span key={path} className="relative sm:text-lg lg:text-xl font-bold">
      <span className="absolute hidden group-[.is-active]:block -bottom-2 inset-x-0 bg-sky-500 h-0.5 rounded-full transition-opacity duration-150" />
      <svg
        className="size-7 sm:size-8 lg:size-9 group-[.is-active]:fill-sky-500"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512.015 512.015"
        xmlSpace="preserve"
      >
        <g>
          <g>
            <circle cx="69.818" cy="69.826" r="11.636" />
          </g>
        </g>
        <g>
          <g>
            <circle cx="116.364" cy="69.826" r="11.636" />
          </g>
        </g>
        <g>
          <g>
            <path
              d="M290.909,465.462h-2.141c-4.817-13.51-17.617-23.273-32.768-23.273h-23.273V407.28c0-6.423-5.213-11.636-11.636-11.636
			c-6.423,0-11.636,5.213-11.636,11.636v34.909h-23.273c-15.151,0-27.951,9.763-32.768,23.273H81.455
			c-6.423,0-11.636,5.213-11.636,11.636c0,6.423,5.213,11.636,11.636,11.636h71.959c4.817,13.51,17.617,23.273,32.768,23.273H256
			c15.151,0,27.951-9.763,32.768-23.273h2.153c6.423,0,11.625-5.213,11.625-11.636C302.545,470.675,297.332,465.462,290.909,465.462
			z M256,488.735h-69.818c-6.412,0-11.636-5.225-11.636-11.636s5.225-11.636,11.636-11.636H256c6.412,0,11.636,5.225,11.636,11.636
			S262.412,488.735,256,488.735z"
            />
          </g>
        </g>
        <g>
          <g>
            <path
              d="M372.364,58.189H209.455c-6.423,0-11.636,5.213-11.636,11.636s5.213,11.636,11.636,11.636h162.909
			c6.435,0,11.636-5.213,11.636-11.636S378.799,58.189,372.364,58.189z"
            />
          </g>
        </g>
        <g>
          <g>
            <circle cx="69.818" cy="302.553" r="11.636" />
          </g>
        </g>
        <g>
          <g>
            <circle cx="116.364" cy="302.553" r="11.636" />
          </g>
        </g>
        <g>
          <g>
            <path
              d="M325.818,290.917H209.455c-6.423,0-11.636,5.213-11.636,11.636s5.213,11.636,11.636,11.636h116.364
			c6.435,0,11.636-5.213,11.636-11.636S332.253,290.917,325.818,290.917z"
            />
          </g>
        </g>
        <g>
          <g>
            <circle cx="69.818" cy="186.189" r="11.636" />
          </g>
        </g>
        <g>
          <g>
            <circle cx="116.364" cy="186.189" r="11.636" />
          </g>
        </g>
        <g>
          <g>
            <path
              d="M372.364,174.553H209.455c-6.423,0-11.636,5.213-11.636,11.636s5.213,11.636,11.636,11.636h162.909
			c6.435,0,11.636-5.213,11.636-11.636S378.799,174.553,372.364,174.553z"
            />
          </g>
        </g>
        <g>
          <g>
            <path
              d="M430.545,93.098c6.435,0,11.636-5.213,11.636-11.636V34.917c0-19.247-15.663-34.909-34.909-34.909H34.909
			C15.663,0.007,0,15.67,0,34.917v93.091v0.012v69.807c0,6.423,5.213,11.636,11.636,11.636s11.636-5.213,11.636-11.636v-58.17
			l395.636-0.012v93.091l-407.273,0.012C5.213,232.746,0,237.959,0,244.383v93.079c0,19.247,15.663,34.909,34.909,34.909h232.727
			c6.423,0,11.636-5.213,11.636-11.636s-5.213-11.636-11.636-11.636H34.909c-6.412,0-11.636-5.225-11.636-11.636v-81.443
			l395.636-0.012v46.545c0,6.423,5.201,11.636,11.636,11.636s11.636-5.213,11.636-11.636v-58.182V128.007
			c0-3.084-1.222-6.051-3.409-8.227c-2.188-2.176-5.132-3.409-8.227-3.409l-407.273,0.012V34.917
			c0-6.412,5.225-11.636,11.636-11.636h372.364c6.423,0,11.636,5.225,11.636,11.636v46.545
			C418.909,87.885,424.111,93.098,430.545,93.098z"
            />
          </g>
        </g>
        <g>
          <g>
            <path
              d="M459.811,414.553c9.367,0,18.723-3.561,25.856-10.682c0.012-0.012,0.023-0.035,0.035-0.058
			c0.012-0.012,0.012-0.012,0.023-0.012l22.935-23.273c4.515-4.573,4.468-11.939-0.116-16.454
			c-4.596-4.515-11.951-4.468-16.454,0.128l-22.842,23.18c-0.012,0.012-0.023,0.012-0.035,0.023c-5.178,5.178-13.615,5.178-18.793,0
			c-2.513-2.502-3.898-5.841-3.898-9.391c0-3.549,1.385-6.889,3.898-9.391l23.215-22.877c4.585-4.515,4.62-11.881,0.116-16.454
			c-4.492-4.585-11.857-4.62-16.454-0.128l-23.273,22.935c-0.012,0.012-0.012,0.023-0.023,0.035
			c-0.012,0.012-0.023,0.012-0.035,0.023c-6.912,6.912-10.717,16.093-10.717,25.856c0,5.737,1.455,11.194,3.933,16.175
			l-15.139,15.139c-3.584-1.28-7.389-1.827-11.194-1.676l-23.668-23.645l15.046-15.046c4.55-4.55,4.55-11.904,0-16.454
			l-23.273-23.273c-4.55-4.55-11.904-4.55-16.454,0l-46.545,46.545c-3.119,3.119-4.201,7.727-2.804,11.904l11.636,34.909
			c1.268,3.828,4.433,6.714,8.367,7.645c0.884,0.209,1.78,0.314,2.665,0.314c3.049,0,6.028-1.199,8.227-3.409l26.682-26.682
			l18.164,18.164l-44.719,44.719c-5.388,5.388-8.355,12.544-8.355,20.154s2.967,14.778,8.355,20.154
			c5.388,5.388,12.544,8.355,20.154,8.355c7.61,0,14.778-2.967,20.143-8.355l44.73-44.719l49.664,49.664
			c2.269,2.269,5.248,3.409,8.227,3.409c2.979,0,5.958-1.14,8.227-3.409c4.55-4.55,4.55-11.904,0-16.454l-54.912-54.912
			c0.023-0.489,0.14-0.954,0.14-1.455c0-3.526-0.698-6.935-1.92-10.135l15.023-15.023
			C448.745,413.145,454.249,414.553,459.811,414.553z M352.512,375.78c0,0,0,0-0.012,0c-0.012,0,0,0,0,0.012l-21.597,21.585
			l-3.409-10.228l33.233-33.233l6.819,6.819L352.512,375.78z M405.737,439.49l-47.732,47.721c-1.315,1.327-2.862,1.524-3.677,1.524
			c-0.815,0-2.362-0.198-3.7-1.536c-1.327-1.338-1.536-2.897-1.536-3.7c0-0.815,0.209-2.374,1.536-3.7l47.732-47.721
			c1.315-1.326,2.862-1.524,3.677-1.524c0.815,0,2.362,0.198,3.7,1.536c1.327,1.327,1.536,2.886,1.536,3.689
			C407.273,436.592,407.063,438.151,405.737,439.49z"
            />
          </g>
        </g>
      </svg>
    </span>
  );
}

interface NavBarItemProps {
  path: string;
  // eslint-disable-next-line react/require-default-props
  children?: ReactNode; // Special prop to allow nested children
}

// eslint-disable-next-line react/function-component-definition
export const NavBarItem: React.FC<NavBarItemProps> = ({
  path,
  children = undefined,
}) => {
  return (
    <NavLink
      key={path}
      to={path}
      className={({ isActive }) =>
        cn(
          'group px-4 py-2 text-center hover:bg-slate-200 rounded-md flex items-center justify-center transition-all',
          isActive ? 'is-active text-blue-500 hover:text-blue-400' : '',
        )
      }
    >
      {children}
    </NavLink>
  );
};
