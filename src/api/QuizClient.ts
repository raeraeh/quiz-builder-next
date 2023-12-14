
import api from '.';
import { queryClient } from '../lib/QueryClient';

export interface Quiz {
  id: string;
  name: string;
  steps?: string[]
}

interface CreateQuizRequest {
  name: string;
}

interface UpdateQuizRequest {
  id: string;
  name: string;
  steps: string[]
}

export const quizRoute = 'quizzes'


export const  createQuiz = async (request: CreateQuizRequest) => { 
  const data =  {
    name: request.name,
  }
  const res = await api.post<CreateQuizRequest, Quiz>(`/${quizRoute}`, data)

  
  queryClient.invalidateQueries({queryKey: [quizRoute]})

  return res
}

export const getQuiz = async (id: string) => {
  const res = await api.get<Quiz>(`/${quizRoute}/${id}`)
  return res
}
export const getQuizzes = async () => { 
  return await api.get_all<Quiz>(`/${quizRoute}`)
}

export const deleteQuiz = async (id: string) => { 
  try {
    console.log('id in client', id);
    const res = await api.delete(`/${quizRoute}/${id}`);
    queryClient.invalidateQueries({queryKey: [quizRoute]});
    return res;
  } catch (error) {
    console.error('Error deleting quiz:', error);
    throw error; // Rethrow the error to propagate it to the calling code
  }
}

export const updateQuiz = async (request: UpdateQuizRequest) => {
  const res = api.update<UpdateQuizRequest, Quiz>(`/${quizRoute}/${request.id}`, request)
  queryClient.invalidateQueries({queryKey: [quizRoute]})
  return res
}


export default {
  createQuiz,
  getQuiz,
  getQuizzes,
  deleteQuiz,
  updateQuiz
}