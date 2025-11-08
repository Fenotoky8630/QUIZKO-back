<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
                'name' => $this->faker->sentence,
                'description' => $this->faker->paragraph,
                'is_available'=>$this->faker->randomElement([true,false]),
                'nb_allowed' => $this->faker->numberBetween(1,5),
        ];
    }
}
