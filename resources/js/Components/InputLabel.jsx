export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label {...props} className={`m-1 block font-medium text-sm text-black ` + className}>
            {value ? value : children}
        </label>
    );
}
