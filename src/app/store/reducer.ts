import {ActionReducer, Action} from '@ngrx/store';
import { Actions, DeleteSoldierAction, DeleteTaskAction, UpdateSoldierAction, UpdateTaskAction } from './actions';
import { shavtsakState } from './model';


const handlers = {
	[Actions.UPDATE_SOLDIER]: updateSoldier,
	[Actions.DELETE_SOLDIER]: deleteSoldier,
	[Actions.UPDATE_TASK]: updateTask,
	[Actions.DELETE_TASK]: deleteTask,
};


function updateSoldier(state: shavtsakState, action: UpdateSoldierAction){
	const SOLDIERS = {
		...state.TASKS,
	};
    
	if(action?.soldier?._id){
		SOLDIERS[action.soldier?._id]=action.soldier;
	}
	return {
		...state,
		SOLDIERS
	};
}
function deleteSoldier(state: shavtsakState, action: DeleteSoldierAction){
	const SOLDIERS = {...state.SOLDIERS};
	if(action?._id){
		delete SOLDIERS[action._id];
	}
	return {
		...state,
		SOLDIERS
	};
}

function updateTask(state: shavtsakState, action: UpdateTaskAction){
	const TASKS = {
		...state.TASKS,
	};
    
	if(action?.task?._id){
		TASKS[action.task?._id]=action.task;
	}

	return {
		...state,
		TASKS
	};
}
function deleteTask(state: shavtsakState, action: DeleteTaskAction){
	const TASKS = {...state.SOLDIERS};
	if(action?._id){
		delete TASKS[action._id];
	}
	return {
		...state,
		TASKS
	};
}

const initialState = {
	SOLDIERS: {},
	TASKS: {},
	PLATOONS: {}
};

export const createReducer: ActionReducer<shavtsakState, Action> = (state = initialState, action: Action) => {
	if(handlers[action.type]){
		return handlers[action.type](state, action);
	}
	return state;
};