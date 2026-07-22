import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskStore } from './features/tasks/task-store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  [x: string]: any;
  protected readonly title = 'Gestor de tareas';

  store = inject(TaskStore);
}
