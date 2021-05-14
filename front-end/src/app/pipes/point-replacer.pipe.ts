import { DecimalPipe, registerLocaleData } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';


// tslint:disable-next-line:use-pipe-transform-interface
@Pipe({
    name: 'pointReplacer'
})

export class PointReplacerPipe implements PipeTransform {

    transform(value: string, args: any[]): string {
        if (value) {
            const slipValues = value.split('.');
            const bigger = slipValues[0].split(',').join('.');
            return `${bigger},${slipValues[1]}`;
        }
        return '';
    }
}
