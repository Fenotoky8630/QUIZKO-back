import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import React from "react";

const ImportExcel = () => {
    const { data, setData, post, processing, errors } = useForm({
        import_file: null,
    });

    const handleFileChange = (e) => {
        const file = e.target.files ? e.target.files[0] : null;
        setData("import_file", file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (data.import_file) {
            post(route("students.importExcelData"), {
                forceFormData: true,
            });
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4 shadow-md rounded bg-gray-300">
            <form
                onSubmit={handleSubmit}
                className="flex items-center space-x-4"
            >
                <input
                    type="file"
                    accept=".xls,.xlsx"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
                />
                <PrimaryButton type="submit" disabled={processing}>
                    Importer
                </PrimaryButton>
            </form>
            {errors.import_file && (
                <p className="text-red-500 text-sm mt-2">
                    {errors.import_file}
                </p>
            )}
        </div>
    );
};

export default ImportExcel;
