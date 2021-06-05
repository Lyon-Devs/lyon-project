<?php

namespace App\Imports;

use App\Models\Proposal;
use App\Models\ProposalUser;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ProposalImport implements ToModel, WithHeadingRow
{

    public function startRow(): int
    {
        return 2;
    }

    public function model(array $model)
    {
        $data = \array_splice($model, 1, count($model) - 4);

        $proposal = new Proposal($data);
        $proposal->saveQuietly();
        return $proposal;
    }
}
