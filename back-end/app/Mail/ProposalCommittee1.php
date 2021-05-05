<?php

namespace App\Mail;

use App\Models\Proposal;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ProposalCommittee1 extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(
        private Proposal $proposal
    ) {
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $this->subject('Propostas na primeira fase');
        $email = $this->markdown('emails.committee1', ['proposal' => $this->proposal]);
        $files = $this->proposal->files;
        if (count($files)) {
            foreach ($files as $file) {
                $email->attach(storage_path('app/public/' . $file->path));
            }
        }
        return $this->markdown('emails.committee1', ['proposal' => $this->proposal]);
    }
}
