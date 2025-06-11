import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../../models/task.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-update-task',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {
  taskId!: number;
  task: Task = { id: 0, title: '', description: '', completed: false };

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router
  ) {}

ngOnInit(): void {
  this.taskId = Number(this.route.snapshot.paramMap.get('id'));
  this.taskService.getTaskById(this.taskId).subscribe(task => {
    if (task) {
      this.task = task;
    }
  });
}


  updateTask(): void {
    this.taskService.updateTask(this.taskId, this.task).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
