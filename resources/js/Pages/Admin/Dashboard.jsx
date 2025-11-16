import { Head, Link, router } from '@inertiajs/react';
import { Package, Star, MessageSquare, TrendingUp, LayoutDashboard, LogOut } from 'lucide-react';

export default function Dashboard({ auth, stats, recentProducts }) {
    const handleLogout = () => {
        router.post(route('logout'));
    };

    return (
        <div className="min-h-screen bg-light-beige">
            <Head title="Admin Dashboard" />

            {/* Admin Header */}
            <header className="bg-burgundy text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <div className="flex items-center space-x-3">
                            <LayoutDashboard className="w-8 h-8" />
                            <h1 className="text-2xl font-bold text-white">Scentlab Admin</h1>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
                        >
                            <LogOut className="w-5 h-5" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Admin Navigation */}
            <nav className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex space-x-8 h-16">
                        <Link
                            href={route('admin.dashboard')}
                            className="border-b-2 border-burgundy text-burgundy px-1 font-medium"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href={route('admin.products.index')}
                            className="border-b-2 border-transparent text-mid-gray hover:text-burgundy hover:border-burgundy transition-colors px-1"
                        >
                            Products
                        </Link>
                        <Link
                            href={route('admin.products.create')}
                            className="border-b-2 border-transparent text-mid-gray hover:text-burgundy hover:border-burgundy transition-colors px-1"
                        >
                            Add Product
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Dashboard Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 className="text-3xl font-bold text-burgundy mb-8">Dashboard Overview</h2>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <div className="bg-white rounded-lg p-6 shadow-md">
                        <div className="flex items-center justify-between mb-4">
                            <Package className="w-10 h-10 text-burgundy" />
                            <TrendingUp className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="text-3xl font-bold text-burgundy mb-1">{stats.totalProducts}</div>
                        <div className="text-sm text-mid-gray">Total Products</div>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-md">
                        <div className="flex items-center justify-between mb-4">
                            <MessageSquare className="w-10 h-10 text-burgundy" />
                            <TrendingUp className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="text-3xl font-bold text-burgundy mb-1">{stats.totalReviews}</div>
                        <div className="text-sm text-mid-gray">Total Reviews</div>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-md">
                        <div className="flex items-center justify-between mb-4">
                            <Star className="w-10 h-10 text-soft-gold fill-soft-gold" />
                        </div>
                        <div className="text-3xl font-bold text-burgundy mb-1">{stats.averageRating}</div>
                        <div className="text-sm text-mid-gray">Average Rating</div>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-md">
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-2xl">💰</div>
                            <TrendingUp className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="text-3xl font-bold text-burgundy mb-1">${stats.totalRevenue.toFixed(0)}</div>
                        <div className="text-sm text-mid-gray">Catalog Value</div>
                    </div>
                </div>

                {/* Recent Products */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-burgundy">Recent Products</h3>
                        <Link
                            href={route('admin.products.index')}
                            className="text-burgundy hover:underline text-sm"
                        >
                            View All
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-gray-200">
                                <tr className="text-left">
                                    <th className="pb-3 text-mid-gray font-medium">Product</th>
                                    <th className="pb-3 text-mid-gray font-medium">Brand</th>
                                    <th className="pb-3 text-mid-gray font-medium">Category</th>
                                    <th className="pb-3 text-mid-gray font-medium">Price</th>
                                    <th className="pb-3 text-mid-gray font-medium">Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentProducts.map(product => (
                                    <tr key={product.id} className="border-b border-gray-100">
                                        <td className="py-4 font-medium text-burgundy">{product.name}</td>
                                        <td className="py-4 text-mid-gray">{product.brand}</td>
                                        <td className="py-4 text-mid-gray">{product.category}</td>
                                        <td className="py-4 text-mid-gray">${parseFloat(product.price).toFixed(2)}</td>
                                        <td className="py-4">
                                            <div className="flex items-center">
                                                <Star className="w-4 h-4 text-soft-gold fill-soft-gold mr-1" />
                                                <span className="text-mid-gray">{product.rating}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}