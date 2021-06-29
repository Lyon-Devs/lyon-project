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
            ->subject("ATENÇÃO! CONTRATO PRÓXIMO AO PERÍODO DE REAJUSTE ($this->days Dias) Centro custo")
            ->greeting('Prezados')
            ->line("Os contratos a seguir estão próximo ao período de reajuste.")
            ->line("Gentileza atentar-se ao período de solicitação junto ao cliente, 
                    seguir os critérios estabelecidos contratualmente, caso o contrato 
                    não possua uma cláusula de reajuste, entre em contato com setor Comercial Lyon.");
        foreach ($this->contracts as $contract) {
            $client = $contract->proposal->client;
            $mailMessage->line("
                {$client->name},
                Nª. Contrato {$contract->contract_number},
                vencimento {$contract->date_end->format('d/m/y')},
                data base reajuste {$contract->readjustment_base_date->format('d/m/y')}
            ");
        }
        $mailMessage->line('Att,');
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
