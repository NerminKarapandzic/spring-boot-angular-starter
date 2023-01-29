import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bucketname'
})
export class BucketnamePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    const splitValues = value.split('_');
    return splitValues[0];
  }

}
