import{W as f,j as e}from"./app--oISFhqW.js";import{P as p}from"./PrimaryButton-D_GEZHxU.js";const d=()=>{const{data:r,setData:s,post:i,processing:o,errors:l}=f({import_file:null}),a=t=>{const n=t.target.files?t.target.files[0]:null;s("import_file",n)},m=t=>{t.preventDefault(),r.import_file&&i(route("students.importExcelData"),{forceFormData:!0})};return e.jsxs("div",{className:"max-w-lg mx-auto p-4 shadow-md rounded bg-gray-300",children:[e.jsxs("form",{onSubmit:m,className:"flex items-center space-x-4",children:[e.jsx("input",{type:"file",accept:".xls,.xlsx",onChange:a,className:`block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100`}),e.jsx(p,{type:"submit",disabled:o,children:"Importer"})]}),l.import_file&&e.jsx("p",{className:"text-red-500 text-sm mt-2",children:l.import_file})]})};export{d as default};
