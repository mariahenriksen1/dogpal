export interface IEvent {
  id: string;
  title: string; 
  date: number; 
  image: string
  description: string; 
  price?: number; 
  location?: string; 
  participantLimit?: number;
  coverImage?: string; 
  startTime?: number; 
  endTime?: number; 
  creator?: string;
}




export interface IDog {
  id: string;
  name: string;
  breed: string;
  age: number;
  image: string;
  date: string;
}

