<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Employee;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::create([
                            'name' => "Mr System Admin",
                            'email' => "admin@example.com",
                            'password' => Hash::make('admin@example.com'),
                            'status' => "active",
                            'user_type' => "admin",
                        ]);

        // Create Employee
        Employee::create([
            'user_id' => $user->id,
        ]);
    }
}
