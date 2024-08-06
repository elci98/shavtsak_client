

export interface shavtsakState {

    SOLDIERS: IDictionary<Soldier>;
    TASKS: IDictionary<Task>;
    PLATOONS: IDictionary<Platoon>
}

export type IDictionary<T> = {[key:string]:T};

export interface Soldier {
    username?: string;
    password?: string;
    privateName?: string;
    LastName?: string;
    _id?: string;
    phoneNumber?: string;
    task?: Task;
    platoon?: Platoon;
};

export interface Task {
    name?: string;
	_id?: string
};

export interface Platoon {
	
    name?: string;
	_id?: string
	
};
