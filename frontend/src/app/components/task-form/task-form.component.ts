import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  id?: number;
  title = '';
  description = '';
  completed = false;
  isEditMode = false;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.isEditMode = true;
      this.taskService.getTaskById(this.id).subscribe(task => {
        this.title = task.title;
        this.description = task.description;
        this.completed = task.completed;
      });
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      this.taskService.updateTask(this.id!, { title: this.title, description: this.description, completed: this.completed }).subscribe(() => {
        this.snackBar.open('Task updated!', 'Close', { duration: 3000 });
        this.router.navigate(['/']);
      });
    } else {
      this.taskService.createTask({ title: this.title, description: this.description, completed: false }).subscribe(() => {
        this.snackBar.open('Task created!', 'Close', { duration: 3000 });
        this.router.navigate(['/']);
      });
    }
  }
}
