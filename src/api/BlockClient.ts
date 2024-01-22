import api from '.';
import { queryClient } from '../lib/QueryClient';
import { quizRoute } from './QuizClient';
import StepClient, { stepRoute } from './StepClient';

export enum BlockType {
  TEXTAREA = 'textarea',
  INPUT = 'input',
}

export interface Block {
  id: string;
  type: BlockType;
  data: Record<string, any>;
}

export const blockRoute = 'blocks';

// Create
export interface CreateBlockRequest {
  quizId: string;
  stepId: string;
  type: BlockType;
  position?: number;
  data: Record<string, string>;
}

export const createBlock = async (request: CreateBlockRequest) => {
  const data = {
    stepId: request.stepId,
    postion: request.position ?? null,
    type: request.type,
    data: request.data ?? {},
  };

  try {
    const block = (await api.post<Block>(`${stepRoute}/${request.stepId}/${blockRoute}`, data)).data;

    queryClient.invalidateQueries({ queryKey: [stepRoute, request.stepId] });

    return block;
  } catch (error) {
    console.error('Error retrieving block:', error);
    throw error;
  }
};

// Get
export interface GetBlockRequest {
  stepId: string;
  blockId: string;
}

export const getBlock = async (request: GetBlockRequest) => {
  try {
    const block = (await api.get<Block>(`${stepRoute}/${request.stepId}/${blockRoute}/${request.blockId}`)).data;
    return block;
  } catch (error) {
    console.error('Error retrieving block:', error);
    throw error;
  }
};

export interface UpdateBlockRequest extends Block {
  stepId: string;
  type: BlockType;
  data: Record<string, any>;
}

export const updateBlock = async (request: UpdateBlockRequest) => {
  const block = (await api.update<Block>(`${stepRoute}/${request.stepId}/${blockRoute}/${request.id}`, request)).data;

  queryClient.invalidateQueries({ queryKey: [blockRoute, block.id] });

  return block;
};

// Delete
export interface DeleteBlockRequest {
  stepId: string;
  blockId: string;
}

export const deleteBlock = async (request: DeleteBlockRequest) => {
  const block = await api.delete(`${stepRoute}/${request.stepId}/${blockRoute}/${request.blockId}`);

  if (!block) throw new Error('Step not found');

  queryClient.invalidateQueries({ queryKey: [stepRoute, request.stepId] });
  queryClient.invalidateQueries({ queryKey: [blockRoute, request.blockId] });

  return block;
};

export const BlockClient = {
  createBlock,
  getBlock,
  updateBlock,
  deleteBlock,
};
