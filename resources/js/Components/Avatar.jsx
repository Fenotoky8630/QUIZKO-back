import { UserIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

export default function Avatar({
    src,
    alt,
    className,
    size = "md",
}) {
    const [error, setError] = useState(false);

    let sizeClass = "h-8 w-8";

    if (size === "sm") {
        sizeClass = "h-6 w-6";
    }

    if (size === "lg") {
        sizeClass = "h-10 w-10";
    }

    useEffect(() => {
        if (!src) {
            setError(true);
        }
    }, [src]);

    return (
        <>
            {!error && (
                <img
                    className={`inline-block ${sizeClass} rounded-full ring-1 ring-gray-800 ${className}`}
                    src={src}
                    alt={alt}
                    onError={() => setError(true)}
                />
            )}
            {error && (
                <div
                    className={`inline-block ${sizeClass} rounded-full ring-1 ring-gray-800 flex items-center justify-center ${className}`}
                >
                    <UserIcon className={`${sizeClass} text-purple-950`} />
                </div>
            )}
        </>
    );
}
