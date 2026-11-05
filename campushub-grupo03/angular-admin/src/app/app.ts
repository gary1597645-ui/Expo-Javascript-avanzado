import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// Importa la clase de tu Navbar (verifica si Angular la llamó Navbar o NavbarComponent en tu archivo navbar.ts)
import { Navbar } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  // Aquí se incluyen ambos módulos correctamente dentro del decorador
  imports: [RouterOutlet, Navbar],
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('angular-admin');
}