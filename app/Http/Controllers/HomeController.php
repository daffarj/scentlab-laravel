<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Brand;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $popularProducts = Product::where('is_active', true)
            ->orderBy('rating', 'desc')
            ->limit(5)
            ->get();

        $brands = Brand::all();

        return Inertia::render('Home', [
            'popularProducts' => $popularProducts,
            'brands' => $brands,
        ]);
    }
}