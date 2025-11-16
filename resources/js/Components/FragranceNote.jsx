export function FragranceNote({ note, variant = 'default' }) {
    if (variant === 'compact') {
        return (
            <span className="inline-block px-2 py-1 bg-light-beige text-burgundy rounded text-xs">
                {note}
            </span>
        );
    }

    return (
        <span className="inline-block px-3 py-1.5 bg-light-beige text-burgundy rounded-md text-sm">
            {note}
        </span>
    );
}