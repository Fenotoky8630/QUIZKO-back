import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    UserIcon,
    QuestionMarkCircleIcon,
    AcademicCapIcon,
    BookOpenIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import socket from "@/Utils/socket";

export default function Dashboard({ auth, count }) {
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        socket.on('updateUsers', (usersData) => {
            setUsers(usersData);
        });

        return () => {
            socket.off('updateUsers');
        };
    }, []);
   
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />
            {/* <Breadcrumb pageName="Dashboard" /> */}
            <div className="">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {count && (
                            <>
                                <div className="rounded-lg bg-green-800 text-white flex items-center justify-center p-6">
                                    <UserIcon className="h-12 w-12" />
                                    <div className="ml-4">
                                        <div className="text-3xl font-semibold">{count.candidates}</div>
                                        <div className="text-sm">Étudiants</div>
                                    </div>
                                </div>
                                <div className="rounded-lg bg-red-800 text-white flex items-center justify-center p-6">
                                    <QuestionMarkCircleIcon className="h-12 w-12" />
                                    <div className="ml-4">
                                        <div className="text-3xl font-semibold">{count.questions}</div>
                                        <div className="text-sm">Questions</div>
                                    </div>
                                </div>
                                <div className="rounded-lg bg-blue-800 text-white flex items-center justify-center p-6">
                                    <AcademicCapIcon className="h-12 w-12" />
                                    <div className="ml-4">
                                        <div className="text-3xl font-semibold">{count.subjects}</div>
                                        <div className="text-sm">Sujets</div>
                                    </div>
                                </div>
                                <div className="rounded-lg bg-yellow-800 text-white flex items-center justify-center p-6">
                                    <BookOpenIcon className="h-12 w-12" />
                                    <div className="ml-4">
                                        <div className="text-3xl font-semibold">{count.interviews}</div>
                                        <div className="text-sm">Tests</div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="p-5 shadow-sm border-t border rounded-lg">
                        <h3 className="text-lg text-black font-semibold mb-3 relative">
                            Etudiants Connectés
                            <span className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 inline-block text-xs bg-red-800 text-white rounded-full px-2 py-0.5">
                                {users.length > 0 && users.length}
                            </span>
                        </h3>
                        <div className="overflow-y-auto max-h-80">
                            <ul className="divide-y divide-gray-200">
                                {users.map((user) => (
                                     <li key={user.id} className="py-4 flex items-center justify-between hover:bg-gray-100 px-3 rounded-lg transition duration-300">
                                        <div className="flex items-center gap-4">
                                            <div className="flex-shrink-0 relative">
                                                <UserIcon className="h-8 w-8 text-gray-600" />
                                                <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></span>
                                            </div>
                                            <div className="text-sm font-medium text-black">{user.name}</div>
                                        </div>
                                        <div className="text-sm text-gray-500 bg-gray-200 px-3 py-1 rounded-full">{user.registration_number}</div>
                                 </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
