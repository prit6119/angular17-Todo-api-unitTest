import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';

export const routes: Routes = [
    {path: '', component: TodoComponent},
    {path: 'todo', component: AppComponent}
];
