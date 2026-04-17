import React, {useContext} from 'react';
import {TaskContext} from "../context/TaskContextProvider.tsx";
import {CategoryForm} from "../components/CategoryForm.tsx";
import {CategoryItem} from "../components/CategoryItem.tsx";

const Categories = () => {
    const context = useContext(TaskContext);
    if (!context){
        throw Error("outside of provider!");
    }
    const {categories, fetchCategories, addCategory} = context;
    return (
        <>
            <h2 className={'font-extrabold'}>Categories</h2>
            <ul id={"list"} className={'grid grid-cols-3 gap-4'}>
                {categories.length > 0 ? (
                    categories.map((category) => <CategoryItem key={category.id} initialCategory={category}/>)
                ) : (
                    <li>No Categories found.</li>
                )}
            </ul>
            <CategoryForm onSuccess={fetchCategories} saveCategory={addCategory}/>
        </>
    );
};

export default Categories;