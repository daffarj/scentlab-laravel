import { Head, Link, useForm, router } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { Star, ArrowLeft, ShoppingCart, Heart, User, Trash2, Edit2 } from 'lucide-react';
import { useState } from 'react';

export default function ProductDetail({ auth, product, relatedProducts = [], reviews = [], userReview = null, flash }) {
    const [isFavorite, setIsFavorite] = useState(product?.is_bookmarked || false);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [editingReview, setEditingReview] = useState(null);
    
    // Form for creating/editing review
    const { data, setData, post, put, processing, errors, reset } = useForm({
        rating: editingReview?.rating || userReview?.rating || 5,
        comment: editingReview?.comment || userReview?.comment || '',
    });
    
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

    const handleSubmitReview = (e) => {
        e.preventDefault();
        
        if (editingReview) {
            put(`/reviews/${editingReview.id}`, {
                onSuccess: () => {
                    reset();
                    setEditingReview(null);
                    setShowReviewForm(false);
                }
            });
        } else {
            post(`/products/${safeProduct.id}/reviews`, {
                onSuccess: () => {
                    reset();
                    setShowReviewForm(false);
                }
            });
        }
    };

    const handleEditReview = () => {
        setEditingReview(userReview);
        setData({
            rating: userReview.rating,
            comment: userReview.comment,
        });
        setShowReviewForm(true);
    };

    const handleDeleteReview = () => {
        if (confirm('Are you sure you want to delete your review?')) {
            router.delete(`/reviews/${userReview.id}`);
        }
    };

    const handleBookmarkToggle = () => {
        if (!auth?.user) {
            router.visit('/login');
            return;
        }

        // Use Inertia's router for POST requests with CSRF protection
        router.post(`/bookmarks/toggle/${safeProduct.id}`, {}, {
            preserveScroll: true,
            onSuccess: () => {
                // Toggle the bookmark state
                setIsFavorite(!isFavorite);
            },
            onError: (errors) => {
                console.error('Bookmark error:', errors);
                alert('Failed to update bookmark. Please try again.');
            }
        });
    };

    const StarRating = ({ rating, onRatingChange, interactive = false }) => {
        const [hoverRating, setHoverRating] = useState(0);
        
        return (
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        disabled={!interactive}
                        onClick={() => interactive && onRatingChange(star)}
                        onMouseEnter={() => interactive && setHoverRating(star)}
                        onMouseLeave={() => interactive && setHoverRating(0)}
                        className={interactive ? 'cursor-pointer' : 'cursor-default'}
                    >
                        <Star
                            className={`w-6 h-6 ${
                                star <= (hoverRating || rating)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                            }`}
                        />
                    </button>
                ))}
            </div>
        );
    };

    return (
        <MainLayout currentPage="catalog" auth={auth}>
            <Head title={safeProduct.name} />
            
            <div className="pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {flash?.success && (
                        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                            {flash.success}
                        </div>
                    )}
                    {flash?.error && (
                        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                            {flash.error}
                        </div>
                    )}

                    <Link
                        href="/catalog"
                        className="inline-flex items-center space-x-2 text-burgundy hover:underline mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Catalog</span>
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
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

                        <div>
                            <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                                {safeProduct.brand}
                            </div>
                            <h1 className="text-4xl font-bold text-burgundy mb-4">
                                {safeProduct.name}
                            </h1>

                            <div className="flex items-center space-x-3 mb-6">
                                <span className="px-3 py-1 bg-burgundy text-white rounded-full text-sm">
                                    {safeProduct.gender}
                                </span>
                                <span className="px-3 py-1 bg-gray-100 text-burgundy rounded-full text-sm">
                                    {safeProduct.category}
                                </span>
                            </div>

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

                            <div className="text-4xl font-bold text-burgundy mb-8">
                                ${parseFloat(safeProduct.price).toFixed(2)}
                            </div>

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

                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                    Description
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {safeProduct.description}
                                </p>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={handleBookmarkToggle}
                                    className="flex-shrink-0 p-3 border-2 border-burgundy rounded-lg hover:bg-burgundy hover:text-white transition-colors"
                                >
                                    <Heart
                                        className={`w-6 h-6 ${
                                            isFavorite ? 'fill-current' : ''
                                        }`}
                                    />
                                </button>
                                {/* <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-burgundy text-white rounded-lg hover:bg-burgundy/90 transition-colors">
                                    <ShoppingCart className="w-5 h-5" />
                                    <span>Add to Cart</span>
                                </button> */}
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

                    <div className="mb-16">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-bold text-burgundy">
                                Customer Reviews ({reviews.length})
                            </h2>
                            {auth?.user && !userReview && !showReviewForm && (
                                <button
                                    onClick={() => setShowReviewForm(true)}
                                    className="px-6 py-2 bg-burgundy text-white rounded-lg hover:bg-burgundy/90 transition-colors"
                                >
                                    Write a Review
                                </button>
                            )}
                        </div>

                        {auth?.user && showReviewForm && (
                            <div className="bg-gray-50 rounded-lg p-6 mb-8">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                    {editingReview ? 'Edit Your Review' : 'Write Your Review'}
                                </h3>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Rating
                                    </label>
                                    <StarRating
                                        rating={data.rating}
                                        onRatingChange={(rating) => setData('rating', rating)}
                                        interactive={true}
                                    />
                                    {errors.rating && (
                                        <p className="mt-1 text-sm text-red-600">{errors.rating}</p>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Your Review
                                    </label>
                                    <textarea
                                        value={data.comment}
                                        onChange={(e) => setData('comment', e.target.value)}
                                        rows="4"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-burgundy focus:border-burgundy"
                                        placeholder="Share your experience with this fragrance..."
                                        required
                                    />
                                    {errors.comment && (
                                        <p className="mt-1 text-sm text-red-600">{errors.comment}</p>
                                    )}
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={handleSubmitReview}
                                        disabled={processing}
                                        className="px-6 py-2 bg-burgundy text-white rounded-lg hover:bg-burgundy/90 transition-colors disabled:opacity-50"
                                    >
                                        {processing ? 'Submitting...' : editingReview ? 'Update Review' : 'Submit Review'}
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowReviewForm(false);
                                            setEditingReview(null);
                                            reset();
                                        }}
                                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}

                        {auth?.user && userReview && !showReviewForm && (
                            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-8">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 bg-burgundy rounded-full flex items-center justify-center text-white">
                                                <User className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-900">
                                                    {auth.user.name} (You)
                                                </div>
                                            </div>
                                        </div>
                                        <StarRating rating={userReview.rating} interactive={false} />
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleEditReview}
                                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                            title="Edit review"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={handleDeleteReview}
                                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                            title="Delete review"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <p className="text-gray-700">{userReview.comment}</p>
                            </div>
                        )}

                        {!auth?.user && (
                            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-center">
                                <p className="text-gray-600 mb-4">
                                    Please log in to write a review
                                </p>
                                <Link
                                    href="/login"
                                    className="inline-block px-6 py-2 bg-burgundy text-white rounded-lg hover:bg-burgundy/90 transition-colors"
                                >
                                    Log In
                                </Link>
                            </div>
                        )}

                        <div className="space-y-6">
                            {reviews.length > 0 ? (
                                reviews.map((review) => (
                                    <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                                                <User className="w-6 h-6 text-gray-600" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div>
                                                        <div className="font-semibold text-gray-900">
                                                            {review.user.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {review.created_at}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mb-2">
                                                    <StarRating rating={review.rating} interactive={false} />
                                                </div>
                                                <p className="text-gray-700">{review.comment}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12 bg-gray-50 rounded-lg">
                                    <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
                                </div>
                            )}
                        </div>
                    </div>

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