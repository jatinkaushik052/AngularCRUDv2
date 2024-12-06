import { Routes } from '@angular/router';
import { AddUserComponent } from './component/add-user/add-user.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { MsgComponent } from './component/msg/msg.component';

export const routes: Routes = [
    {
        path: '',
        component: MsgComponent
    },
    {
        path: 'adduser',
        component: AddUserComponent
    },
    {
        path: 'adduser/:id',
        component: AddUserComponent
    },
    {
        path: 'userlist',
        component: UserListComponent
    }
];
