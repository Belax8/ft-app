
export class Exercise {
  id: number = 0;
  userId: number = 0;
  exerciseTypeId: number = 0;
  created: string = null;
  startTime: string = null;
  endTime?: string;
  comments?: string;
  score?: number;
  duration?: number;
}
