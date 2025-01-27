import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TasksService {
  private readonly API_BASE_URL =
    'https://freeapi.miniprojectideas.com/api/JWT';

  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<any> {
    return this.http.get(`${this.API_BASE_URL}/GetAllTaskList`);
  }

  addTask(task: {
    itemId: number;
    taskName: string;
    taskDescription: string;
    dueDate: string;
    isCompleted: boolean;
    tags: string;
    completedOn: string;
    createdOn: string;
  }): Observable<any> {
    return this.http.post(`${this.API_BASE_URL}/CreateNewTask`, task);
  }

  updateTask(task: {
    itemId: number;
    taskName: string;
    taskDescription: string;
    dueDate: string;
    isCompleted: boolean;
    tags: string;
    completedOn: string;
  }): Observable<any> {
    return this.http.put(`${this.API_BASE_URL}/UpdateTask`, task);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.API_BASE_URL}/DeleteTask`, {
      params: new HttpParams().set('itemId', id),
    });
  }
}
