package com.taskManagement.TaskManager.Service;



import com.taskManagement.TaskManager.Model.Task;

import java.util.List;
import java.util.Optional;

public interface TaskService {

    List<Task> getAllTasks();

    List<Task> getTasksByCompletionStatus(boolean completed);

    Optional<Task> getTaskById(Long id);

    Task createTask(Task task);

    Task updateTask(Long id, Task task);

    void deleteTask(Long id);

    Task markAsCompleted(Long id);
}
