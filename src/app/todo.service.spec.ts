import { TestBed } from '@angular/core/testing';
import{HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { TodoService } from './todo.service';
// import { mock } from 'node:test';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[TodoService]
    });
    service = TestBed.inject(TodoService);
    httpMock=TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be fetchall tasks', () =>{
    const mockTasks = [
      { id: 1, title: 'Task 1', completed: false },
      { id: 2, title: 'Task 2', completed: true }
    ];
    service.getTask().subscribe((task)=>{
      expect(task.length).toBe(2);
       expect(task).toEqual(mockTasks);
    
    });
    const req=httpMock.expectOne(service['url']);
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks);
    httpMock.verify();
  });

  it('should add New Task', ()=>{
    const task={ title:'new Task', completed:false}
    service.addTask(task.title).subscribe(()=>{
      expect(task.title).toBe('new Task');
      expect(task.completed).toBe(false);
  
    })
    const req=httpMock.expectOne(service['url']);
    expect(req.request.method).toBe('POST');
    req.flush({id:3, ...task})
   
  })
   it('should be toggle task',()=>{
   const task={id:1, completed:false}
    service.toggleTask(task.id, task.completed).subscribe((task)=>{
      expect(task.id).toBe(1);
      expect(task.completed).toBe(false);
    }) 
    const req=httpMock.expectOne(`${service['url']}/${task.id}`);
    expect(req.request.method).toBe('PUT')
    req.flush(task);

  });
  it('should be delete task',()=>{
    const taskID=1
     service.deleteTask(taskID).subscribe(()=>{
       expect(taskID).toBe(1);
     }) 
     const req=httpMock.expectOne(`${service['url']}/${taskID}`);
     expect(req.request.method).toBe('DELETE')
     req.flush({});
 
   })
});
