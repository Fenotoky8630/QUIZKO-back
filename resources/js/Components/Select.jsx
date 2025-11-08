export default function Select({
    className,
    options,
    ...props
})
 {
    return (
        <select
            {...props}
            className={
                "border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-md shadow-sm " +
                className
            }
        >
            <option>Choisir...</option>
            {options.map((opt, index) => (
                <option key={index} value={opt.value} className="">
                    {opt.label}
                </option>
            ))}
        </select>
    );
}
