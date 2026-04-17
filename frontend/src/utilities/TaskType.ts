export type Category = {
    label: string,
    id?: number
}

export type Task = {
    title: string,
    description: string,
    isComplete: boolean
    category: Category
    id?: number
}

export type TaskEdit = {
    title: string,
    description: string,
    isComplete: boolean,
    categoryLabel: string
}
