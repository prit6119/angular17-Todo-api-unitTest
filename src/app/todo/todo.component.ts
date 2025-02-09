import { Component } from '@angular/core';
import { TodoService } from '../todo.service';
import { StatusPipe } from '../status.pipe';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // ✅ Add this

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule, CommonModule, StatusPipe, HttpClientModule],  // ✅ Import here
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  tasks: any[] = [];
  newtask: string = '';
  filterBy: string = 'all';

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.getTask().subscribe((data) => {
      this.tasks = data.slice(0, 5);
    });
  }



  addNewTask() {
    if (this.newtask.trim()) {
      this.todoService.addTask(this.newtask).subscribe((task)=>
        this.tasks.push(task)
         
      )
      this.newtask="";
    }
  }

  deleteTask(id: number) {
    this.todoService.deleteTask(id).subscribe(()=> 
      this.tasks=this.tasks.filter(t=>t.id !==id));
    
  }

  toggleTask(id: number,completed:boolean) {
    this.todoService.toggleTask(id, !completed).subscribe(()=>{
      const task= this.tasks.find(t=>t.id===id);
      if(task){
        task.completed=!task.completed
      }
    }
   
    )
   
  }
}
