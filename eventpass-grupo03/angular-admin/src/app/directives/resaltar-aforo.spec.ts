import { ElementRef, Renderer2 } from '@angular/core';
import { ResaltarAforoDirective } from './resaltar-aforo';

describe('ResaltarAforoDirective', () => {
  it('highlights a full event', () => {
    const styles: Array<[string, string | null]> = [];
    const renderer = {
      setStyle: (_element: unknown, name: string, value: string | null) => styles.push([name, value])
    } as unknown as Renderer2;
    const directive = new ResaltarAforoDirective(new ElementRef({}), renderer);
    directive.estado = 'agotado';

    directive.ngOnChanges();

    expect(styles).toContainEqual(['background-color', '#f8d7da']);
  });
});
