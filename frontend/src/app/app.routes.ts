import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { UpdateTaskComponent } from './components/update-task/update-task.component';

export const routes: Routes = [
  { path: '', component: TaskListComponent },
  { path: 'add', component: TaskFormComponent },
    { path: 'update/:id', component: UpdateTaskComponent },
  { path: '**', redirectTo: '' }
];
