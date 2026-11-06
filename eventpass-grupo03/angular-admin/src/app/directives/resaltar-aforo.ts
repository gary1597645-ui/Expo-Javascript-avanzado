import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appResaltarAforo]',
  standalone: true
})
export class ResaltarAforoDirective implements OnChanges {
  @Input('appResaltarAforo') estado: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(): void {
    const agotado = this.estado === 'agotado';
    const ultimosCupos = this.estado === 'ultimos-cupos';
    this.renderer.setStyle(this.el.nativeElement, 'background-color',
      agotado ? '#f8d7da' : ultimosCupos ? '#fff3cd' : null);
    this.renderer.setStyle(this.el.nativeElement, 'border-left',
      agotado ? '5px solid #dc3545' : ultimosCupos ? '5px solid #ffc107' : null);
  }
}