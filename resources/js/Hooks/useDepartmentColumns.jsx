import Avatar from "@/Components/Avatar";
import Dropdown from "@/Components/Dropdown";
import { EnvelopeIcon, PhoneIcon, PencilIcon, EyeIcon,TrashIcon } from "@heroicons/react/24/outline";
import SecondaryButton from "@/Components/SecondaryButton";
import { useMemo } from "react";
import { Link } from "@inertiajs/react";

export const useColumns = (
    props,
)=> {
    return useMemo(() => {
        return [
            {
                accessorKey: "name",
                cell: (info) =>
                    `${(info.getValue())}`,
                header: () => "Département",
            },
            {
                accessorKey: "recruiters",
                cell: (info) => `${(info.getValue() ).length}`,
                header: () => "Nombre d'Enseignant",
            },
           {
                accessorFn: (row) => row,
                id: "id",
                cell: (info) => (
                    <div className="flex space-x-2">
                    <Link
                         href={`/clients/${(info.getValue()).id}`}
                        className={
                            "inline-flex items-center px-2 py-1 border border-transparent text-xs leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                        }
                        
                    >
                        <EyeIcon className="w-3 h-3 mr-1" />
                     
                    </Link>
                
                        <button
                            className={
                                "inline-flex items-center px-2 py-1 border border-transparent text-xs leading-4 font-medium rounded-md text-green-500 dark:text-green-400 bg-green-100 dark:bg-green-700 hover:text-green-700 dark:hover:text-green-300 focus:outline-none transition ease-in-out duration-150"
                            }
                            onClick={() =>{ 
                                 setShowEditionModal(true);
                                
                                 setData(info.getValue() );
                             }}
                        >
                            <PencilIcon className="w-3 h-3 mr-1" /> 
                        
                        </button>
                        <button
                            className={
                                "inline-flex items-center px-2 py-1 border border-transparent text-xs leading-4 font-medium rounded-md text-red-500 dark:text-red-400 bg-red-100 dark:bg-red-700 hover:text-red-700 dark:hover:text-red-300 focus:outline-none transition ease-in-out duration-150"
                            }
                            // onClick={() =>{
                            //     setShowDeletionModal(true);
                            //     setSelectedData(info.getValue());
                            // }}
                        >
                            <TrashIcon className="w-3 h-3 mr-1" />
                          
                        </button>

                </div>
                
                ),
                header: () => "Action",
            },
        ];
    }, [props]);
};
