import { Component, signal, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Task } from './task';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = 'Gestor de tareas';

  tareas = signal<Task[]>([
    { id: 1, titulo: 'Aprender angular', completada: false },
    { id: 2, titulo: 'Construir un proyecto nuevo', completada: false },
    { id: 3, titulo: 'Dominar signals', completada: true },
  ]);

  agregar(titulo: string): void {
    const limpio = titulo.trim();
    if (!limpio) {
      return;
    }

    this.tareas.update((lista) => [
      ...lista,
      { id: Date.now(), titulo: limpio, completada: false },
    ]);
  }

  toggle(id: number): void {
    this.tareas.update((lista) =>
      lista.map((t) => (t.id === id ? { ...t, completada: !t.completada } : t)),
    );
  }

  eliminar(id: number): void {
    this.tareas.update(lista =>
      lista.filter(tarea => tarea.id !== id)
    );
  }
}
