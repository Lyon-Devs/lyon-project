<?php

namespace App\Notifications;

use App\Models\Contract;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ContractDeadlineNotification extends Notification
{
    use Queueable;

    private $contracts;
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($contracts)
    {
        $this->contracts = $contracts;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $mailMessage =  (new MailMessage)
            ->greeting('Olá!!')
            ->subject('Contratos com vencimento próximo')
            ->line('Segue os contratos com vencimento nos próximos quinze dias:');
        foreach ($this->contracts as $contract) {
            $client = $contract->proposal->client;
            $mailMessage->line("Cliente {$client->name}, Nª. Contrato {$contract->contract_number}, vencimento {$contract->date_end->format('d/m/y')}");
        }
        return $mailMessage;
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
