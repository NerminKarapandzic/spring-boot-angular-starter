import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BucketnamePipe } from './bucketname.pipe';



@NgModule({
    declarations: [
        BucketnamePipe
    ],
    exports: [
        BucketnamePipe
    ],
    imports: [
        CommonModule
    ]
})
export class PipesModule { }
