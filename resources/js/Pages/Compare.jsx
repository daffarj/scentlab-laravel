import { Head, Link } from '@inertiajs/react';
import { useEffect } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { GenderBadge } from '@/Components/GenderBadge';
import { FragranceNote } from '@/Components/FragranceNote';
import { ImageWithFallback } from '@/Components/ImageWithFallback';
import { ArrowLeft, Star, ExternalLink } from 'lucide-react';

export default function Compare({ auth, compareProducts = [] }) {
    // Clear sessionStorage after loading compare page
    useEffect(() => {
        return () => {
            // Clear on component unmount if user navigates away
            if (typeof window !== 'undefined' && window.location.pathname !== '/compare') {
                // sessionStorage.removeItem('compareProducts');
            }
        };
    }, []);

    return (
        <MainLayout currentPage="compare" auth={auth}>
            <Head title="Compare Fragrances" />

            <div className="pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link
                        href={route('catalog')}
                        className="inline-flex items-center space-x-2 text-burgundy hover:underline mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Catalog</span>
                    </Link>

                    <h1 className="text-4xl font-bold text-burgundy mb-8">Compare Fragrances</h1>

                    {compareProducts.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="text-6xl mb-4">🔍</div>
                            <h2 className="text-2xl font-semibold text-gray-600 mb-4">No products to compare</h2>
                            <p className="text-gray-500 mb-6">
                                Select 2-4 products from the catalog to compare
                            </p>
                            <Link
                                href={route('catalog')}
                                className="inline-block px-6 py-3 bg-burgundy text-white rounded-md hover:bg-burgundy/90 transition-colors"
                            >
                                Go to Catalog
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="mb-6 text-center">
                                <p className="text-gray-600">
                                    Comparing {compareProducts.length} product{compareProducts.length > 1 ? 's' : ''}
                                </p>
                            </div>

                            <div className={`grid gap-6 ${
                                compareProducts.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
                                compareProducts.length === 3 ? 'grid-cols-1 md:grid-cols-3' :
                                'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
                            }`}>
                                {compareProducts.map((product) => (
                                    <div key={product.id} className="bg-white rounded-lg border-2 border-burgundy/20 overflow-hidden">
                                        <div className="aspect-square bg-gray-100">
                                            <ImageWithFallback 
                                                src={product.image_url}
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                                                {product.brand}
                                            </div>
                                            <h2 className="text-xl font-bold text-burgundy mb-4 line-clamp-2">
                                                {product.name}
                                            </h2>

                                            <div className="flex flex-wrap items-center gap-2 mb-4">
                                                <GenderBadge gender={product.gender} />
                                                <span className="px-2 py-1 bg-gray-100 text-burgundy rounded-full text-xs">
                                                    {product.category}
                                                </span>
                                            </div>

                                            <div className="flex items-center mb-4">
                                                <div className="flex items-center">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`w-4 h-4 ${
                                                                i < Math.floor(product.rating)
                                                                    ? 'fill-yellow-400 text-yellow-400'
                                                                    : 'text-gray-300'
                                                            }`}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="ml-2 text-sm text-gray-600">
                                                    {product.rating} ({product.review_count})
                                                </span>
                                            </div>

                                            <div className="text-2xl font-bold text-burgundy mb-6">
                                                ${parseFloat(product.price).toFixed(2)}
                                            </div>

                                            <div className="space-y-4 mb-6">
                                                <div>
                                                    <div className="text-xs font-medium text-gray-600 mb-2">Fragrance Notes</div>
                                                    <div className="flex flex-wrap gap-1">
                                                        {product.fragrance_notes?.map(note => (
                                                            <FragranceNote key={note} note={note} variant="compact" />
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-3 gap-2 text-center">
                                                    <div className="bg-gray-50 rounded p-2">
                                                        <div className="text-xs text-gray-600">Sillage</div>
                                                        <div className="font-semibold text-burgundy">{product.sillage}/10</div>
                                                    </div>
                                                    <div className="bg-gray-50 rounded p-2">
                                                        <div className="text-xs text-gray-600">Projection</div>
                                                        <div className="font-semibold text-burgundy">{product.projection}/10</div>
                                                    </div>
                                                    <div className="bg-gray-50 rounded p-2">
                                                        <div className="text-xs text-gray-600">Longevity</div>
                                                        <div className="font-semibold text-burgundy">{product.longevity}/10</div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className="text-xs font-medium text-gray-600 mb-2">Description</div>
                                                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                                                        {product.description}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <Link
                                                    href={route('products.show', product.id)}
                                                    className="w-full px-4 py-2 border border-burgundy text-burgundy rounded-md hover:bg-burgundy hover:text-white transition-colors text-sm text-center"
                                                >
                                                    View Details
                                                </Link>
                                                {product.purchase_link && (
                                                    <a
                                                        href={product.purchase_link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center justify-center gap-2 px-4 py-2 bg-burgundy text-white rounded-md hover:bg-burgundy/90 transition-colors text-sm"
                                                    >
                                                        <span>Buy Now</span>
                                                        <ExternalLink className="w-4 h-4" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}