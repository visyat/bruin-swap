export interface IListing {
	transaction_id: number;
	user_id: string;
	classDept: string;
	classNum: string;
	classTitle: string;
	classWanted: string[];
	instructor: string;
	lecture: string;
}

export interface IOpenTransaction {
	transaction_id: number;
	classDept: string;
	classNum: string;
	classTitle: string;
	instructor: string;
	lecture: string;
	requested: boolean;
}

export interface IClass {
	classDept: string;
	classNum: string;
	classTitle: string;
	instructor: string;
	lecture: string;
}
