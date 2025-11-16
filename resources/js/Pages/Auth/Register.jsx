import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { ShoppingBag, Eye, EyeOff } from 'lucide-react';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <div className="min-h-screen bg-light-beige flex items-center justify-center px-4 py-12">
            <Head title="Register" />

            <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href={route('home')} className="inline-flex items-center space-x-2 mb-4">
                        <ShoppingBag className="w-10 h-10 text-burgundy" />
                        <span className="font-serif italic text-3xl text-burgundy">Scentlab</span>
                    </Link>
                    <h2 className="text-2xl font-bold text-burgundy">Create Account</h2>
                    <p className="text-mid-gray mt-2">Join our fragrance community</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2 text-mid-gray">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy ${
                                errors.name ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="John Doe"
                            autoFocus
                        />
                        {errors.name && (
                            <div className="text-red-600 text-sm mt-1">{errors.name}</div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2 text-mid-gray">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy ${
                                errors.email ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="you@example.com"
                        />
                        {errors.email && (
                            <div className="text-red-600 text-sm mt-1">{errors.email}</div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-2 text-mid-gray">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy ${
                                    errors.password ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-mid-gray hover:text-burgundy"
                            >
                                {showPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                ) : (
                                    <Eye className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <div className="text-red-600 text-sm mt-1">{errors.password}</div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password_confirmation" className="block text-sm font-medium mb-2 text-mid-gray">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                id="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-mid-gray hover:text-burgundy"
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                ) : (
                                    <Eye className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full py-3 bg-burgundy text-white rounded-md hover:bg-burgundy-dark transition-colors disabled:opacity-50"
                    >
                        {processing ? 'Creating Account...' : 'Register'}
                    </button>
                </form>

                {/* Login Link */}
                <div className="mt-6 text-center text-sm">
                    <span className="text-mid-gray">Already have an account? </span>
                    <Link
                        href={route('login')}
                        className="text-burgundy hover:underline font-medium"
                    >
                        Login
                    </Link>
                </div>

                {/* Back to Home */}
                <div className="mt-4 text-center">
                    <Link
                        href={route('home')}
                        className="text-sm text-mid-gray hover:text-burgundy transition-colors"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}