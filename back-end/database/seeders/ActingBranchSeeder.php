<?php

namespace Database\Seeders;

use App\Models\ActingBranch;
use Illuminate\Database\Seeder;

class ActingBranchSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $path = __DIR__ . "/data/acting_branch.csv";
        $row = 1;
        if (($handle = fopen($path, "r")) !== FALSE) {
            while (($data = fgetcsv($handle, 1000, ";")) !== FALSE) {
                $num = count($data);
                $row++;
                for ($c = 0; $c < $num; $c++) {
                    // echo $data[$c] . "\n";
                    if ($data[$c]) {
                        $dataExplode = explode(',', $data[$c]);
                        ActingBranch::create([
                            'name' => $dataExplode[0],
                        ]);
                    }
                }
            }
            fclose($handle);
        }
    }
}
