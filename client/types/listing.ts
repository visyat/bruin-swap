export interface IListing {
    transaction_id: number,
    user_id: number,
    classDept: string,
    classNum: string,
    classTitle: string,
    classWanted: string[],
    instructor: string,
    lecture: string,
}