<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Brand;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class AdminProductController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Product::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('brand', 'like', "%{$search}%");
            });
        }

        $products = $query->latest()->paginate(12)->withQueryString();

        return Inertia::render('Admin/Products', [
            'products' => $products,
            'search' => $request->search,
        ]);
    }

    public function create(): Response
    {
        $brands = Brand::all();

        return Inertia::render('Admin/ProductForm', [
            'brands' => $brands,
            'product' => null,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'brand' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'gender' => 'required|in:Male,Female,Unisex',
            'category' => 'required|string',
            'fragrance_notes' => 'required|string',
            'sillage' => 'required|integer|min:1|max:10',
            'projection' => 'required|integer|min:1|max:10',
            'longevity' => 'required|integer|min:1|max:10',
            'description' => 'required|string',
            'purchase_link' => 'nullable|url',
            'image_url' => 'nullable|url',
        ]);

        // Convert comma-separated notes to array
        $validated['fragrance_notes'] = array_map('trim', explode(',', $validated['fragrance_notes']));
        
        if (empty($validated['image_url'])) {
            $validated['image_url'] = 'https://images.unsplash.com/photo-1719175936556-dbd05e415913?w=1080';
        }

        Product::create($validated);

        return redirect()->route('admin.products.index')
            ->with('success', 'Product created successfully!');
    }

    public function edit(Product $product): Response
    {
        $brands = Brand::all();

        // Convert array to comma-separated string for form
        $product->fragrance_notes_string = implode(', ', $product->fragrance_notes);

        return Inertia::render('Admin/ProductForm', [
            'brands' => $brands,
            'product' => $product,
        ]);
    }

    public function update(Request $request, Product $product): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'brand' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'gender' => 'required|in:Male,Female,Unisex',
            'category' => 'required|string',
            'fragrance_notes' => 'required|string',
            'sillage' => 'required|integer|min:1|max:10',
            'projection' => 'required|integer|min:1|max:10',
            'longevity' => 'required|integer|min:1|max:10',
            'description' => 'required|string',
            'purchase_link' => 'nullable|url',
            'image_url' => 'nullable|url',
        ]);

        // Convert comma-separated notes to array
        if (is_string($validated['fragrance_notes'])) {
            $validated['fragrance_notes'] = array_map('trim', explode(',', $validated['fragrance_notes']));
        }

        $product->update($validated);

        return redirect()->route('admin.products.index')
            ->with('success', 'Product updated successfully!');
    }

    public function destroy(Product $product): RedirectResponse
    {
        $product->delete();

        return back()->with('success', 'Product deleted successfully!');
    }
}