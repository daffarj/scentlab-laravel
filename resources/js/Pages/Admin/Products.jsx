import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, Trash2, Plus, LayoutDashboard, LogOut, Search } from 'lucide-react';
import { ImageWithFallback } from '@/Components/ImageWithFallback';

export default function Products({ auth, products, search = '' }) {
    const [searchQuery, setSearchQuery] = useState(search);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    const handleLogout = () => {
        router.post(route('logout'));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.products.index'), { search: searchQuery }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleDeleteClick = (product) => {
        setProductToDelete(product);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        if (productToDelete) {
            router.delete(route('admin.products.destroy', productToDelete.id), {
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setProductToDelete(null);
                }
            });
        }
    };

    return (
        <div className="min-h-screen bg-light-beige">
            <Head title="Manage Products" />

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
                            className="border-b-2 border-transparent text-mid-gray hover:text-burgundy hover:border-burgundy transition-colors px-1"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href={route('admin.products.index')}
                            className="border-b-2 border-burgundy text-burgundy px-1 font-medium"
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

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-burgundy">Manage Products</h2>
                    <Link
                        href={route('admin.products.create')}
                        className="flex items-center space-x-2 px-6 py-3 bg-burgundy text-white rounded-md hover:bg-burgundy-dark transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Add Product</span>
                    </Link>
                </div>

                {/* Search */}
                <form onSubmit={handleSearch} className="mb-6">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-mid-gray" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search products by name or brand..."
                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy"
                        />
                    </div>
                </form>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.data.map(product => (
                        <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                            <div className="aspect-square bg-light-beige">
                                <ImageWithFallback 
                                    src={product.image_url}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-4">
                                <div className="text-xs text-soft-gold uppercase tracking-wider mb-1">
                                    {product.brand}
                                </div>
                                <h3 className="text-lg font-semibold text-burgundy mb-2 line-clamp-2">{product.name}</h3>
                                <div className="text-sm text-mid-gray mb-1">{product.category}</div>
                                <div className="text-lg font-bold text-burgundy mb-4">
                                    ${parseFloat(product.price).toFixed(2)}
                                </div>
                                
                                <div className="flex space-x-2">
                                    <Link
                                        href={route('admin.products.edit', product.id)}
                                        className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-burgundy text-white rounded-md hover:bg-burgundy-dark transition-colors"
                                    >
                                        <Edit className="w-4 h-4" />
                                        <span>Edit</span>
                                    </Link>
                                    <button
                                        onClick={() => handleDeleteClick(product)}
                                        className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {products.last_page > 1 && (
                    <div className="mt-8 flex justify-center space-x-2">
                        {products.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url || '#'}
                                preserveState
                                preserveScroll
                                className={`px-4 py-2 rounded-md ${
                                    link.active
                                        ? 'bg-burgundy text-white'
                                        : 'bg-white text-mid-gray hover:bg-light-beige'
                                } ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <h3 className="text-xl font-bold text-burgundy mb-4">Confirm Delete</h3>
                        <p className="text-mid-gray mb-6">
                            Are you sure you want to delete "{productToDelete?.name}"? This action cannot be undone.
                        </p>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="flex-1 px-4 py-2 border border-gray-300 text-mid-gray rounded-md hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}