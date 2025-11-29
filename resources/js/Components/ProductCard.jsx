import { Star, CheckSquare, Square, Heart } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import { Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';

export function ProductCard({ 
    id,
    image_url, 
    name, 
    brand, 
    price, 
    rating,
    review_count = 0,
    is_bookmarked = false,
    showCompare = false,
    isCompared = false,
    onCompareToggle
}) {
    const { auth } = usePage().props;
    const [isBookmarked, setIsBookmarked] = useState(is_bookmarked);
    const [isLoading, setIsLoading] = useState(false);

    const handleBookmarkToggle = async (e) => {
        e.preventDefault();
        
        if (!auth?.user) {
            router.visit('/login');
            return;
        }

        setIsLoading(true);

        try {
            // Use Inertia's router for POST requests with CSRF protection
            router.post(`/bookmarks/toggle/${id}`, {}, {
                preserveScroll: true,
                onSuccess: (page) => {
                    // Toggle the bookmark state
                    setIsBookmarked(!isBookmarked);
                },
                onError: (errors) => {
                    console.error('Bookmark error:', errors);
                    alert('Failed to update bookmark. Please try again.');
                },
                onFinish: () => {
                    setIsLoading(false);
                }
            });
        } catch (error) {
            console.error('Error toggling bookmark:', error);
            setIsLoading(false);
        }
    };

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
                <div className="absolute top-3 right-3 flex gap-2">
                    {showCompare && (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                onCompareToggle?.(id);
                            }}
                            className="bg-white/90 backdrop-blur-sm p-2 rounded-md hover:bg-white transition-colors"
                        >
                            {isCompared ? (
                                <CheckSquare className="w-5 h-5 text-burgundy" />
                            ) : (
                                <Square className="w-5 h-5 text-mid-gray" />
                            )}
                        </button>
                    )}
                    <button
                        onClick={handleBookmarkToggle}
                        disabled={isLoading}
                        className={`bg-white/90 backdrop-blur-sm p-2 rounded-md hover:bg-white transition-colors ${
                            isLoading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        <Heart
                            className={`w-5 h-5 ${
                                isBookmarked 
                                    ? 'fill-burgundy text-burgundy' 
                                    : 'text-mid-gray'
                            }`}
                        />
                    </button>
                </div>
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