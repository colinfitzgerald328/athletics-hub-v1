"use client";
import { createContext, useContext, ReactNode, useState, useCallback, useMemo, useEffect } from 'react';
import { getAthleteById, getRandomDoc, getLetsRunDailySummary } from "../api/api";
import { components } from "@/src/lib/api/v1";

// Define the Athlete type
type Athlete = components["schemas"]["QueriedAthlete"]; // Changed QueriedAthlete to Athlete

// Define the AthleteContextType interface
export interface AthleteContextType {
  athlete: Athlete | null;
  loadingNewAthlete: boolean;
  fetchAthleteById: (athleteId: number) => Promise<void>; // Changed string to number
  fetchRandomAthlete: () => Promise<void>;
  getLetsRunDailySummaryFunction: () => Promise<void>;
  summaryResponse: string;
  width: number;
  height: number;
  isMobile: boolean;
}

// Create the AthleteContext
const AthleteContext = createContext<AthleteContextType | undefined>(undefined);

// Define the AthleteProvider component
export const AthleteProvider = ({ children }: { children: ReactNode }) => {
  // Initialize state for athlete and loadingNewAthlete
  const [athlete, setAthlete] = useState<Athlete | null>(null);
  const [loadingNewAthlete, setLoadingNewAthlete] = useState(false);
  const [summaryResponse, setSummaryResponse] = useState("");
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);


  useEffect(() => {
    fetchRandomAthlete();
    getLetsRunDailySummaryFunction();
  }, []);

  const isMobile = width < 1000;

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);



  // Define the fetchAthleteById function
  const fetchAthleteById = useCallback(async (athleteId: number) => {
    setLoadingNewAthlete(true);
    try {
      const { data, error } = await getAthleteById(athleteId);
      if (error) {
        console.error("Error fetching athlete:", error);
        return;
      }
      setAthlete(data);
    } catch (error) {
      console.error("Error fetching athlete:", error);
    } finally {
      setLoadingNewAthlete(false);
    }
  }, []);

  // Define the fetchRandomAthlete function
  const fetchRandomAthlete = useCallback(async () => {
    setLoadingNewAthlete(true);
    try {
      const { data, error } = await getRandomDoc();
      if (error) {
        console.error("Error fetching random athlete:", error);
        return;
      }
      setAthlete(data);
    } catch (error) {
      console.error("Error fetching random athlete:", error);
    } finally {
      setLoadingNewAthlete(false);
    }
  }, []);

  const getLetsRunDailySummaryFunction = useCallback(async () => {
  const { data, error } = await getLetsRunDailySummary();
  if (error) {
    return;
  }
  setSummaryResponse(data.summary_text);
}, [setSummaryResponse]);

// Return the AthleteContext.Provider
return (
  <AthleteContext.Provider
    value={useMemo(
      () => ({ athlete, loadingNewAthlete, fetchAthleteById, fetchRandomAthlete, getLetsRunDailySummaryFunction, summaryResponse, width, height, isMobile }),
      [athlete, loadingNewAthlete, fetchAthleteById, fetchRandomAthlete, getLetsRunDailySummaryFunction, summaryResponse, width, height, isMobile]
    )}
  >
    {children}
  </AthleteContext.Provider>
);
};

// Define the useAthleteContext hook
export const useAthleteContext = () => {
  const context = useContext(AthleteContext);
  if (context === undefined) {
    throw new Error('useAthleteContext must be used within an AthleteProvider');
  }
  return context;
};