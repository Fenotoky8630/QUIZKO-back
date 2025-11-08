import {
    ArrowLongDownIcon,
    ArrowLongUpIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    MagnifyingGlassIcon,
    PlusIcon,
} from "@heroicons/react/20/solid";
import {
    flexRender,
    getCoreRowModel,
    getFacetedMinMaxValues,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useRef, useState } from "react";
import Pagination from "./Pagination";
import PrimaryButton from "./PrimaryButton";

export default function Datagrid({
    className,
    columns,
    rows,
    canCreate,
    filter,
    actions,
    pagination = true,
    minHeight = "350px",
    onCreate
}) {
    const [globalFilter, setGlobalFilter] = useState("");
    const [columnFilters, setColumnFilters] = useState([]);
    const table = useReactTable({
        columns,
        data: rows,
        state: {
            columnFilters,
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
        initialState: {
            pagination: {
                pageSize: 10,
            },
        },
    });

    const { rows: _rows } = table.getRowModel();

    return (
        <div className={`relative overflow-hidden bg-white shadow-lg rounded-lg ${className}`}>
            {/* Header avec le filtre et le bouton Ajouter */}
            {(canCreate || filter || actions) && (
                <div className="flex flex-wrap items-center justify-between p-4 bg-gray-100 rounded-t-lg">
                    {filter && (
                        <div className="w-full md:w-1/3">
                            <div className="relative">
                                <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                                <input
                                    type="text"
                                    className="w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 text-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                                    placeholder="Rechercher..."
                                    value={globalFilter ?? ""}
                                    onChange={(e) => setGlobalFilter(e.target.value)}
                                />
                            </div>
                        </div>
                    )}
                    {canCreate && (
                        <PrimaryButton
                            type="button"
                            onClick={onCreate}
                            className="flex items-centerpx-4 py-2 rounded-md"
                        >
                            <PlusIcon className="mr-2 h-5 w-5" />
                            Ajouter
                        </PrimaryButton>
                    )}
                    {actions && <div className="flex space-x-3">{actions}</div>}
                </div>
            )}

            {/* Table container */}
            <div className="overflow-x-auto" style={{ minHeight: minHeight, maxHeight: "700px" }}>
                <table className="w-full text-left text-xs text-gray-700">
                    {/* Table header */}
                    <thead className="sticky top-0 bg-gray-200 text-gray-900 uppercase text-xs font-semibold">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id} className="px-4 py-3 border-b">
                                        {!header.isPlaceholder && (
                                            <div
                                                className={`flex items-center ${header.column.getCanSort() ? "cursor-pointer select-none" : ""}`}
                                                onClick={header.column.getToggleSortingHandler()}
                                            >
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                                {header.column.getIsSorted() === "asc" && (
                                                    <ArrowLongUpIcon className="ml-2 h-4 w-4 text-gray-600" />
                                                )}
                                                {header.column.getIsSorted() === "desc" && (
                                                    <ArrowLongDownIcon className="ml-2 h-4 w-4 text-gray-600" />
                                                )}
                                            </div>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    {/* Table body */}
                    <tbody>
                        {_rows.length > 0 ? (
                            _rows.map((row, rowIndex) => (
                                <tr key={row.id} className={`${rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"} border-b`}>
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className="px-4 py-3">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="px-4 py-6 text-center text-gray-500">
                                    Aucune donnée disponible.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {pagination && (
                <div className="flex items-center justify-between px-4 py-3 bg-gray-100 rounded-b-lg">
                    <span className="text-sm text-gray-700">
                        Page{" "}
                        <span className="font-semibold">{table.getState().pagination.pageIndex + 1}</span> sur{" "}
                        <span className="font-semibold">{table.getPageCount().toLocaleString()}</span>
                    </span>
                    <Pagination
                        pageCount={table.getPageCount()}
                        pageRangeDisplayed={5}
                        previousLabel={<ChevronLeftIcon className="h-5 w-5" />}
                        nextLabel={<ChevronRightIcon className="h-5 w-5" />}
                        onClick={({ index, isNext, isPrevious }) => {
                            if (isNext && table.getCanNextPage()) {
                                table.nextPage();
                                return;
                            }

                            if (isPrevious && table.getCanPreviousPage()) {
                                table.previousPage();
                                return;
                            }

                            table.setPageIndex(index ?? 0);
                        }}
                        currentPage={table.getState().pagination.pageIndex}
                    />
                </div>
            )}
        </div>
    );
}
