<?php

namespace Database\Seeders;

use App\Models\Review;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::where('role', 'user')->first();
        $product1 = Product::where('name', 'Midnight Essence')->first();

        if ($user && $product1) {
            Review::create([
                'product_id' => $product1->id,
                'user_id' => $user->id,
                'rating' => 5,
                'comment' => 'Absolutely love this fragrance! The longevity is incredible and I receive compliments all the time.',
            ]);

            Review::create([
                'product_id' => $product1->id,
                'user_id' => $user->id,
                'rating' => 4,
                'comment' => 'Great scent but a bit too strong for my taste. Perfect for evening events though!',
            ]);
        }
    }
}