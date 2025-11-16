import { Star, CheckSquare, Square } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import { Link } from '@inertiajs/react';

export function ProductCard({ 
    id,
    image_url, 
    name, 
    brand, 
    price, 
    rating,
    review_count = 0,
    showCompare = false,
    isCompared = false,
    onCompareToggle
}) {
    return (
        <div className="group bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <Link 
                href={route('products.show', id)}
                className="relative aspect-square bg-light-beige cursor-pointer overflow-hidden block"
            >
                <ImageWithFallback 
                    src={image_url} 
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {showCompare && (
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            onCompareToggle?.(id);
                        }}
                        className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-md hover:bg-white transition-colors"
                    >
                        {isCompared ? (
                            <CheckSquare className="w-5 h-5 text-burgundy" />
                        ) : (
                            <Square className="w-5 h-5 text-mid-gray" />
                        )}
                    </button>
                )}
            </Link>
            
            <div className="p-4">
                <div className="text-xs text-soft-gold uppercase tracking-wider mb-1">
                    {brand}
                </div>
                <Link 
                    href={route('products.show', id)}
                    className="block"
                >
                    <h4 className="mb-2 line-clamp-2 cursor-pointer hover:text-burgundy transition-colors">
                        {name}
                    </h4>
                </Link>
                
                <div className="flex items-center mb-3">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-4 h-4 ${
                                    i < Math.floor(rating)
                                        ? 'fill-soft-gold text-soft-gold'
                                        : 'text-gray-300'
                                }`}
                            />
                        ))}
                    </div>
                    <span className="ml-2 text-xs text-mid-gray">
                        ({review_count})
                    </span>
                </div>
                
                <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-burgundy">
                        ${parseFloat(price).toFixed(2)}
                    </span>
                    <Link
                        href={route('products.show', id)}
                        className="text-sm text-burgundy hover:underline"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}