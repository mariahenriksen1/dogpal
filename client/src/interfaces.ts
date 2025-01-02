export interface IEvent {
  objectId: string;
  id: string;
  title: string; 
  date: number; 
  image: string
  
  description: string; 
  price?: number; 
  location?: string; 
  participantLimit?: number;
  coverImagecoverImage?: string; 
  startTime?: string; 
  endTime?: string; 
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

