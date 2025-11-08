import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { UserIcon, PlayIcon, StopIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from "react";
import socket from "@/Utils/socket";
import SendUserInfo from "../SendUserInformation";
import { useForm } from '@inertiajs/react';
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export default function Current({ auth, interview }) {
    const [users, setUsers] = useState([]);
    const [isTestActive, setIsTestActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isExpired, setIsExpired] = useState(interview.is_expired);
    const [searchTerm, setSearchTerm] = useState('');
    const { post, data } = useForm({interview_id: interview.id }); 

    const activateInterview = () => {
        socket.emit('activateInterview');
        post(route("tests.activateInterview"));
    };
    const expireInterview = () => {
        socket.emit('interviewExpired');
        post(route("tests.expireInterview"));
    };
    useEffect(() => {
        socket.on('updateUsers', (usersData) => {
            setUsers(usersData);
        });
        return () => {
            socket.off('updateUsers');
        };
    }, []);

    useEffect(() => {
        if (isTestActive) {
            const endTime = Date.now() + timeLeft * 1000;
            const timer = setInterval(() => {
                const remainingTime = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
                setTimeLeft(remainingTime);
                if (remainingTime === 0) {
                    clearInterval(timer);
                    setIsExpired(true);
                    setIsTestActive(false);
                    // stopTest();
                }
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [isTestActive, timeLeft]);

    const startTest = () => {
        activateInterview(); 
        setIsTestActive(true);
        setTimeLeft(formatTime(interview.time));
    };

    const stopTest = () => {
        expireInterview();
        setIsTestActive(false);
    };

    // Filtrer les utilisateurs en fonction de la recherche
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.registration_number.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatTime = (time) => {
        const [hours, minutes, seconds] = time.split(':').map(Number);
        return hours * 3600 + minutes * 60 + seconds;
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Current-test" />
            <Link
                href={route("tests.index")}
                className="inline-flex items-center justify-center rounded-full bg-purple-950 py-2 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
                Retour
            </Link>
            <div className="m-5 bg-gray-100 flex items-center justify-center">
                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="h-250 bg-white shadow-lg rounded-lg p-6">
                        <h1 className="text-3xl font-bold mb-6 bg-purple-950 p-3 rounded-md text-center text-white">Test: {interview.name}</h1>
                        <div className="grid grid-cols-1 gap-4 text-black mb-6">
                            <div>
                                 <p><strong>Classe:</strong> {interview.post.name}</p>
                                 <p className="text-graydark text-md">{interview.post.description}</p>
                            </div>
                            <div>
                                <p><strong>Subjet:</strong> {interview.subject.subject}</p>
                                <p><strong>Durée:</strong> {interview.time}</p>
                                <p><strong>Status:</strong> {isExpired? <span className="text-red-800">Terminé</span>:<span className="text-blue-800">En attente ...</span>}</p>
                            </div>
                        </div>
                        {isExpired?
                         <Link
                            href={`/students-answers/${interview.id}`}
                            className=" text-md rounded-md border-purple-950 border  text-purple-950 py-1 px-2 text-center font-medium bg-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                        >
                            Consulter les résulats
                        </Link>
                        :   
                        <div className="mb-6 text-center">
                            <p className="text-2xl mb-4">
                                <strong>Temps écoulé:</strong> {new Date(timeLeft * 1000).toISOString().substr(11, 8)}
                            </p>
                           <div className="flex justify-center">
                                    <button
                                        onClick={startTest}
                                        className="bg-green-500 text-white px-6 py-3 rounded-full flex items-center justify-center space-x-2 transition duration-300 hover:bg-green-600"
                                    >
                                        <PlayIcon className="h-6 w-6" />
                                        <span> {!isTestActive ?"Démarrer le test":"Test en cours"}</span>
                                    </button>
                                     <button
                                        onClick={stopTest}
                                        className={`ms-2 px-6 py-3 rounded-full flex items-center justify-center space-x-2 transition duration-300 ${
                                            isExpired ? 'bg-red-500' : 'bg-yellow-500'
                                        } text-white hover:opacity-90`}
                                        disabled={interview.isExpired}
                                    >
                                        <StopIcon className="h-6 w-6" />
                                        <span>{!interview.isExpired ? 'Expirer le Test':'Test déjat expiré'}</span>
                                    </button>
                            </div>
                        </div>}
                    </div>
                    <div className="p-5 h-250 shadow-sm border-t border rounded-lg bg-white">
                        <h3 className="text-lg text-black font-semibold mb-2 relative">
                            Etudiants Connectés
                            <span className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 inline-block text-xs bg-red-800 text-white rounded-full px-2 py-0.5">
                                {filteredUsers.length}
                            </span>
                        </h3>

                        {/* Champ de recherche */}
                        <div className="flex items-center">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Rechercher un utilisateur..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="py-2 px-4 pr-10 border border-purple-950 text-black rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-50 text-sm"
                                />
                                <MagnifyingGlassIcon className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
                            </div>
                        </div>

                        <div className="overflow-y-auto max-h-80">
                            <ul className="divide-y divide-gray-200">
                                {filteredUsers.map((user) => (
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
            <SendUserInfo />
        </AuthenticatedLayout>
    );
}
