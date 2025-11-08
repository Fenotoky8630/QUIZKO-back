<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Candidate>
 */
class CandidateFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'status'=>$this->faker->randomElement(["pending","admitted","failed"]),
            'gender'=>$this->faker->randomElement(["feminine","masculine"]),
            'user_id' => $this->faker->randomElement([1,2,4,6,9]),
            'post_id' => $this->faker->randomElement([1,2]),
           ];
    }
}
