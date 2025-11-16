<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Review;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    public function index(): Response
    {
        $totalProducts = Product::count();
        $totalReviews = Review::count();
        $averageRating = Product::avg('rating') ?? 0;
        $totalRevenue = Product::sum('price');

        $recentProducts = Product::latest()
            ->limit(5)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalProducts' => $totalProducts,
                'totalReviews' => $totalReviews,
                'averageRating' => round($averageRating, 1),
                'totalRevenue' => round($totalRevenue, 2),
            ],
            'recentProducts' => $recentProducts,
        ]);
    }
}