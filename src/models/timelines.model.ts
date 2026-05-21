export interface Timeline {
  id: string;
  title: string;
  description: string;
  time: string;
  createdAt: string;
}

export interface PostTimeline {
  title: string;
  description: string;
  time: string;
  date: string;
}

export interface GetAllTimelinesResponse {
  id: string;
  title: string;
  description: string;
  time: string;
  date: string;
}
