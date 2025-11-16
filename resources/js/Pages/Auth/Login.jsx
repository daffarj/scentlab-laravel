import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { ShoppingBag, Eye, EyeOff } from 'lucide-react';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="min-h-screen bg-light-beige flex items-center justify-center px-4">
            <Head title="Login" />

            <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href={route('home')} className="inline-flex items-center space-x-2 mb-4">
                        <ShoppingBag className="w-10 h-10 text-burgundy" />
                        <span className="font-serif italic text-3xl text-burgundy">Scentlab</span>
                    </Link>
                    <h2 className="text-2xl font-bold text-burgundy">Welcome Back</h2>
                    <p className="text-mid-gray mt-2">Sign in to your account</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
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
                            autoFocus
                        />
                        {errors.email && (
                            <div className="text-red-600 text-sm mt-1">{errors.email}</div>
                        )}
                        <p className="mt-1 text-xs text-mid-gray">
                            Tip: Use "admin@scentlab.com" to login as admin
                        </p>
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
                        <p className="mt-1 text-xs text-mid-gray">
                            Default password: "password"
                        </p>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="mr-2 rounded text-burgundy focus:ring-burgundy"
                            />
                            <span className="text-mid-gray">Remember me</span>
                        </label>
                        <button type="button" className="text-burgundy hover:underline">
                            Forgot Password?
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full py-3 bg-burgundy text-white rounded-md hover:bg-burgundy-dark transition-colors disabled:opacity-50"
                    >
                        {processing ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                {/* Register Link */}
                <div className="mt-6 text-center text-sm">
                    <span className="text-mid-gray">Don't have an account? </span>
                    <Link
                        href={route('register')}
                        className="text-burgundy hover:underline font-medium"
                    >
                        Register
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