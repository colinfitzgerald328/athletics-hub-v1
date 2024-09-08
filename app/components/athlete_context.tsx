"use client";
import { createContext, useContext, ReactNode, useState, useCallback, useMemo, useEffect } from 'react';
import { getAthleteById, getRandomDoc, getLetsRunDailySummary } from "../api/api";
import { components } from "@/src/lib/api/v1";


type Athlete = components["schemas"]["QueriedAthlete"]; 


export interface AthleteContextType {
  athlete: Athlete | null;
  loadingNewAthlete: boolean;
  fetchAthleteById: (athleteId: number) => Promise<void>; 
  fetchRandomAthlete: () => Promise<void>;
  getLetsRunDailySummaryFunction: () => Promise<void>;
  summaryResponse: string;
  width: number;
  height: number;
  isMobile: boolean;
}


const AthleteContext = createContext<AthleteContextType | undefined>(undefined);


export const AthleteProvider = ({ children }: { children: ReactNode }) => {
  const [athlete, setAthlete] = useState<Athlete | null>(null);
  const [loadingNewAthlete, setLoadingNewAthlete] = useState(false);
  const [summaryResponse, setSummaryResponse] = useState("");
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);


  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);
    updateWindowDimensions();
    fetchRandomAthlete();
    getLetsRunDailySummaryFunction();
  }, []);


  const isMobile = width < 1000;

  function updateWindowDimensions() {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }


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



return (
  <AthleteContext.Provider
    value={useMemo(
      () => ({ athlete, loadingNewAthlete, fetchAthleteById, fetchRandomAthlete, getLetsRunDailySummaryFunction, summaryResponse, width, height, isMobile}),
      [athlete, loadingNewAthlete, fetchAthleteById, fetchRandomAthlete, getLetsRunDailySummaryFunction, summaryResponse, width, height, isMobile],
    )}
  >
    {children}
  </AthleteContext.Provider>
);
};

export const useAthleteContext = () => {
  const context = useContext(AthleteContext);
  if (context === undefined) {
    throw new Error('useAthleteContext must be used within an AthleteProvider');
  }
  return context;
};
