
import { Action } from '@ngrx/store';
import { Soldier, Task } from './model';

export class Actions {

	static readonly UPDATE_SOLDIER: string='UPDATE_SOLDIER';
	static readonly DELETE_SOLDIER: string='DELETE_SOLDIER';
	static readonly UPDATE_TASK: string='UPDATE_TASK';
	static readonly DELETE_TASK: string='DELETE_TASK';

    
}

export interface UpdateSoldierAction extends Action{
    soldier?: Soldier
}

export interface DeleteSoldierAction extends Action{
    _id?: string
}

export interface UpdateTaskAction extends Action{
    task?: Task
}

export interface DeleteTaskAction extends Action{
    _id?: string
}
