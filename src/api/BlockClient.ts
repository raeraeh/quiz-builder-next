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
  console.log('client', data);

  const block: Block = await api.post(`${quizRoute}/${request.quizId}/${stepRoute}/${request.stepId}/${blockRoute}`, data);

  queryClient.invalidateQueries({ queryKey: [stepRoute, request.stepId] });

  return block;
};

// Get
export interface GetBlockRequest {
  quizId: string;
  stepId: string;
  blockId: string;
}

export const getBlock = async (request: GetBlockRequest) => {
  return await api.get<Block>(`${quizRoute}/${request.quizId}/${stepRoute}/${request.stepId}/${blockRoute}/${request.blockId}`);
};

export interface UpdateBlockRequest extends Block {
  stepId: string;
  type: BlockType;
  data: Record<string, any>;
}

export const updateBlock = async (request: UpdateBlockRequest) => {
  const block = await api.update<UpdateBlockRequest, Block>(`${stepRoute}/${request.stepId}/${blockRoute}/${request.id}`, request);

  queryClient.invalidateQueries({ queryKey: [blockRoute, block.id] });

  return block;
};

// Delete
export interface DeleteBlockRequest {
  quizId: string;
  stepId: string;
  blockId: string;
}

export const deleteBlock = async (request: DeleteBlockRequest) => {
  const step = await (await StepClient.getStep({ quizId: request.quizId, stepId: request.stepId })).data;
  if (!step) throw new Error('Step not found');

  StepClient.updateStep({
    ...step,
    quizId: request.quizId,
    blocks: step.blocks.filter((block: string) => block !== request.blockId),
  });

  const res = await api.delete(`${stepRoute}/${request.stepId}/${blockRoute}/${request.blockId}`);

  queryClient.invalidateQueries({ queryKey: [stepRoute, request.stepId] });

  return res;
};

export const BlockClient = {
  createBlock,
  getBlock,
  updateBlock,
  deleteBlock,
};
