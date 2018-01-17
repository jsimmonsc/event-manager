import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-fancy-input',
  templateUrl: './fancy-input.component.html',
  styleUrls: ['./fancy-input.component.scss'],
})
export class FancyInputComponent {
  @Input() placeholder = '';
  @Input() value = '';
  @Input() disabled = false;
  @Input() maxlength = '';
  @Input() autoFocus = false;

  hasFocus = false;
}
