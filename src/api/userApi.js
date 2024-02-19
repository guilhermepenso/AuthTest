import { getProduct } from "./get";

export const userLogin = async data => {
    try {
        const result = await getProduct("products")
    } catch (error) {
        return error.response.data
    }
}