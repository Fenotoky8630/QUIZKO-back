import ApplicationLogo from '../ApplicationLogo';
import DropdownUser from './DropdownUser';
import { Link } from '@inertiajs/react';

const Header = (props) => {
  return (
    <header className="stick top-0 border-b border-purple-200 flex w-full bg-white drop-shadow-1 text-black">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* Hamburger Toggle BTN */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-[99999] block rounded-sm border border-stroke text-purple-950 p-2 shadow-sm lg:hidden"
          >
            {/* Simple hamburger icon */}
            <span className="block w-6 h-0.5 bg-purple-950 my-1"></span>
            <span className="block w-6 h-0.5 bg-purple-950 my-1"></span>
            <span className="block w-6 h-0.5 bg-purple-950 my-1"></span>
          </button>
          {/* Hamburger Toggle BTN */}

          <Link className="block flex-shrink-0 lg:hidden" href="/">
            <ApplicationLogo />
          </Link>
        </div>

        {/* Move DropdownUser to the right */}
        <div className="flex items-center gap-3 2xsm:gap-7 ml-auto">
          <DropdownUser user={props.user} />
        </div>
      </div>
    </header>
  );
};

export default Header;
