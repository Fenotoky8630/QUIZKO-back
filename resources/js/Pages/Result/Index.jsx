import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Datagrid from "@/Components/Datagrid";
import { Link, Head } from "@inertiajs/react";
import { useMemo, useState } from "react";
import Breadcrumb from "@/Components/Breadcrumbs/Breadcrumb";
import { generateUniqueColor } from "@/Utils/generateUniqueColor";
import { formatDate } from "@/Utils/formatDate";

export default function Index({ auth, interviews }) {
    const [searchTerm, setSearchTerm] = useState("");

    const columns = useColumns(searchTerm);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Résultats" />
            {/* <Breadcrumb pageName="Résultats" /> */}
            <div className="">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-4 flex justify-end">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Rechercher..."
                            className="px-3 py-2   border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <Datagrid columns={columns} rows={filterRows(interviews, searchTerm)} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

const useColumns = (searchTerm) => {
    return useMemo(() => {
        return [
            {
                accessorKey: "name",
                cell: (info) => (
                    <div className="bg-gray p-1 rounded-md text-black">{info.getValue()}</div>
                ),
                header: () => "Nom du test",
            },
            {
                accessorKey: "start_date",
                cell: (info) => `${formatDate(info.getValue())}`,
                header: () => "Début",
            },
            {
                accessorKey: "end_date",
                cell: (info) => `${formatDate(info.getValue())}`,
                header: () => "Fin",
            },
            {
                accessorKey: "time",
                cell: (info) => (
                    <span className="bg-red-800 p-1 rounded-md text-white">
                        {info.getValue()}
                    </span>
                ),
                header: () => "Durée",
            },
            {
                accessorKey: "post.name",
                cell: (info) => {
                    const color = generateUniqueColor(info.getValue());
                    return (
                        <div
                            className={`text-white text-center  rounded-md text-xs p-1`}
                            style={{ backgroundColor: color }}
                        >
                            {info.getValue()}
                        </div>
                    );
                },
                header: () => "Classe",
            },
            {
                accessorKey: "subject.subject",
                cell: (info) => `${info.getValue()}`,
                header: () => "Sujet",
            },
            {
                accessorKey: "is_expired",
                cell: (info) => (
                    <span
                        className={`px-2 py-1 inline-flex text-xs font-semibold rounded-md ${
                            info.getValue() ? "text-red-800" : "text-green-400"
                        }`}
                    >
                        {info.getValue() ? "Expiré" : "Non expiré"}
                    </span>
                ),
                header: () => "Status",
            },
            {
                accessorFn: (row) => row,
                id: "id",
                cell: (info) => (
                    <div className="flex space-x-2">
                        <Link
                            href={`/students-answers/${info.getValue().id}`}
                            className=" text-xs rounded-md bg-purple-950 py-1 px-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                        >
                            Consulter les résulats
                        </Link>
                    </div>
                ),
                header: () => "Action",
            },
        ];
    }, [searchTerm]);
};

const filterRows = (rows, searchTerm) => {
    if (!searchTerm) {
        return rows;
    }

    const normalizedSearch = searchTerm.toLowerCase().trim();

    return rows.filter((row) =>
        Object.values(row).some(
            (value) =>
                value &&
                typeof value === "string" &&
                value.toLowerCase().includes(normalizedSearch)
        )
    );
};
