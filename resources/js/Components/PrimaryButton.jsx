export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `bg-purple-950 hover:bg-purple-800 text-white font-medium py-2 px-5 rounded-lg transition-all transform hover:scale-[1.02] ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
