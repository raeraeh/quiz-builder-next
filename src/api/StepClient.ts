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

interface DeleteStepRequest {
  stepId: string;
  quizId: string;
}

export const stepRoute = 'steps';

export interface CreateStepRequest {
  quizId: string;
  name: string;
}

export const createStep = async (request: CreateStepRequest) => {
  const step: Step = await api.post(`${quizRoute}/${request.quizId}/${stepRoute}`, request);
  queryClient.invalidateQueries({ queryKey: [stepRoute] });

  return step;
};

export const getStep = async (request: GetStepRequest) => {
  try {
    console.log('req', request);
    const res = await api.get<Step>(`${quizRoute}/${request.quizId}/${stepRoute}/${request.stepId}`);
  } catch (error) {
    console.error('Error retrieving step:', error);
    throw error;
  }
};

export const deleteStep = async (request: DeleteStepRequest) => {
  const step: Step = await api.delete(`${quizRoute}/${request.quizId}/${stepRoute}/${request.stepId}`);

  queryClient.invalidateQueries({ queryKey: [quizRoute] });

  return step;
};

export const updateStep = async (request: UpdateStepRequest) => {
  const step: Step = await api.update<UpdateStepRequest, Step>(`${quizRoute}/${request.quizId}/${stepRoute}/${request.id}`, request);

  queryClient.invalidateQueries({ queryKey: [quizRoute] });

  queryClient.invalidateQueries({ queryKey: [stepRoute] });

  return step;
};

export default {
  createStep,
  getStep,
  deleteStep,
  updateStep,
};
