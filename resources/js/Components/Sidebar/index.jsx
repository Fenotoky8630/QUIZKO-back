import React, { useEffect, useRef, useState } from 'react';
import { Link } from '@inertiajs/react';
import {
  BuildingOfficeIcon,
  ChartPieIcon,
  UserGroupIcon,
  UsersIcon,
  QuestionMarkCircleIcon,
  AcademicCapIcon,
  DocumentTextIcon, 
  FaceSmileIcon,
  ClipboardDocumentCheckIcon
} from "@heroicons/react/24/outline";

import ApplicationLogo from '../ApplicationLogo';
import LogoutConfirmation from '../LogoutConfirmation';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/20/solid';

const Sidebar = ({ sidebarOpen}) => {
  const sidebarRef = useRef(null);
  const [confirmingUserLogout, setConfirmingUserLogout] = useState(false);

  const confirmUserDeletion = () => {
    setConfirmingUserLogout(true);
  };

  const [sidebarExpanded, setSidebarExpanded] = useState(
    localStorage.getItem('sidebar-expanded') === 'true'
  );

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebarRef}
      className={`fixed left-0 top-0 z-50 h-full w-64 bg-white text-gray-300 shadow-lg transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-center py-1">
        <Link href="/">
          <ApplicationLogo />
        </Link>
      </div>

      {/* Menu */}
      <nav className="px-4 py-2 border-t border-gray-100 shadow-sm">
        <h3 className="mb-4 text-sm font-semibold uppercase text-gray-500">Menu</h3>
        <ul className="space-y-2">
          {sidebarItems.map(({ href, icon: Icon, text }, index) => (
            <SidebarItem key={index} href={href} icon={Icon} text={text} />
          ))}
          
          <button 
            onClick={confirmUserDeletion}
            className="flex items-center space-x-2 px-4 py-2 text-red-400 hover:text-red-800"
        >
            <ArrowLeftOnRectangleIcon className="w-6 h-6" />
            <span>Déconnexion</span>
        </button>

        </ul>
      </nav>

      <LogoutConfirmation
        confirmingLogout={confirmingUserLogout}
        closeModal={() => setConfirmingUserLogout(false)}
      />
    </aside>
  );
};

const SidebarItem = ({ href, icon: Icon, text }) => {
  const isActive = route().current()?.includes(href.replace('.index', '')) ||route().current()?.includes('student_answers') && href === 'results.index';
  //const isActive = route().current()?.includes('student_answers') && href === 'results.index';
  return (
    <li>
      <Link
            href={route(href)}
            className={`flex items-center gap-3 rounded-md px-4 py-2 text-gray-500 transition-all duration-200 hover:bg-purple-900 hover:text-white ${
             isActive ? 'bg-purple-950 text-white' : ''
          }`}
           >
        <Icon className="h-6 w-6" />
        <span className="">{text}</span> 
      </Link>
    </li>
  );
};

const sidebarItems = [
  { href: 'dashboard', icon: ChartPieIcon, text: 'Tableau de bord' },
  { href: 'departments.index', icon: BuildingOfficeIcon, text: 'Département' },
  { href: 'professors.index', icon: UsersIcon, text: 'Enseignants' },
  { href: 'levels.index', icon: AcademicCapIcon, text: 'Classes' },
  { href: 'students.index', icon: UserGroupIcon, text: 'Étudiants' },
  { href: 'questions.index', icon: QuestionMarkCircleIcon, text: 'Question&Réponse' },
  { href: 'subjects.index', icon: DocumentTextIcon, text: 'Sujets' },  
  { href: 'tests.index', icon: ClipboardDocumentCheckIcon, text: 'Tests' },      
  { href: 'results.index', icon: FaceSmileIcon, text: 'Résultats' },    
];

export default Sidebar;
