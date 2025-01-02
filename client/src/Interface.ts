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
    email: string;
    firstName?: string;
    lastName?: string;
    profilePicture?: string; // Add this line
    userId: string;
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
  
  export interface Event {
    objectId: string;
    id:string;
    image: string;
    
    title: string;
    date: string | Date;
    description: string;
    price?: number;
    location?: string;
    participantLimit?: number;
    coverImage?: string;
    startTime?: string;
    endTime?: string;
    creatorId: string;
    createdAt: string;
    updatedAt: string;
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
  