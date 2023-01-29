import {Component, Input} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-form-control-errors',
  templateUrl: './form-control-errors.component.html',
  styleUrls: ['./form-control-errors.component.scss']
})
export class FormControlErrorsComponent {

  @Input() control!: FormControl;
  @Input() controlName!: string;

}
