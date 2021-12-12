export enum JobType {
  PartTime,
  FullTime,
}

export interface Job {
  id: number;
  title: string;
  description: string;
  logo: string;
  company: string;
  link: string;
  date: string;
  type: JobType;
}
