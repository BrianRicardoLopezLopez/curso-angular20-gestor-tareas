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

todasCompletadas = computed(() => {
  // Obtiene la lista actual de tareas del signal.
  const tareas = this.tareas();

  // Comprueba dos condiciones:
  // 1. Que exista al menos una tarea en la lista.
  // 2. Que todas las tareas tengan completada en true usando every().
  // Si ambas condiciones se cumplen, devuelve true; de lo contrario devuelve false.
  return tareas.length > 0 && tareas.every(t => t.completada);
});


eliminarTodo(): void {
  // Guarda las tareas actuales en una constante.
  const tareas = this.tareas();

  // Comprueba que el arreglo no esté vacío.
  // every() devuelve true solo si todas las tareas están completadas.
  if (tareas.length > 0 && tareas.every(t => t.completada)) {

    // Reemplaza el contenido del signal por un arreglo vacío.
    this.tareas.set([]);
  }
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
