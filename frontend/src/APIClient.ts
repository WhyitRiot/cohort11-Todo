import axios from "axios";

export async function getTasks() {
    try {
        const response = await axios.get("http:/localhost:8080/api/v1/task/all");
        console.log(response)
        return response.data;
    } catch (error) {
        console.error(error);
    }
}