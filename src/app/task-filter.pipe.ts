import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskFilter',
  pure: false,
})
export class TaskFilterPipe implements PipeTransform {
  transform(tasks: any[], filterText: string): any[] {
    if (!tasks || !filterText) return tasks;

    const lowerCaseFilter = filterText.toLowerCase();

    return tasks.filter((task) => {
      return (
        task.taskName?.toLowerCase().includes(lowerCaseFilter) ||
        (task.taskDescription &&
          task.taskDescription.toLowerCase().includes(lowerCaseFilter)) ||
        task.dueDate?.toLowerCase().includes(lowerCaseFilter) ||
        task.tags?.toLowerCase().includes(lowerCaseFilter)
      );
    });
  }
}
