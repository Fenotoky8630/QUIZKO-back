<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Recruiter>
 */
class RecruiterFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'job_title'=>$this->faker->word,
            'user_id' => $this->faker->randomElement([3,8]),
            'department_id' => $this->faker->randomElement([1,2]),
        ];
    }
}
