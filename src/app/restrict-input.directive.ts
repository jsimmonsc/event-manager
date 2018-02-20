import {Directive, ElementRef, HostListener, Input, OnInit} from "@angular/core";

@Directive({
  selector: '[appRestrictInput]'
})
export class RestrictInputDirective {

  constructor(private element: ElementRef) {
  }

  @Input('appRestrictInput') inputType: string;

  @HostListener('keypress', ['$event']) onKeyPress(event: KeyboardEvent) {
    this.restrictInput(this.inputType, event);
  }

  private restrictInput(type: string, event: KeyboardEvent) {

    const inputChar = String.fromCharCode(event.charCode);
    let pattern = /[0-9\.]/;

    switch (type) {
      case "integer":
        pattern = /[0-9]/;
        break;
      case "decimal":
        pattern = /[0-9\.]/;
        break;
    }

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


}
