import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appResaltarEstado]',
  standalone: true
})
export class ResaltarEstadoDirective implements OnChanges {
  // Recibiremos el estado desde el HTML
  @Input('appResaltarEstado') estado: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(): void {
    if (this.estado === 'mantenimiento') {
      // Aplica estilos Bootstrap de advertencia usando Renderer2 (buenas prácticas)
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#fff3cd');
      this.renderer.setStyle(this.el.nativeElement, 'border-left', '5px solid #ffc107');
    }
  }
}