
export class Exercise {
  id: number;
  userId: number;
  exerciseTypeId: number;
  created: string;
  start_time: string;
  end_time?: string;
  comments?: string;
  score?: number;
  duration?: number;
}
