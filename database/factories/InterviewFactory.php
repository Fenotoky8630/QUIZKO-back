<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Interview>
 */
class InterviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startDate = $this->faker->dateTimeBetween('now','+1 month');
        return [
           // 'id'=>Str::random(10),
            'name' => $this->faker->word,
            'start_date' =>$startDate ,
            'end_date' => $this->faker->dateTimeBetween('now','+4 month'),
            'time' =>   $this->faker->numberBetween(1,60),
            'is_expired' => false,
            'subject_id' => $this->faker->randomElement([1, 2]),
            'post_id' => $this->faker->randomElement([1, 2]),
        ];
    }
}
