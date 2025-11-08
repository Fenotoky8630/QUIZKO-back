<?php

namespace App\Events;

use App\Models\Interview;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class InterviewStatusChanged implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $interviewId;
    public $isActive;

    public function __construct($interviewId, $isActive)
    {
        $this->interviewId = $interviewId;
        $this->isActive = $isActive;
    }

    public function broadcastOn()
    {
        return new Channel('interview-status.'.$this->interviewId);
    }

    public function broadcastAs()
    {
        return 'interview.status.changed';
    }
}
