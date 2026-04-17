import type {Category} from "../utilities/TaskType.ts"
import {useContext, useState} from "react";
import CategoryEditForm from "./CategoryEditForm.tsx";
import {TaskContext} from "../context/TaskContextProvider.tsx";

type CategoryItemProps = {
    initialCategory: Category;
};

export const CategoryItem = ({ initialCategory }: CategoryItemProps) => {
    const context = useContext(TaskContext);
    if (!context){
        throw Error("outside of provider!");
    }
    const {deleteCategory} = context;
    const [isOpen, setIsOpen] = useState(false);

    const handleDelete = async () =>{
        if (initialCategory.id){
            await deleteCategory(initialCategory.id);
        }
    }

    return (
        <li
            className="flex justify-center relative group p-1 card bg-white text-black overflow-hidden min-h-10"
            aria-label={`Category ${initialCategory.id}`}
            id={initialCategory.id? initialCategory.id.toString() : "undefined"}
        >
            { isOpen ? <CategoryEditForm setIsEdit={setIsOpen} initialCategory={initialCategory} /> : <>
                <b>{initialCategory.label}</b>
                <div className={"flex flex-row gap-2 bg-white text-black absolute right-10 opacity-10 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 z-10"} >
                    <button onClick={()=>setIsOpen(true)} className={"border w-20 rounded cursor-pointer hover:bg-blue-200 bg-white transition-all duration-300"}>Edit</button>
                    <button onClick={handleDelete} className={"text-red border w-20 border-red-500 rounded p-1 cursor-pointer shadow-accent hover:bg-red-200 bg-white transition-all duraiton-300"}>Delete</button>
                </div> </>}
        </li>
    );
};