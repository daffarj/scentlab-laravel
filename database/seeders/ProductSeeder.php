<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'name' => 'Midnight Essence',
                'brand' => 'MYKONOS',
                'price' => 129.99,
                'rating' => 4.5,
                'review_count' => 234,
                'image_url' => 'https://images.unsplash.com/photo-1719175936556-dbd05e415913?w=1080',
                'gender' => 'Male',
                'category' => 'Eau de Parfum',
                'fragrance_notes' => ['Bergamot', 'Cedar', 'Amber', 'Vanilla', 'Musk'],
                'sillage' => 8,
                'projection' => 7,
                'longevity' => 9,
                'description' => 'A captivating blend of woody and oriental notes, perfect for evening wear. The rich combination of cedar and amber creates a sophisticated and memorable scent that lasts throughout the night.',
                'purchase_link' => '#'
            ],
            [
                'name' => 'Rose Garden Dreams',
                'brand' => 'AFNAN',
                'price' => 89.99,
                'rating' => 4.8,
                'review_count' => 456,
                'image_url' => 'https://images.unsplash.com/photo-1759793500112-c588839cfc6e?w=1080',
                'gender' => 'Female',
                'category' => 'Eau de Toilette',
                'fragrance_notes' => ['Rose', 'Jasmine', 'Peony', 'White Musk', 'Sandalwood'],
                'sillage' => 6,
                'projection' => 6,
                'longevity' => 7,
                'description' => 'An elegant floral composition that celebrates the beauty of roses. Light yet sophisticated, perfect for daytime wear and special occasions.',
                'purchase_link' => '#'
            ],
            [
                'name' => 'Ocean Breeze',
                'brand' => 'ZIMAYA',
                'price' => 99.99,
                'rating' => 4.3,
                'review_count' => 189,
                'image_url' => 'https://images.unsplash.com/photo-1708486235073-14879ff14c4c?w=1080',
                'gender' => 'Unisex',
                'category' => 'Eau de Parfum',
                'fragrance_notes' => ['Sea Salt', 'Citrus', 'Marine Accord', 'Driftwood', 'Ambergris'],
                'sillage' => 7,
                'projection' => 7,
                'longevity' => 8,
                'description' => 'Fresh and invigorating, inspired by coastal winds and ocean waves. A clean, aquatic scent that evokes memories of seaside summers.',
                'purchase_link' => '#'
            ],
            [
                'name' => 'Golden Oud',
                'brand' => 'AHMED',
                'price' => 159.99,
                'rating' => 4.9,
                'review_count' => 567,
                'image_url' => 'https://images.unsplash.com/photo-1719175936556-dbd05e415913?w=1080',
                'gender' => 'Unisex',
                'category' => 'Extrait de Parfum',
                'fragrance_notes' => ['Oud', 'Saffron', 'Rose', 'Leather', 'Patchouli'],
                'sillage' => 9,
                'projection' => 9,
                'longevity' => 10,
                'description' => 'A luxurious and opulent fragrance featuring the finest oud. Rich, deep, and intensely captivating with exceptional longevity.',
                'purchase_link' => '#'
            ],
            [
                'name' => 'Citrus Sunrise',
                'brand' => 'MANDALIKA',
                'price' => 79.99,
                'rating' => 4.4,
                'review_count' => 312,
                'image_url' => 'https://images.unsplash.com/photo-1759793500112-c588839cfc6e?w=1080',
                'gender' => 'Unisex',
                'category' => 'Eau de Cologne',
                'fragrance_notes' => ['Lemon', 'Orange', 'Grapefruit', 'Vetiver', 'Green Tea'],
                'sillage' => 5,
                'projection' => 5,
                'longevity' => 6,
                'description' => 'Bright and energizing citrus blend perfect for daily wear. Fresh, clean, and uplifting with a subtle green tea base.',
                'purchase_link' => '#'
            ],
            [
                'name' => 'Velvet Noir',
                'brand' => 'MYKONOS',
                'price' => 139.99,
                'rating' => 4.7,
                'review_count' => 423,
                'image_url' => 'https://images.unsplash.com/photo-1708486235073-14879ff14c4c?w=1080',
                'gender' => 'Female',
                'category' => 'Eau de Parfum',
                'fragrance_notes' => ['Black Orchid', 'Truffle', 'Plum', 'Patchouli', 'Vanilla'],
                'sillage' => 8,
                'projection' => 8,
                'longevity' => 9,
                'description' => 'Dark, mysterious, and utterly luxurious. A bold statement fragrance for confident women who dare to be different.',
                'purchase_link' => '#'
            ],
            [
                'name' => 'Spice Route',
                'brand' => 'BALI PERFUME',
                'price' => 94.99,
                'rating' => 4.2,
                'review_count' => 178,
                'image_url' => 'https://images.unsplash.com/photo-1719175936556-dbd05e415913?w=1080',
                'gender' => 'Male',
                'category' => 'Eau de Parfum',
                'fragrance_notes' => ['Cardamom', 'Pepper', 'Tobacco', 'Leather', 'Tonka Bean'],
                'sillage' => 7,
                'projection' => 8,
                'longevity' => 8,
                'description' => 'Warm, spicy, and masculine. A journey through exotic spice markets with a modern leather twist.',
                'purchase_link' => '#'
            ],
            [
                'name' => 'White Tea & Lily',
                'brand' => 'ZIMAYA',
                'price' => 84.99,
                'rating' => 4.6,
                'review_count' => 289,
                'image_url' => 'https://images.unsplash.com/photo-1759793500112-c588839cfc6e?w=1080',
                'gender' => 'Female',
                'category' => 'Eau de Toilette',
                'fragrance_notes' => ['White Tea', 'Lily', 'Freesia', 'Iris', 'Soft Musk'],
                'sillage' => 6,
                'projection' => 6,
                'longevity' => 7,
                'description' => 'Pure, delicate, and serene. A calming floral fragrance that embodies grace and simplicity.',
                'purchase_link' => '#'
            ],
            [
                'name' => 'Amber Nights',
                'brand' => 'AFNAN',
                'price' => 119.99,
                'rating' => 4.5,
                'review_count' => 345,
                'image_url' => 'https://images.unsplash.com/photo-1708486235073-14879ff14c4c?w=1080',
                'gender' => 'Unisex',
                'category' => 'Eau de Parfum',
                'fragrance_notes' => ['Amber', 'Incense', 'Myrrh', 'Cedarwood', 'Honey'],
                'sillage' => 8,
                'projection' => 7,
                'longevity' => 9,
                'description' => 'Warm, resinous, and deeply comforting. A spiritual fragrance inspired by ancient temples and sacred rituals.',
                'purchase_link' => '#'
            ],
            [
                'name' => 'Fresh Lavender',
                'brand' => 'MANDALIKA',
                'price' => 69.99,
                'rating' => 4.1,
                'review_count' => 156,
                'image_url' => 'https://images.unsplash.com/photo-1719175936556-dbd05e415913?w=1080',
                'gender' => 'Unisex',
                'category' => 'Eau de Cologne',
                'fragrance_notes' => ['Lavender', 'Mint', 'Eucalyptus', 'Sage', 'Oakmoss'],
                'sillage' => 5,
                'projection' => 5,
                'longevity' => 6,
                'description' => 'Crisp, aromatic, and refreshing. A classic herbal fragrance perfect for everyday wear.',
                'purchase_link' => '#'
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}