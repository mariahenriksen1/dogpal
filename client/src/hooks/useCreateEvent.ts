import { useState } from "react";
import Parse from "../env.Backend/env.parseConfig.ts";

interface CreateEventParams {
  title: string;
  date: number; // ISO 8601 format or valid Date string
  description: string;
  price?: number;
  location?: string;
  participantLimit?: number;
  coverImage?: string;
  startTime?: number;
  endTime?: number;
}

interface UseCreateEventReturn {
  createEvent: (params: CreateEventParams) => Promise<void>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export const useCreateEvent = (): UseCreateEventReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createEvent = async (params: CreateEventParams) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
  
    try {
      // Ensure date is already a timestamp
      const response = await Parse.Cloud.run("createEvent", params);
      console.log("Event created:", response);
      setSuccess(true);
    } catch (err: any) {
      console.error("Error creating event:", err.message);
      setError(err.message || "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };
  

  return { createEvent, loading, error, success };
};
