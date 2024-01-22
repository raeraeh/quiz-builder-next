import api from '.';
import { queryClient } from '../lib/QueryClient';
import QuizClient, { quizRoute } from './QuizClient';

export interface Step {
  id: string;
  name: string;
  blocks: string[];
}

interface UpdateStepRequest {
  id: string;
  quizId: string;
  name: string;
  blocks: string[];
}

interface GetStepRequest {
  stepId: string;
  quizId: string;
}

export interface CreateStepRequest {
  quizId: string;
  name: string;
}

interface DeleteStepRequest {
  stepId: string;
  quizId: string;
}

export const stepRoute = 'steps';

export const createStep = async (request: CreateStepRequest) => {
  const step = (await api.post<Step>(`${quizRoute}/${request.quizId}/${stepRoute}`, request)).data;
  queryClient.invalidateQueries({ queryKey: [stepRoute] });
  queryClient.invalidateQueries({ queryKey: [quizRoute, request.quizId] });

  return step;
};

export const getStep = async (request: GetStepRequest) => {
  try {
    const step = (await api.get<Step>(`${quizRoute}/${request.quizId}/${stepRoute}/${request.stepId}`)).data;

    return step;
  } catch (error) {
    console.error('Error retrieving step:', error);
    throw error;
  }
};

export const deleteStep = async (request: DeleteStepRequest) => {
  await api.delete(`${quizRoute}/${request.quizId}/${stepRoute}/${request.stepId}`);

  queryClient.invalidateQueries({ queryKey: [stepRoute, request.stepId] });
  queryClient.invalidateQueries({ queryKey: [quizRoute, request.quizId] });

  return;
};

export const updateStep = async (request: UpdateStepRequest) => {
  const step = (await api.update<Step>(`${quizRoute}/${request.quizId}/${stepRoute}/${request.id}`, request)).data;

  queryClient.invalidateQueries({ queryKey: [quizRoute] });

  queryClient.invalidateQueries({ queryKey: [stepRoute, request.id] });

  return step;
};

export default {
  createStep,
  getStep,
  deleteStep,
  updateStep,
};
