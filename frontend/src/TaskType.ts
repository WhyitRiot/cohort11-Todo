export type Category = {
    label: string,
    id: number | null
}

export type Task = {
    title: string,
    description: string,
    isComplete: boolean
    category: Category
    id: number | null
}

export type TaskEdit = {
    title: string,
    description: string,
    isComplete: boolean,
    categoryLabel: string
}
