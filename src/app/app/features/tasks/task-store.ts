import { computed, effect, Injectable, signal } from '@angular/core';
import { Task } from './task';

const STORAGE_KEY = 'tareas';

@Injectable({
  providedIn: 'root',
})
export class TaskStore {
  tareas = signal<Task[]>(this.cargar());

  pendientes = computed(() => this.tareas().filter((t) => !t.completada).length);
  completadas = computed(() => this.tareas().filter((t) => t.completada).length);

  constructor() {
    effect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tareas()));
    });
  }

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

  eliminarTodo() {
    this.tareas.update(tareas => tareas.filter(tarea => !tarea.completada))
  }

  eliminar(id: number): void {
    this.tareas.update((lista) => lista.filter((t) => t.id !== id));
  }

  toggle(id: number): void {
    this.tareas.update((lista) =>
      lista.map((t) => (t.id === id ? { ...t, completada: !t.completada } : t)),
    );
  }

  private cargar(): Task[] {
    const guardadas = localStorage.getItem(STORAGE_KEY);

    if (guardadas) {
      return JSON.parse(guardadas);
    }
    return [
      { id: 1, titulo: 'Aprender angular', completada: false },
      { id: 2, titulo: 'Construir un proyecto nuevo', completada: false },
      { id: 3, titulo: 'Dominar signals', completada: true },
    ];
  }
}
