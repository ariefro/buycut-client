import axios from "axios"

const instance = axios.create({
    baseURL:process.env.NEXT_PUBLIC_API + "/api/v1",
    headers: {
        "Content-Type": "application/json"
    }
})

export default instance;
