export interface User {
  objectId: string;
  username: string;
  email: string;
  password?: string;
  createdAt: string;
  updatedAt: string;
  publicUserId?: string;
  sessionToken?: string;
  isLoggedIn?: boolean;
}

export interface PublicUser {
  objectId: string;
  username: string;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  objectId: string;
  id: string;
  image: string;
  title: string;
  date: any;
  description: string;
  price?: number;
  location?: string;
  participantLimit?: number;
  coverImage?: string;
  startTime?: any;
  endTime?: any;
  creatorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Dog {
  objectId: string;
  name: string;
  dogPicture?: string;
  race?: string;
  dogBirthDate?: string | Date;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IComment {
  objectId: string; 
  UserId: string; 
  Date: string;
  createdAt: string; 
  EventId: string; 
  Comment: string; 
  PublicUser: string; 
  dogs?: { 
    id: string; 
    name: string; 
    dogPicture: string; 
  }[];
}




export interface IAttendee {
  id: string,
  username: string,
  firstName: string,
  lastName: string,
  profilePicture: string,
  signUpDate: string | null,
  dogAttendees: string[]
}

// Utility functions
export const getFullName = (publicUser: PublicUser): string =>
  [publicUser.firstName, publicUser.lastName].filter(Boolean).join(" ") || "N/A";

export const getDogAge = (dog: Dog): number | "Unknown" => {
  if (!dog.dogBirthDate) return "Unknown";
  const birthDate = new Date(dog.dogBirthDate);
  const ageInMs = Date.now() - birthDate.getTime();
  return Math.floor(ageInMs / (1000 * 60 * 60 * 24 * 365.25));
};