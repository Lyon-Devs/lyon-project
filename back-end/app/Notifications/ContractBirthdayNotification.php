<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ContractBirthdayNotification extends Notification
{
    use Queueable;

    private $contracts;
    private $days;
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($contracts, $days)
    {
        $this->contracts = $contracts;
        $this->days = $days;
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
        $mailMessage = (new MailMessage)
            ->greeting('Olá!!')
            ->subject('Contratos com aniversário próximo')
            ->line("Segue os contratos com aniversário nos próximos " . $this->days . " dias:");
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
