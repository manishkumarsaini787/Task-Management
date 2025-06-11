import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { TaskService } from '../../services/task.service';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  pendingTasks: Task[] = [];
  completedTasks: Task[] = [];

  constructor(private taskService: TaskService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data;
      this.pendingTasks = this.tasks.filter(t => !t.completed);
      this.completedTasks = this.tasks.filter(t => t.completed);
    });
  }

  toggleComplete(task: Task) {
    this.taskService.updateTask(task.id, { completed: !task.completed }).subscribe(() => {
      this.snackBar.open(`Task marked ${task.completed ? 'pending' : 'completed'}`, 'Close', { duration: 3000 });
      this.loadTasks();
    });
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.snackBar.open('Task deleted', 'Close', { duration: 3000 });
      this.loadTasks();
    });
  }
}
