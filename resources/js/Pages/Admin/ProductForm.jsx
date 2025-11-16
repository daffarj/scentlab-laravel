import { Head, Link, useForm } from '@inertiajs/react';
import { LayoutDashboard, LogOut, Upload, Save } from 'lucide-react';
import { router } from '@inertiajs/react';

export default function ProductForm({ auth, product, brands }) {
    const isEditing = !!product;

    const { data, setData, post, put, processing, errors } = useForm({
        name: product?.name || '',
        brand: product?.brand || '',
        price: product?.price || '',
        gender: product?.gender || 'Unisex',
        category: product?.category || 'Eau de Parfum',
        fragrance_notes: product?.fragrance_notes_string || product?.fragrance_notes?.join(', ') || '',
        sillage: product?.sillage || 5,
        projection: product?.projection || 5,
        longevity: product?.longevity || 5,
        description: product?.description || '',
        purchase_link: product?.purchase_link || '',
        image_url: product?.image_url || '',
    });

    const handleLogout = () => {
        router.post(route('logout'));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isEditing) {
            put(route('admin.products.update', product.id));
        } else {
            post(route('admin.products.store'));
        }
    };

    return (
        <div className="min-h-screen bg-light-beige">
            <Head title={isEditing ? 'Edit Product' : 'Add Product'} />

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
                            className="border-b-2 border-transparent text-mid-gray hover:text-burgundy hover:border-burgundy transition-colors px-1"
                        >
                            Products
                        </Link>
                        <Link
                            href={route('admin.products.create')}
                            className="border-b-2 border-burgundy text-burgundy px-1 font-medium"
                        >
                            {isEditing ? 'Edit Product' : 'Add Product'}
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Form Content */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 className="text-3xl font-bold text-burgundy mb-8">
                    {isEditing ? 'Edit Product' : 'Add New Product'}
                </h2>

                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 space-y-6">
                    {/* Product Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2 text-mid-gray">
                            Product Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy ${
                                errors.name ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="e.g., Midnight Essence"
                        />
                        {errors.name && <div className="text-red-600 text-sm mt-1">{errors.name}</div>}
                    </div>

                    {/* Brand */}
                    <div>
                        <label htmlFor="brand" className="block text-sm font-medium mb-2 text-mid-gray">
                            Brand *
                        </label>
                        <select
                            id="brand"
                            value={data.brand}
                            onChange={(e) => setData('brand', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy ${
                                errors.brand ? 'border-red-500' : 'border-gray-300'
                            }`}
                        >
                            <option value="">Select a brand</option>
                            {brands.map(brand => (
                                <option key={brand.id} value={brand.name}>
                                    {brand.name}
                                </option>
                            ))}
                        </select>
                        {errors.brand && <div className="text-red-600 text-sm mt-1">{errors.brand}</div>}
                    </div>

                    {/* Price */}
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium mb-2 text-mid-gray">
                            Price (USD) *
                        </label>
                        <input
                            type="number"
                            id="price"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                            min="0"
                            step="0.01"
                            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy ${
                                errors.price ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="99.99"
                        />
                        {errors.price && <div className="text-red-600 text-sm mt-1">{errors.price}</div>}
                    </div>

                    {/* Gender & Category */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="gender" className="block text-sm font-medium mb-2 text-mid-gray">
                                Gender *
                            </label>
                            <select
                                id="gender"
                                value={data.gender}
                                onChange={(e) => setData('gender', e.target.value)}
                                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy ${
                                    errors.gender ? 'border-red-500' : 'border-gray-300'
                                }`}
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Unisex">Unisex</option>
                            </select>
                            {errors.gender && <div className="text-red-600 text-sm mt-1">{errors.gender}</div>}
                        </div>

                        <div>
                            <label htmlFor="category" className="block text-sm font-medium mb-2 text-mid-gray">
                                Category *
                            </label>
                            <select
                                id="category"
                                value={data.category}
                                onChange={(e) => setData('category', e.target.value)}
                                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy ${
                                    errors.category ? 'border-red-500' : 'border-gray-300'
                                }`}
                            >
                                <option value="Eau de Parfum">Eau de Parfum</option>
                                <option value="Eau de Toilette">Eau de Toilette</option>
                                <option value="Eau de Cologne">Eau de Cologne</option>
                                <option value="Extrait de Parfum">Extrait de Parfum</option>
                            </select>
                            {errors.category && <div className="text-red-600 text-sm mt-1">{errors.category}</div>}
                        </div>
                    </div>

                    {/* Fragrance Notes */}
                    <div>
                        <label htmlFor="fragrance_notes" className="block text-sm font-medium mb-2 text-mid-gray">
                            Fragrance Notes *
                        </label>
                        <input
                            type="text"
                            id="fragrance_notes"
                            value={data.fragrance_notes}
                            onChange={(e) => setData('fragrance_notes', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy ${
                                errors.fragrance_notes ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Bergamot, Cedar, Amber, Vanilla (comma separated)"
                        />
                        <p className="mt-1 text-xs text-mid-gray">Separate notes with commas</p>
                        {errors.fragrance_notes && <div className="text-red-600 text-sm mt-1">{errors.fragrance_notes}</div>}
                    </div>

                    {/* Attributes */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label htmlFor="sillage" className="block text-sm font-medium mb-2 text-mid-gray">
                                Sillage (1-10) *
                            </label>
                            <input
                                type="number"
                                id="sillage"
                                value={data.sillage}
                                onChange={(e) => setData('sillage', e.target.value)}
                                min="1"
                                max="10"
                                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy ${
                                    errors.sillage ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.sillage && <div className="text-red-600 text-sm mt-1">{errors.sillage}</div>}
                        </div>

                        <div>
                            <label htmlFor="projection" className="block text-sm font-medium mb-2 text-mid-gray">
                                Projection (1-10) *
                            </label>
                            <input
                                type="number"
                                id="projection"
                                value={data.projection}
                                onChange={(e) => setData('projection', e.target.value)}
                                min="1"
                                max="10"
                                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy ${
                                    errors.projection ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.projection && <div className="text-red-600 text-sm mt-1">{errors.projection}</div>}
                        </div>

                        <div>
                            <label htmlFor="longevity" className="block text-sm font-medium mb-2 text-mid-gray">
                                Longevity (1-10) *
                            </label>
                            <input
                                type="number"
                                id="longevity"
                                value={data.longevity}
                                onChange={(e) => setData('longevity', e.target.value)}
                                min="1"
                                max="10"
                                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy ${
                                    errors.longevity ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.longevity && <div className="text-red-600 text-sm mt-1">{errors.longevity}</div>}
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium mb-2 text-mid-gray">
                            Description *
                        </label>
                        <textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            rows={4}
                            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy ${
                                errors.description ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Detailed product description..."
                        />
                        {errors.description && <div className="text-red-600 text-sm mt-1">{errors.description}</div>}
                    </div>

                    {/* Image URL */}
                    <div>
                        <label htmlFor="image_url" className="block text-sm font-medium mb-2 text-mid-gray">
                            Image URL
                        </label>
                        <input
                            type="url"
                            id="image_url"
                            value={data.image_url}
                            onChange={(e) => setData('image_url', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy ${
                                errors.image_url ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="https://example.com/image.jpg"
                        />
                        <p className="mt-1 text-xs text-mid-gray">
                            Leave empty to use default image
                        </p>
                        {errors.image_url && <div className="text-red-600 text-sm mt-1">{errors.image_url}</div>}
                    </div>

                    {/* Purchase Link */}
                    <div>
                        <label htmlFor="purchase_link" className="block text-sm font-medium mb-2 text-mid-gray">
                            Purchase Link
                        </label>
                        <input
                            type="url"
                            id="purchase_link"
                            value={data.purchase_link}
                            onChange={(e) => setData('purchase_link', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy ${
                                errors.purchase_link ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="https://example.com/product"
                        />
                        {errors.purchase_link && <div className="text-red-600 text-sm mt-1">{errors.purchase_link}</div>}
                    </div>

                    {/* Buttons */}
                    <div className="flex space-x-4 pt-6">
                        <Link
                            href={route('admin.products.index')}
                            className="flex-1 px-6 py-3 border border-gray-300 text-mid-gray rounded-md hover:bg-gray-50 transition-colors text-center"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-burgundy text-white rounded-md hover:bg-burgundy-dark transition-colors disabled:opacity-50"
                        >
                            <Save className="w-5 h-5" />
                            <span>{processing ? 'Saving...' : (isEditing ? 'Update Product' : 'Create Product')}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}