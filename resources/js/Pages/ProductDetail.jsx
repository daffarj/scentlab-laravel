import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { Star, ArrowLeft, ShoppingCart, Heart } from 'lucide-react';
import { useState } from 'react';

export default function ProductDetail({ auth, product, relatedProducts = [] }) {
    const [isFavorite, setIsFavorite] = useState(false);
    
    // Debug: Log received data
    console.log('ProductDetail received:', {
        product,
        productType: typeof product,
        rating: product?.rating,
        ratingType: typeof product?.rating
    });
    
    // Safe defaults with proper type conversion
    const safeProduct = {
        id: product?.id || 0,
        name: product?.name || 'Product Name',
        brand: product?.brand || 'Brand',
        price: parseFloat(product?.price) || 0,
        image_url: product?.image_url || '/images/placeholder.jpg',
        description: product?.description || 'No description available',
        gender: product?.gender || 'Unisex',
        category: product?.category || 'Eau de Parfum',
        rating: parseFloat(product?.rating) || 0,
        review_count: parseInt(product?.review_count) || 0,
        fragrance_notes: Array.isArray(product?.fragrance_notes) ? product.fragrance_notes : [],
        sillage: parseInt(product?.sillage) || 5,
        projection: parseInt(product?.projection) || 5,
        longevity: parseInt(product?.longevity) || 5,
        purchase_link: product?.purchase_link || '',
    };

    return (
        <MainLayout currentPage="catalog" auth={auth}>
            <Head title={safeProduct.name} />
            
            <div className="pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Back Button */}
                    <Link
                        href="/catalog"
                        className="inline-flex items-center space-x-2 text-burgundy hover:underline mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Catalog</span>
                    </Link>

                    {/* Product Detail */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                        {/* Product Image */}
                        <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square">
                            <img
                                src={safeProduct.image_url}
                                alt={safeProduct.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.src = '/images/placeholder.jpg';
                                }}
                            />
                        </div>

                        {/* Product Info */}
                        <div>
                            <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                                {safeProduct.brand}
                            </div>
                            <h1 className="text-4xl font-bold text-burgundy mb-4">
                                {safeProduct.name}
                            </h1>

                            {/* Badges */}
                            <div className="flex items-center space-x-3 mb-6">
                                <span className="px-3 py-1 bg-burgundy text-white rounded-full text-sm">
                                    {safeProduct.gender}
                                </span>
                                <span className="px-3 py-1 bg-gray-100 text-burgundy rounded-full text-sm">
                                    {safeProduct.category}
                                </span>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center mb-6">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-5 h-5 ${
                                                i < Math.floor(safeProduct.rating)
                                                    ? 'fill-yellow-400 text-yellow-400'
                                                    : 'text-gray-300'
                                            }`}
                                        />
                                    ))}
                                </div>
                                <span className="ml-2 text-gray-600">
                                    {safeProduct.rating.toFixed(1)} ({safeProduct.review_count} reviews)
                                </span>
                            </div>

                            {/* Price */}
                            <div className="text-4xl font-bold text-burgundy mb-8">
                                ${parseFloat(safeProduct.price).toFixed(2)}
                            </div>

                            {/* Fragrance Notes */}
                            {safeProduct.fragrance_notes.length > 0 && (
                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                        Fragrance Notes
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {safeProduct.fragrance_notes.map((note, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                            >
                                                {note}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Performance Metrics */}
                            <div className="grid grid-cols-3 gap-4 mb-8">
                                <div className="bg-gray-50 rounded-lg p-4 text-center">
                                    <div className="text-sm text-gray-600 mb-1">Sillage</div>
                                    <div className="text-2xl font-bold text-burgundy">
                                        {safeProduct.sillage}/10
                                    </div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4 text-center">
                                    <div className="text-sm text-gray-600 mb-1">Projection</div>
                                    <div className="text-2xl font-bold text-burgundy">
                                        {safeProduct.projection}/10
                                    </div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4 text-center">
                                    <div className="text-sm text-gray-600 mb-1">Longevity</div>
                                    <div className="text-2xl font-bold text-burgundy">
                                        {safeProduct.longevity}/10
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                    Description
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {safeProduct.description}
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setIsFavorite(!isFavorite)}
                                    className="flex-shrink-0 p-3 border-2 border-burgundy rounded-lg hover:bg-burgundy hover:text-white transition-colors"
                                >
                                    <Heart
                                        className={`w-6 h-6 ${
                                            isFavorite ? 'fill-current' : ''
                                        }`}
                                    />
                                </button>
                                <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-burgundy text-white rounded-lg hover:bg-burgundy/90 transition-colors">
                                    <ShoppingCart className="w-5 h-5" />
                                    <span>Add to Cart</span>
                                </button>
                                {safeProduct.purchase_link && (
                                    <a
                                        href={safeProduct.purchase_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 px-6 py-3 border-2 border-burgundy text-burgundy rounded-lg hover:bg-burgundy hover:text-white transition-colors text-center"
                                    >
                                        Buy Now
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Related Products */}
                    {relatedProducts.length > 0 && (
                        <div>
                            <h2 className="text-3xl font-bold text-burgundy mb-8">
                                You May Also Like
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {relatedProducts.map((related) => (
                                    <Link
                                        key={related.id}
                                        href={`/products/${related.id}`}
                                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                                    >
                                        <div className="aspect-square bg-gray-100">
                                            <img
                                                src={related.image_url || '/images/placeholder.jpg'}
                                                alt={related.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <div className="text-sm text-gray-500 mb-1">
                                                {related.brand}
                                            </div>
                                            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                                                {related.name}
                                            </h3>
                                            <div className="text-xl font-bold text-burgundy">
                                                ${parseFloat(related.price).toFixed(2)}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}