import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoComponent } from './todo.component';
import { TodoService } from '../todo.service';
import { StatusPipe } from '../status.pipe';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let mockTodoService: jasmine.SpyObj<TodoService>;

  beforeEach(() => {
    // ✅ Create a SpyObj for TodoService
    mockTodoService = jasmine.createSpyObj('TodoService', ['getTask', 'addTask', 'deleteTask', 'toggleTask']);

    // ✅ Ensure `getTask()` returns an Observable with correct structure
    mockTodoService.getTask.and.returnValue(of([{ id: 1, title: 'Test task', completed: false }]));

    TestBed.configureTestingModule({
      imports: [FormsModule, CommonModule, StatusPipe],  
      declarations: [],
      providers: [{ provide: TodoService, useValue: mockTodoService }]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch tasks on initialization', () => {
    component.ngOnInit();
    expect(component.tasks.length).toBe(1);
    expect(component.tasks[0].title).toBe('Test task');
    expect(mockTodoService.getTask).toHaveBeenCalledTimes(1);
  });

  it('should add a new task', () => {
    const newTask = 'New Task';
    const mockResponse = { id: 2, title: newTask, completed: false };

    component.newtask = newTask;
    
    // ✅ Fix: Ensure `addTask()` returns an Observable
    mockTodoService.addTask.and.returnValue(of(mockResponse));

    component.addNewTask(); // 🔄 Call the method

    expect(mockTodoService.addTask).toHaveBeenCalledWith(newTask);
    expect(component.tasks).toContain(mockResponse);
    expect(component.newtask).toBe(''); // ✅ Ensure input is cleared
  });

  it('should delete a task', () => {
    component.tasks = [{ id: 1, title: 'Test task', completed: false }];

    // ✅ Fix: Ensure `deleteTask()` returns an Observable
    mockTodoService.deleteTask.and.returnValue(of({}));

    component.deleteTask(1);

    expect(mockTodoService.deleteTask).toHaveBeenCalledWith(1);
    expect(component.tasks.length).toBe(0);
  });

  it('should toggle task completion', () => {
    component.tasks = [{ id: 1, title: 'Test task', completed: false }];

    // ✅ Fix: Ensure `toggleTask()` returns an Observable
    mockTodoService.toggleTask.and.returnValue(of({ completed: true }));

    component.toggleTask(1, false);

    expect(mockTodoService.toggleTask).toHaveBeenCalledWith(1, true);
    expect(component.tasks[0].completed).toBe(true);
  });
});
