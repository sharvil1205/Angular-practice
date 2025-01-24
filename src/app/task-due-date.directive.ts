import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appTaskDueDate]',
})
export class TaskDueDateDirective {
  constructor(private el: ElementRef) {}

  @Input('appTaskDueDate') set dueDate(isoDateString: string) {
    const dueDate = new Date(isoDateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (dueDate < today) {
      this.el.nativeElement.style.color = 'red';
    } else if (this.isSameDay(dueDate, today)) {
      this.el.nativeElement.style.color = 'orange';
    } else if (this.isWithinNextDays(dueDate, 5)) {
      this.el.nativeElement.style.color = 'yellow';
    }
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  private isWithinNextDays(dueDate: Date, days: number): boolean {
    const today = new Date();
    const nextDays = new Date(today);
    nextDays.setDate(today.getDate() + days);
    return dueDate > today && dueDate <= nextDays;
  }
}
