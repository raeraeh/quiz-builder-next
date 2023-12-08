import api from '.';
import { queryClient } from '../lib/QueryClient';
import StepClient, { stepRoute } from './StepClient';


export enum BlockType {
  TEXTAREA = 'textarea',
  INPUT = 'input',
}


export interface Block {
  id: string;
  type: BlockType;
  data: Record<string, any>
}


export const blockRoute = 'blocks'

// Create
export interface CreateBlockRequest {
  quizId: string;
  stepId: string;
  type: BlockType;
  position?: number;
  data: Record<string, string>;
}

export const createBlock = async (request: CreateBlockRequest) => {
  const step = await (await StepClient.getStep({quizId: request.quizId, stepId: request.stepId})).data
  if (!step) throw new Error('Step not found');

  const data = {
    type: request.type,
    data: request.data ?? {}
  }

  const block: Block = await api.post(`${stepRoute}/${request.stepId}/${blockRoute}`, data)

  const blocks = [...step.blocks]
  
  blocks.splice(request.position !== undefined ? request.position + 1 : step.blocks.length, 0, block.id)

  console.log('blocks', blocks)
  
  StepClient.updateStep({
    ...step,
    quizId: request.quizId,
    blocks: blocks,
  })


  queryClient.invalidateQueries({queryKey: [stepRoute,step.id]})

  return block
}

// Get
export interface GetBlockRequest {
  stepId: string;
  blockId: string;
}

export const getBlock = async (request: GetBlockRequest) => {
  return await api.get<Block>(`${stepRoute}/${request.stepId}/${blockRoute}/${request.blockId}`)
}


export interface UpdateBlockRequest extends Block {
  stepId: string;
  type: BlockType;
  data: Record<string, any>
}

export const updateBlock = async ( request: UpdateBlockRequest ) => {



  const block = await api.update<UpdateBlockRequest, Block>(`${stepRoute}/${request.stepId}/${blockRoute}/${request.id}`, request)

  queryClient.invalidateQueries({queryKey: [blockRoute,block.id]})


  return block
}

// Delete
export interface DeleteBlockRequest {
  quizId: string;
  stepId: string;
  blockId: string;
}

export const deleteBlock = async (request: DeleteBlockRequest) => {
  const step = await (await StepClient.getStep({quizId: request.quizId, stepId: request.stepId})).data
  if (!step) throw new Error('Step not found');

  StepClient.updateStep({
    ...step,
    quizId: request.quizId,
    blocks: step.blocks.filter((block : string) => block !== request.blockId),
  })

  const res =  await api.delete(`${stepRoute}/${request.stepId}/${blockRoute}/${request.blockId}`)

  queryClient.invalidateQueries({queryKey: [stepRoute, request.stepId]})


  return res
}

export const BlockClient = {
  createBlock,
  getBlock,
  updateBlock,
  deleteBlock,
}