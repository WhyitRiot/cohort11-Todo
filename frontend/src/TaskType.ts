export type Task = {
    title: string,
    description: string,
    isComplete: boolean
    category:{
        label: string,
        id: number | null
    },
    id: number | null
}