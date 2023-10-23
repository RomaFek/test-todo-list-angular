export interface ITask {
    id: number,
    description: string | null,
    endDate: string | null,
    collectionTask: string | null,
    isCompleted: boolean
}
