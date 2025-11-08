import Avatar from "@/Components/Avatar";
import Dropdown from "@/Components/Dropdown";
import {
    EllipsisVerticalIcon,
    EnvelopeIcon,
    PhoneIcon,
} from "@heroicons/react/20/solid";
import { useMemo } from "react";

export const useColumns = (
    props,
)=> {
    return useMemo(() => {
        return [
            {
                accessorFn: (row) => row,
                id: "last_name",
                cell: (info) => {
                    const { email, phone, first_name, last_name } =
                        info.getValue();
                    const name = `${first_name} ${last_name}`;

                    return (
                        <div className="flex items-center gap-2">
                            <Avatar size="lg" src="" alt={name} />
                            <div className="space-y-2">
                                <h2 className="text-[16px] font-semibold">
                                    {name}
                                </h2>
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1 text-xs font-thin italic">
                                        <EnvelopeIcon className="w-3 h-3" />
                                        {email}
                                    </span>
                                    {phone && (
                                        <span className="flex items-center gap-1 text-xs font-thin italic">
                                            <PhoneIcon className="w-3 h-3" />
                                            {phone}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                },
                header: () => "Courtier",
            },
            {
                accessorKey: "clients",
                cell: (info) => `${(info.getValue() ).length}`,
                header: () => "Clients",
            },
            {
                accessorKey: "role",
                cell: (info) =>
                    `${(info.getValue() ).replace("ROLE_", "").toLowerCase()}`,
                header: () => "Role",
            },
            {
                accessorKey: "is_active",
                cell: (info) => (
                    <span
                        className={`font-medium me-2 px-2.5 py-0.5 rounded-full ${info.getValue() ? "bg-green-100 text-green-800 dark:bg-gray-700 dark:text-green-400 border border-green-400" : "bg-red-100 text-red-800 dark:bg-gray-700 dark:text-red-400 border border-red-400"}`}
                    >
                        {info.getValue() ? "active" : "inactive"}
                    </span>
                ),
                header: () => "Statut",
            },
            {
                accessorFn: (row) => row,
                id: "id",
                cell: (info) => (
                    <Dropdown>
                        <Dropdown.Trigger>
                            <span className="inline-flex rounded-md">
                                <button
                                    type="button"
                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                >
                                    <EllipsisVerticalIcon className="w-5 h-5" />
                                </button>
                            </span>
                        </Dropdown.Trigger>

                        <Dropdown.Content contentClasses="bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                            <ul>
                                <li>
                                    <Dropdown.Link
                                        href={route(
                                            "brokers.show",
                                            (info.getValue()).id,
                                        )}
                                    >
                                        Voir
                                    </Dropdown.Link>
                                </li>
                                <li>
                                    <Dropdown.Link
                                        href={`/brokers/${(info.getValue()).id}/edit`}
                                        onClick={(event) => {
                                            event.preventDefault();
                                            props.onEdit(
                                                info.getValue() ,
                                            );
                                        }}
                                    >
                                        Modifier
                                    </Dropdown.Link>
                                </li>
                            </ul>
                            <Dropdown.Link
                                href={`/brokers/${(info.getValue() ).id}/delete`}
                                onClick={(event) => {
                                    event.preventDefault();
                                    props.onDelete(info.getValue() );
                                }}
                                className="!text-red-500"
                            >
                                Supprimer
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                ),
                header: () => "Action",
            },
        ];
    }, [props]);
};
