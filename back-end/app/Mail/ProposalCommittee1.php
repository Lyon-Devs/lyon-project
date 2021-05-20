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

    private Proposal $proposal;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($proposal)
    {
        $this->proposal = $proposal;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $this->subject($this->proposal->cod_lyon . ' COMITÊ 1');
        $email = $this->view('emails.committee1', ['proposal' => $this->proposal]);
        $files = $this->proposal->files;
        if (count($files)) {
            foreach ($files as $file) {
                $email->attach(storage_path('app/public/' . $file->path));
            }
        }
        return $email;
    }
}
