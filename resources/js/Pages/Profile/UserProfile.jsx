import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { ProductCard } from '@/Components/ProductCard';
import { Bookmark, User as UserIcon } from 'lucide-react';

export default function UserProfile({ auth, bookmarkedProducts }) {
    return (
        <MainLayout currentPage="profile" auth={auth}>
            <Head title="Profile" />

            <div className="pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Profile Header */}
                    <div className="bg-light-beige rounded-lg p-8 mb-12">
                        <div className="flex items-center space-x-6">
                            <div className="w-24 h-24 bg-burgundy rounded-full flex items-center justify-center">
                                <UserIcon className="w-12 h-12 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-burgundy mb-2">{auth.user.name}</h1>
                                <p className="text-mid-gray">{auth.user.email}</p>
                                <button className="mt-3 text-sm text-burgundy hover:underline">
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Bookmarked Products */}
                    <div>
                        <div className="flex items-center space-x-3 mb-6">
                            <Bookmark className="w-6 h-6 text-burgundy" />
                            <h2 className="text-2xl font-bold text-burgundy">Bookmarked Fragrances</h2>
                        </div>

                        {bookmarkedProducts.length === 0 ? (
                            <div className="text-center py-20 bg-light-beige rounded-lg">
                                <Bookmark className="w-16 h-16 text-mid-gray mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-mid-gray mb-2">No bookmarks yet</h3>
                                <p className="text-mid-gray mb-6">
                                    Start exploring and bookmark your favorite fragrances
                                </p>
                                <Link
                                    href={route('catalog')}
                                    className="inline-block px-6 py-3 bg-burgundy text-white rounded-md hover:bg-burgundy-dark transition-colors"
                                >
                                    Browse Catalog
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {bookmarkedProducts.map(product => (
                                    <ProductCard
                                        key={product.id}
                                        {...product}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Comparison History */}
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold text-burgundy mb-6">Recent Comparisons</h2>
                        <div className="bg-light-beige rounded-lg p-8 text-center">
                            <p className="text-mid-gray mb-4">No comparison history yet</p>
                            <Link
                                href={route('catalog')}
                                className="text-burgundy hover:underline"
                            >
                                Start comparing products
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}