import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const Pagination = ({
    pageCount,
    pageRangeDisplayed = 10, 
    onClick,
    currentPage,
}) => {
    const pages = [...Array(pageCount).keys()].map((number) => number + 1);

    const startIndex = Math.max(0, currentPage - Math.floor(pageRangeDisplayed / 2));
    const endIndex = Math.min(pageCount - 1, startIndex + pageRangeDisplayed - 1);

    const visiblePages = pages.slice(startIndex, endIndex + 1);

    return (
        <div className="flex items-center space-x-1  bg-gray-100  shadow-md">
            <button
                onClick={() => onClick({ isPrevious: true })}
                disabled={currentPage === 0}
                className={`p-2 ${currentPage === 0 ? "text-gray-400" : "text-gray-700"}`}
            >
                <ChevronLeftIcon className="h-5 w-5" />
            </button>

            {startIndex > 0 && (
                <button className="p-2 text-gray-700">
                    ...
                </button>
            )}

            {visiblePages.map((page, index) => (
                <button
                    key={index}
                    onClick={() => onClick({ index: page - 1 })}
                    className={`p-2 ${currentPage === page - 1 ? "bg-primary-600 text-graydark font-bold rounded-full" : "text-gray-700 hover:bg-primary-700 hover:text-white rounded-full"}`}
                >
                    {page}
                </button>
            ))}

            {endIndex < pageCount - 1 && (
                <button className="p-2 text-gray-700">
                    ...
                </button>
            )}

            <button
                onClick={() => onClick({ isNext: true })}
                disabled={currentPage === pageCount - 1}
                className={`p-2 ${currentPage === pageCount - 1 ? "text-gray-400" : "text-gray-700"}`}
            >
                <ChevronRightIcon className="h-5 w-5" />
            </button>
        </div>
    );
};

export default Pagination;
