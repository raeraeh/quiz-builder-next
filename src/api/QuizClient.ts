import api from '.';
import { queryClient } from '../lib/QueryClient';

export interface Quiz {
  id: string;
  name: string;
  steps: string[];
}

export interface CreateQuizRequest {
  name: string;
}

interface UpdateQuizRequest {
  id: string;
  name: string;
  steps: string[];
}

export const quizRoute = 'quizzes';

export const createQuiz = async (request: CreateQuizRequest) => {
  const data = {
    name: request.name,
  };
  const res = (await api.post<Quiz>(`/${quizRoute}`, data)).data;

  queryClient.invalidateQueries({ queryKey: [quizRoute] });

  return res;
};

export const getQuiz = async (id: string) => {
  const res = (await api.get<Quiz>(`/${quizRoute}/${id}`)).data;
  return res;
};

export const getQuizzes = async () => {
  const res = (await api.get_all<Quiz>(`/${quizRoute}`)).data;
  return res;
};

export const deleteQuiz = async (id: string) => {
  try {
    const res = (await api.delete(`/${quizRoute}/${id}`)).data;

    queryClient.invalidateQueries({ queryKey: [quizRoute] });
    return res;
  } catch (error) {
    console.error('Error deleting quiz:', error);
    throw error; // Rethrow the error to propagate it to the calling code
  }
};

export const updateQuiz = async (request: UpdateQuizRequest): Promise<Quiz> => {
  try {
    const res: Quiz = (await api.update<UpdateQuizRequest>(`/${quizRoute}/${request.id}`, request)).data;

    queryClient.invalidateQueries({ queryKey: [quizRoute] });

    return res;
  } catch (error) {
    console.error('Error updating quiz:', error);
    throw error;
  }
};

export default {
  createQuiz,
  getQuiz,
  getQuizzes,
  deleteQuiz,
  updateQuiz,
};
