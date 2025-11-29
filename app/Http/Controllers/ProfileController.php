<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function show(): Response
    {
        // Get bookmarked products for authenticated user
        $bookmarkedProducts = auth()->user()
            ? auth()->user()->bookmarkedProducts()
                ->get()
                ->map(function ($product) {
                    return [
                        'id' => $product->id,
                        'name' => $product->name,
                        'brand' => $product->brand,
                        'price' => $product->price,
                        'image_url' => $product->image_url,
                        'rating' => $product->rating ?? 0,
                        'review_count' => $product->review_count ?? 0,
                    ];
                })
            : collect();

        return Inertia::render('Profile/UserProfile', [
            'bookmarkedProducts' => $bookmarkedProducts,
        ]);
    }
}