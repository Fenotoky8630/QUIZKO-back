import { BookmarkIcon } from "@heroicons/react/24/outline";
import NavLink from "./NavLink";
import {
    BuildingOfficeIcon,
    ChartPieIcon,
    UserGroupIcon,
    UsersIcon,

    QuestionMarkCircleIcon,
    AcademicCapIcon,
    BookOpenIcon,
} from "@heroicons/react/20/solid";

export default function Sidebar({ user }) {
    return (
        <aside
            className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 "
            aria-label="Sidenav"
            id="drawer-navigation"
        >
            <div className="overflow-y-auto h-full bg-gray-100 p-5 ">
                <ul className="space-y-2">
                    <li>
                        <NavLink
                            data-testid="dashboard-link"
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                            className="flex p-2 text-base group"
                        >
                            <ChartPieIcon className="w-6 h-6 text-gray-500 transition duration-75  group-hover:text-gray-900 " />
                            <span className="ml-3">Tableau de bord</span>
                        </NavLink>
                    </li>
                        <li>
                            <NavLink
                                data-testid="department-link"
                                href={route("departments.index")}
                                active={
                                    route().current("departments.index") 
                                }
                                className="flex p-2 text-base group"
                            >
                                <BuildingOfficeIcon className="w-6 h-6 text-gray-500 transition duration-75  group-hover:text-gray-900 " />
                                <span className="ml-3">Département</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                data-testid="professor-link"
                                href={route("professors.index")}
                                active={
                                    route().current("professors.index") 
                                }
                                className="flex p-2 text-base group"
                            >
                                <UsersIcon className="w-6 h-6 text-gray-500 transition duration-75  group-hover:text-gray-900 " />
                                <span className="ml-3">Enseignant</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                data-testid="levels-link"
                                href={route("levels.index")}
                                active={
                                    route().current("levels.index") 
                                }
                                className="flex p-2 text-base group"
                            >
                                <AcademicCapIcon className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 " />
                                <span className="ml-3">Classe</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                data-testid="students-link"
                                href={route("students.index")}
                                active={
                                    route().current("students.index") 
                                }
                                className="flex p-2 text-base group"
                            >
                                <UserGroupIcon className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 " />
                                <span className="ml-3">Etudiant</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                data-testid="question-link"
                                href={route("questions.index")}
                                active={
                                    route().current("questions.index") 
                                }
                                className="flex p-2 text-base group"
                            >
                                <QuestionMarkCircleIcon className="w-6 h-6 text-gray-500 transition duration-75  group-hover:text-gray-900 " />
                                <span className="ml-3">Question & Réponse</span>
                            </NavLink>
                        </li>
                
                        <li>
                            <NavLink
                                data-testid="subject-link"
                                href={route("subjects.index")}
                                active={
                                    route().current("subjects.index") 
                                    }
                                className="flex p-2 text-base group"
                            >
                                <BookOpenIcon className="w-6 h-6 text-gray-500 transition duration-75  group-hover:text-gray-900" />
                                <span className="ml-3">Sujet</span>
                            </NavLink>
                        </li>
                        <li>
                                                        <NavLink
                                                            data-testid="test-link"
                                                            href={route(
                                                                 "tests.index",
                                                             )}
                                                             active={route().current(
                                                             "tests.index",
                                                             )}
                                                            className="flex p-2 text-base group"
                                                        >
                                                            <BookmarkIcon className="w-6 h-6 text-gray-500 transition duration-75  group-hover:text-gray-900" />
                                                            <span className="ml-3">
                                                               Tests
                                                            </span>
                                                        </NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink
                                                            data-testid="test-link"
                                                            href={route(
                                                                 "results.index",
                                                             )}
                                                             active={route().current(
                                                             "results.index"|| "student_answers.index",
                                                             )}
                                                            className="flex p-2 text-base group"
                                                        >
                                                            <BookmarkIcon className="w-6 h-6 text-gray-500 transition duration-75  group-hover:text-gray-900" />
                                                            <span className="ml-3">
                                                               Résultat
                                                            </span>
                                                        </NavLink>
                                                    </li>
                </ul>
            </div>
        </aside>
    );
}
