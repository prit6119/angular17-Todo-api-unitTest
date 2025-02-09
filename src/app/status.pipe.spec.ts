import { StatusPipe } from './status.pipe';

describe('StatusPipe', () => {
  let pipe: StatusPipe;

  beforeEach(() => {
    pipe = new StatusPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return all tasks when filter is "all"', () => {
    const tasks = [
      { id: 1, title: 'Task 1', completed: true },
      { id: 2, title: 'Task 2', completed: false },
      { id: 3, title: 'Task 3', completed: true }
    ];
    expect(pipe.transform(tasks, 'all')).toEqual(tasks);
  });

  it('should return only completed tasks when filter is "complete"', () => {
    const tasks = [
      { id: 1, title: 'Task 1', completed: true },
      { id: 2, title: 'Task 2', completed: false },
      { id: 3, title: 'Task 3', completed: true }
    ];
    const expectedOutput = [
      { id: 1, title: 'Task 1', completed: true },
      { id: 3, title: 'Task 3', completed: true }
    ];
    expect(pipe.transform(tasks, 'complete')).toEqual(expectedOutput);
  });

  it('should return only pending tasks when filter is "pending"', () => {
    const tasks = [
      { id: 1, title: 'Task 1', completed: true },
      { id: 2, title: 'Task 2', completed: false },
      { id: 3, title: 'Task 3', completed: true }
    ];
    const expectedOutput = [{ id: 2, title: 'Task 2', completed: false }];
    expect(pipe.transform(tasks, 'pending')).toEqual(expectedOutput);
  });

  it('should return an empty array when tasks list is null or undefined', () => {
    expect(pipe.transform(null as any, 'complete')).toEqual([]);
    expect(pipe.transform(undefined as any, 'pending')).toEqual([]);
  });
});
