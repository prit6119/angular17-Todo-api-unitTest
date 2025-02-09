import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status',
  standalone: true
})
export class StatusPipe implements PipeTransform {

  transform(tasks: any[], filterBy:string): any[] {
    if(!tasks) return[];
    if(filterBy==='complete') return tasks.filter(t => t.completed===true)
    if(filterBy==='pending') return tasks.filter(t => t.completed===false)
 return tasks;
    
  }

}
