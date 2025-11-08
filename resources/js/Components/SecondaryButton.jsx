export default function SecondaryButton({ type = 'button', className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            type={type}
            className={
                `inline-flex items-center justify-center rounded-md bg-white py-2 px-5 text-center font-medium border-purple-950 border text-purple-950 hover:bg-opacity-90 lg:px-8 xl:px-10 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
