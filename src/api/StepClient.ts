
import api from '.';
import { queryClient } from '../lib/QueryClient';
import QuizClient, { quizRoute } from './QuizClient';

 

export interface Step {
  id: string;
  name: string;
  blocks?: string[]
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


export const stepRoute = 'steps'


interface CreateStepRequest {
  quizId: string;
  name: string;
}


export const  createStep = async (request: CreateStepRequest) => { 
  const res = await (await QuizClient.getQuiz(request.quizId)).data

  if (!res) throw new Error('Quiz not found');

  const data =  {
    name: request.name,
    blocks: []
  }

  const step: Step = await api.post(`${quizRoute}/${request.quizId}/${stepRoute}`, data)
  
  QuizClient.updateQuiz({...res, steps: [...res.steps, step.id]})

  queryClient.invalidateQueries({queryKey: [quizRoute]})


  return step
}

export const getStep = async (request: GetStepRequest) => { 
  return await api.get<Step>(`${quizRoute}/${request.quizId}/${stepRoute}/${request.stepId}`) 
}

export const deleteStep = async (request: DeleteStepRequest) => { 

  const quiz = await (await QuizClient.getQuiz(request.quizId)).data

  if (!quiz) throw new Error('Quiz not found');

  quiz.steps = quiz.steps.filter(step => step !== request.stepId)

  QuizClient.updateQuiz(quiz)

  queryClient.invalidateQueries({queryKey: [quizRoute]})

  return await api.delete(`${quizRoute}/${request.quizId}/${stepRoute}/${request.stepId}`)
}

export const updateStep = async (request: UpdateStepRequest) => {
  const step: Step = await api.update<UpdateStepRequest, Step>(`${quizRoute}/${request.quizId}/${stepRoute}/${request.id}`, request)


  queryClient.invalidateQueries({queryKey: [quizRoute]})

  queryClient.invalidateQueries({queryKey: [stepRoute]})

  return step
}

export default {
  createStep,
  getStep,
  deleteStep,
  updateStep
}