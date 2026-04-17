import type {Category} from "../utilities/TaskType.ts";
import {useContext} from "react";
import {TaskContext} from "../context/TaskContextProvider.tsx";
import * as yup from "yup";
import {type FieldValues, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

type CategoryEditFormProps = {
    initialCategory: Category
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
}

const CategoryEditForm = ({initialCategory, setIsEdit} : CategoryEditFormProps) =>{
    const context = useContext(TaskContext);
    if (!context){
        throw Error("outside of provider!");
    }
    const {categories, updateCategory} = context;
    const schema = yup.object({
        label: yup.string().required("Please enter a label.").notOneOf(categories.map(item => {if (item.label != initialCategory.label) return item.label}), "Category already exists!")
    })
    type formData = yup.InferType<typeof schema>;
    const labelInput = "label";
    const {register, handleSubmit, setValue, reset, formState: {errors}} = useForm({
        defaultValues: {
            label: initialCategory.label
        },
        resolver: yupResolver(schema)
    })
    const handleChange = (e : React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        const {name, value} = e.target;
        setValue(name as keyof formData, value as any, {
            shouldValidate: true,
            shouldDirty: true
        })
    }
    const onSubmit = async (data : FieldValues) =>{
        const parsedData = await schema.validate(data);
        const newCategory: Category ={
            label: parsedData.label,
            id: initialCategory.id
        }
        await updateCategory(newCategory);
        reset()
        setIsEdit(false);
    }
    return(
        <form onSubmit={handleSubmit(data=>onSubmit(data))}
              className={"flex flex-row justify-between"}
        >
            <input type={"text"} {...register(labelInput)} placeholder={initialCategory.label} onChange={e=>handleChange(e)}></input>
            <p className={"text-red"}>{errors.label?.message}</p>
            <button type={"submit"} className={"border rounded bg-white text-black hover:bg-gray-200 transition-colors duration-300 cursor-pointer"}>Save</button>
        </form>
    )
};

export default CategoryEditForm;