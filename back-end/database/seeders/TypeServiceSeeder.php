<?php

namespace Database\Seeders;

use App\Models\TypeService;
use Illuminate\Database\Seeder;

class TypeServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $path = __DIR__ . "/data/type_service.csv";
        $row = 1;
        if (($handle = fopen($path, "r")) !== FALSE) {
            while (($data = fgetcsv($handle, 1000, ";")) !== FALSE) {
                $num = count($data);
                $row++;
                for ($c = 0; $c < $num; $c++) {
                    // echo $data[$c] . "\n";
                    if ($data[$c]) {
                        $dataExplode = explode(',', $data[$c]);
                        TypeService::create([
                            'name' => $dataExplode[0],
                            'unity_business' => $dataExplode[1]
                        ]);
                    }
                }
            }
            fclose($handle);
        }
    }
}
