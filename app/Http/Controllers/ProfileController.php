<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function show(): Response
    {
        // Mock bookmarked products (nanti bisa dikembangkan dengan pivot table)
        $bookmarkedProducts = auth()->user()
            ? \App\Models\Product::limit(3)->get()
            : collect();

        return Inertia::render('Profile/UserProfile', [
            'bookmarkedProducts' => $bookmarkedProducts,
        ]);
    }
}