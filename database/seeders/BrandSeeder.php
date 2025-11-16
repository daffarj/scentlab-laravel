<?php

namespace Database\Seeders;

use App\Models\Brand;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
{
    public function run(): void
    {
        $brands = [
            ['name' => 'MYKONOS', 'logo' => '🇬🇷'],
            ['name' => 'AFNAN', 'logo' => '🌟'],
            ['name' => 'ZIMAYA', 'logo' => '✨'],
            ['name' => 'AHMED', 'logo' => '👑'],
            ['name' => 'MANDALIKA', 'logo' => '🌺'],
            ['name' => 'BALI PERFUME', 'logo' => '🌴'],
        ];

        foreach ($brands as $brand) {
            Brand::create($brand);
        }
    }
}