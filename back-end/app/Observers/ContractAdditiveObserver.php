<?php

namespace App\Observers;

use App\Models\ContractAdditive;

class ContractAdditiveObserver
{
    /**
     * Handle the ContractAdditive "created" event.
     *
     * @param  \App\Models\ContractAdditive  $contractAdditive
     * @return void
     */
    public function created(ContractAdditive $contractAdditive)
    {
        //
    }

    /**
     * Handle the ContractAdditive "updated" event.
     *
     * @param  \App\Models\ContractAdditive  $contractAdditive
     * @return void
     */
    public function updated(ContractAdditive $contractAdditive)
    {
        //
    }

    /**
     * Handle the ContractAdditive "deleted" event.
     *
     * @param  \App\Models\ContractAdditive  $contractAdditive
     * @return void
     */
    public function deleted(ContractAdditive $contractAdditive)
    {
        //
    }

    /**
     * Handle the ContractAdditive "restored" event.
     *
     * @param  \App\Models\ContractAdditive  $contractAdditive
     * @return void
     */
    public function restored(ContractAdditive $contractAdditive)
    {
        //
    }

    /**
     * Handle the ContractAdditive "force deleted" event.
     *
     * @param  \App\Models\ContractAdditive  $contractAdditive
     * @return void
     */
    public function forceDeleted(ContractAdditive $contractAdditive)
    {
        //
    }
}
