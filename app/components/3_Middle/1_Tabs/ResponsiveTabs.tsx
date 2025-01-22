"use client";

import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Construction, ChevronDown, ChevronUp } from "lucide-react";
import { useAthleteContext } from "../../athlete_context";
import DataTable from "./DataTable";
import EmptyState from "./EmptyState";
import CompetitorCard from "./CompetitorCard";
import PBCard from "./PBCard";
import AccomplishmentCard from "./AccomplishmentCard";
import { randomBytes } from "crypto";

const ResponsiveTabs: React.FC = () => {
  const { loadingNewAthlete, athlete, fetchAthleteById } = useAthleteContext();
  const [activeTab, setActiveTab] = useState("competition");
  const [expandedCompetitors, setExpandedCompetitors] = useState<string[]>([]);

  const toggleCompetitorSummary = (athleteId: string) => {
    setExpandedCompetitors((prev) =>
      prev.includes(athleteId)
        ? prev.filter((id) => id !== athleteId)
        : [...prev, athleteId],
    );
  };

  return (
    <Card className="w-full mt-4 overflow-hidden">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="competition">Competition</TabsTrigger>
          <TabsTrigger value="pbs">PBs</TabsTrigger>
          <TabsTrigger value="accolades">Accolades</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>
        <ScrollArea className="h-[calc(100vh-300px)] lg:h-[calc(100vh-200px)]">
          <CardContent>
            <TabsContent value="competition">
              {athlete.top_competitors.length === 0 ? (
                <EmptyState
                  icon={<Construction />}
                  message="Nothing here yet! As our data team improves, top competitors will populate for this athlete."
                />
              ) : (
                athlete.top_competitors.map((competitor) => (
                  <CompetitorCard
                    key={competitor.athlete_id}
                    competitor={competitor}
                    isExpanded={expandedCompetitors.includes(
                      competitor.athlete_id as unknown as string,
                    )}
                    onToggle={() =>
                      toggleCompetitorSummary(
                        competitor.athlete_id as unknown as string,
                      )
                    }
                    onFetch={() => fetchAthleteById(competitor.athlete_id)}
                    loading={loadingNewAthlete}
                  />
                ))
              )}
            </TabsContent>
            <TabsContent value="pbs">
              {athlete.athlete.personal_bests?.map((pb) => (
                <PBCard
                  key={randomBytes(16).toString("hex")}
                  pb={pb}
                  loading={loadingNewAthlete}
                />
              ))}
            </TabsContent>
            <TabsContent value="accolades">
              {athlete.athlete.accomplishments?.length === 0 ? (
                <EmptyState
                  icon={<Construction />}
                  message="Nothing here yet! As our data team improves, accomplishments will populate for this athlete."
                />
              ) : (
                athlete.athlete.accomplishments
                  .slice(0, 3)
                  .map((accomplishment, index) => (
                    <AccomplishmentCard
                      key={index}
                      accomplishment={accomplishment}
                      loading={loadingNewAthlete}
                    />
                  ))
              )}
            </TabsContent>
            <TabsContent value="results">
              <DataTable />
            </TabsContent>
          </CardContent>
        </ScrollArea>
      </Tabs>
    </Card>
  );
};

export default ResponsiveTabs;
