export function GenderBadge({ gender }) {
    const colors = {
        Male: 'bg-blue-100 text-blue-700',
        Female: 'bg-pink-100 text-pink-700',
        Unisex: 'bg-purple-100 text-purple-700'
    };

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[gender]}`}>
            {gender}
        </span>
    );
}