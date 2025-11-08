export default function Chip({ type = "default", children }) {
    const colorClass = {
        default: "bg-gray-900 text-gray-900 border border-gray-300",
        success: "bg-green-900 text-white border border-green-600",
        info: "bg-blue-900 text-white border border-blue-600",
        warning: "bg-orange-900 text-white border border-orange-600",
        error: "bg-red-900 text-white border border-red-600",
    }[type];

    return (
        <span className={`font-medium me-2 px-3 py-1 rounded-full ${colorClass}`}>
            {children}
        </span>
    );
}
