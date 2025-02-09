import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // ✅ Import HttpClient
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  tasks: any[] = [];
  private url = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) {} 

  getTask() {
    return this.http.get<any[]>(this.url);
  }


  addTask(title: string) {
    const task = { title, completed: false };
    return this.http.post<any>(this.url, task)
  }

  toggleTask(id: number, completed:boolean) {
   return this.http.put<any>(`${this.url}/${id}` ,{completed})
  }

  
  deleteTask(id: number) {
    return this.http.delete<any>(`${this.url}/${id}`)
  }
}
