import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { ProductCard } from '@/Components/ProductCard';
import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '@/Components/ImageWithFallback';

export default function Home({ auth, popularProducts, brands }) {
    return (
        <MainLayout currentPage="home" auth={auth}>
            <Head title="Home" />

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden mt-20">
                <div className="absolute inset-0 bg-gradient-to-r from-burgundy/90 to-burgundy/70 z-10" />
                <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1719175936556-dbd05e415913?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZXJmdW1lJTIwYm90dGxlfGVufDF8fHx8MTc2Mjc0MzAzNnww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Premium Perfume"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                
                <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4">
                    <div className="mb-4 text-sm tracking-widest uppercase text-soft-gold">
                        Shining Fashion Style Design
                    </div>
                    <h1 className="mb-6 text-white">
                        Discover Your<br />Signature Scent
                    </h1>
                    <p className="mb-8 text-lg text-white/90 max-w-2xl mx-auto">
                        Explore our curated collection of premium perfumes from the world's finest fragrance houses
                    </p>
                    <Link 
                        href={route('catalog')}
                        className="group inline-flex items-center space-x-2 px-8 py-4 bg-white text-burgundy rounded-md hover:bg-light-beige transition-colors"
                    >
                        <span>Explore Catalog</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </section>

            {/* Popular Scents */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="mb-4 text-burgundy">Popular Scents</h2>
                        <p className="text-mid-gray max-w-2xl mx-auto">
                            Discover our most loved fragrances, carefully selected for their exceptional quality and unique character
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                        {popularProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                {...product}
                            />
                        ))}
                    </div>

                    <div className="text-center mt-10">
                        <Link
                            href={route('catalog')}
                            className="inline-flex items-center space-x-2 text-burgundy hover:underline"
                        >
                            <span>View All Products</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Brands */}
            <section className="py-20 bg-burgundy">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="mb-4 text-white font-serif italic">Featured Brands</h2>
                        <p className="text-white/80">
                            Partnering with the world's most prestigious fragrance houses
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
                        {brands.map((brand) => (
                            <div
                                key={brand.id}
                                className="bg-white rounded-lg p-8 flex items-center justify-center hover:shadow-xl transition-shadow"
                            >
                                <div className="text-center">
                                    <div className="text-4xl mb-2">{brand.logo}</div>
                                    <div className="text-sm font-semibold text-burgundy">{brand.name}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 bg-light-beige">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="mb-4 text-burgundy">Find Your Perfect Match</h2>
                    <p className="mb-8 text-mid-gray text-lg">
                        Use our advanced comparison tool to find the fragrance that perfectly matches your style and preferences
                    </p>
                    <Link
                        href={route('catalog')}
                        className="inline-block px-8 py-4 bg-burgundy text-white rounded-md hover:bg-burgundy-dark transition-colors"
                    >
                        Start Comparing
                    </Link>
                </div>
            </section>
        </MainLayout>
    );
}