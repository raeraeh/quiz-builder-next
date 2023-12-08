import axios, { AxiosResponse } from "axios"
const instance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  timeout: 1000
})

const api = {
  get: instance.get,
  post: instance.post,
  update: instance.put,
  delete: instance.delete,
  get_all: function<ReturnType> (path: string): Promise<AxiosResponse<ReturnType[]>> {
    return instance.get(path)
  }
}

export default api