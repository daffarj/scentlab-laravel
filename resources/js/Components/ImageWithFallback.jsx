import { useState } from 'react';

export function ImageWithFallback({ src, alt, className }) {
    const [imgSrc, setImgSrc] = useState(src);
    const [error, setError] = useState(false);

    const handleError = () => {
        if (!error) {
            setError(true);
            setImgSrc('https://images.unsplash.com/photo-1719175936556-dbd05e415913?w=1080');
        }
    };

    return (
        <img
            src={imgSrc}
            alt={alt}
            className={className}
            onError={handleError}
        />
    );
}