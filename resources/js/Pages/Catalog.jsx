import { Head, router } from '@inertiajs/react';
import { useState, useMemo, useEffect } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { ProductCard } from '@/Components/ProductCard';
import { Filter, SlidersHorizontal, X } from 'lucide-react';

export default function Catalog({ auth, products, brands, allNotes }) {
    // Handle different data structures
    const safeProducts = products?.data || products || [];
    const safeBrands = brands?.data || brands || [];
    const safeNotes = allNotes || [];
    
    // Debug: Log received data
    console.log('Catalog received:', {
        products: safeProducts.length,
        brands: safeBrands.length,
        notes: safeNotes.length
    });
    
    // Filter States
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [priceRange, setPriceRange] = useState([0, 200]);
    const [selectedNotes, setSelectedNotes] = useState([]);
    const [sortBy, setSortBy] = useState('name');
    const [showFilters, setShowFilters] = useState(true);
    
    // Compare State - Load from sessionStorage on mount
    const [compareProducts, setCompareProducts] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = sessionStorage.getItem('compareProducts');
            return saved ? JSON.parse(saved) : [];
        }
        return [];
    });

    // Save to sessionStorage whenever compareProducts changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('compareProducts', JSON.stringify(compareProducts));
        }
    }, [compareProducts]);

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        let filtered = safeProducts.filter(product => {
            if (selectedBrand && product.brand !== selectedBrand) return false;
            if (selectedGender && product.gender !== selectedGender) return false;
            if (selectedCategory && product.category !== selectedCategory) return false;
            if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
            if (selectedNotes.length > 0 && !selectedNotes.some(note => 
                product.fragrance_notes?.includes(note)
            )) return false;
            return true;
        });

        // Sorting
        switch (sortBy) {
            case 'price-asc':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                break;
            default:
                filtered.sort((a, b) => a.name.localeCompare(b.name));
        }

        return filtered;
    }, [safeProducts, selectedBrand, selectedGender, selectedCategory, priceRange, selectedNotes, sortBy]);

    const handleNoteToggle = (note) => {
        setSelectedNotes(prev =>
            prev.includes(note) ? prev.filter(n => n !== note) : [...prev, note]
        );
    };

    const handleCompareToggle = (productId) => {
        setCompareProducts(prev => {
            if (prev.includes(productId)) {
                return prev.filter(id => id !== productId);
            } else {
                if (prev.length >= 4) {
                    alert('You can only compare up to 4 products');
                    return prev;
                }
                return [...prev, productId];
            }
        });
    };

    const handleCompareNavigate = () => {
        if (compareProducts.length < 2) {
            alert('Please select at least 2 products to compare');
            return;
        }
        // Navigate with product IDs as query parameter
        router.visit(`/compare?ids=${compareProducts.join(',')}`);
    };

    const handleRemoveFromCompare = (productId) => {
        setCompareProducts(prev => prev.filter(id => id !== productId));
    };

    const resetFilters = () => {
        setSelectedBrand('');
        setSelectedGender('');
        setSelectedCategory('');
        setPriceRange([0, 200]);
        setSelectedNotes([]);
    };

    // Get product names for compare bar
    const getProductName = (productId) => {
        const product = safeProducts.find(p => p.id === productId);
        return product ? product.name : 'Unknown Product';
    };

    return (
        <MainLayout currentPage="catalog" auth={auth}>
            <Head title="Catalog" />
            
            <div className="pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Page Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-burgundy mb-4">Fragrance Catalog</h1>
                        <p className="text-gray-600">
                            Explore our complete collection of premium perfumes
                        </p>
                    </div>

                    {/* Compare Bar */}
                    {compareProducts.length > 0 && (
                        <div className="mb-6 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <h3 className="font-semibold text-burgundy mb-2">
                                        Selected for Comparison ({compareProducts.length}/4)
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {compareProducts.map(productId => (
                                            <div 
                                                key={productId} 
                                                className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-md border border-gray-200"
                                            >
                                                <span className="text-sm text-gray-700">
                                                    {getProductName(productId)}
                                                </span>
                                                <button
                                                    onClick={() => handleRemoveFromCompare(productId)}
                                                    className="text-gray-400 hover:text-red-500"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex gap-2 ml-4">
                                    <button
                                        onClick={() => setCompareProducts([])}
                                        className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                                    >
                                        Clear All
                                    </button>
                                    <button
                                        onClick={handleCompareNavigate}
                                        className="px-6 py-2 bg-burgundy text-white rounded-md hover:bg-burgundy/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={compareProducts.length < 2}
                                    >
                                        Compare Now
                                    </button>
                                </div>
                            </div>
                            {compareProducts.length < 2 && (
                                <p className="text-sm text-yellow-700">
                                    Select at least 2 products to compare
                                </p>
                            )}
                        </div>
                    )}

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Filters Sidebar */}
                        <div className="lg:w-64 flex-shrink-0">
                            <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold text-burgundy">Filters</h3>
                                    <button
                                        onClick={() => setShowFilters(!showFilters)}
                                        className="lg:hidden"
                                    >
                                        <SlidersHorizontal className="w-5 h-5 text-burgundy" />
                                    </button>
                                </div>

                                <div className={`space-y-6 ${!showFilters ? 'hidden lg:block' : ''}`}>
                                    {/* Brand Filter */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-700">
                                            Brand
                                        </label>
                                        <select
                                            value={selectedBrand}
                                            onChange={(e) => setSelectedBrand(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy"
                                        >
                                            <option value="">All Brands</option>
                                            {safeBrands.map(brand => (
                                                <option key={brand.id} value={brand.name}>
                                                    {brand.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Gender Filter */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-700">
                                            Gender
                                        </label>
                                        <select
                                            value={selectedGender}
                                            onChange={(e) => setSelectedGender(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy"
                                        >
                                            <option value="">All Genders</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Unisex">Unisex</option>
                                        </select>
                                    </div>

                                    {/* Category Filter */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-700">
                                            Category
                                        </label>
                                        <select
                                            value={selectedCategory}
                                            onChange={(e) => setSelectedCategory(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy"
                                        >
                                            <option value="">All Categories</option>
                                            <option value="Eau de Parfum">Eau de Parfum</option>
                                            <option value="Eau de Toilette">Eau de Toilette</option>
                                            <option value="Eau de Cologne">Eau de Cologne</option>
                                            <option value="Extrait de Parfum">Extrait de Parfum</option>
                                        </select>
                                    </div>

                                    {/* Price Range */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-700">
                                            Price Range: ${priceRange[0]} - ${priceRange[1]}
                                        </label>
                                        <div className="space-y-2">
                                            <input
                                                type="range"
                                                min="0"
                                                max="200"
                                                value={priceRange[0]}
                                                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                                className="w-full"
                                            />
                                            <input
                                                type="range"
                                                min="0"
                                                max="200"
                                                value={priceRange[1]}
                                                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                                className="w-full"
                                            />
                                        </div>
                                    </div>

                                    {/* Fragrance Notes */}
                                    {safeNotes.length > 0 && (
                                        <div>
                                            <label className="block text-sm font-medium mb-2 text-gray-700">
                                                Fragrance Notes
                                            </label>
                                            <div className="max-h-48 overflow-y-auto space-y-2">
                                                {safeNotes.map(note => (
                                                    <label key={note} className="flex items-center space-x-2 text-sm">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedNotes.includes(note)}
                                                            onChange={() => handleNoteToggle(note)}
                                                            className="rounded text-burgundy focus:ring-burgundy"
                                                        />
                                                        <span className="text-gray-600">{note}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Reset Filters */}
                                    <button
                                        onClick={resetFilters}
                                        className="w-full py-2 text-sm text-burgundy border border-burgundy rounded-md hover:bg-burgundy hover:text-white transition-colors"
                                    >
                                        Reset Filters
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className="flex-1">
                            {/* Sort Options */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="text-gray-600">
                                    Showing {filteredProducts.length} of {safeProducts.length} products
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-600">Sort by:</span>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy"
                                    >
                                        <option value="name">Name</option>
                                        <option value="price-asc">Price: Low to High</option>
                                        <option value="price-desc">Price: High to Low</option>
                                        <option value="rating">Rating</option>
                                    </select>
                                </div>
                            </div>

                            {/* Products */}
                            {filteredProducts.length === 0 ? (
                                <div className="text-center py-20">
                                    <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                                        No products found
                                    </h3>
                                    <p className="text-gray-500 text-sm">
                                        Try adjusting your filters
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredProducts.map(product => (
                                        <ProductCard
                                            key={product.id}
                                            {...product}
                                            showCompare={true}
                                            isCompared={compareProducts.includes(product.id)}
                                            onCompareToggle={handleCompareToggle}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}