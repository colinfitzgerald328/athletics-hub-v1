import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronDown, ChevronUp } from "lucide-react";

interface CompetitorCardProps {
  competitor: any;
  isExpanded: boolean;
  onToggle: () => void;
  onFetch: () => void;
  loading: boolean;
}

const CompetitorCard: React.FC<CompetitorCardProps> = ({
  competitor,
  isExpanded,
  onToggle,
  onFetch,
  loading,
}) => {
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          {loading ? (
            <Skeleton className="w-20 h-20 rounded-full" />
          ) : (
            <img
              src={
                competitor.hq_images?.[0] ||
                competitor.hq_image_url ||
                "https://cdn.pixabay.com/photo/2014/04/03/11/07/running-311805_640.png"
              }
              alt={`${competitor.first_name} ${competitor.last_name}`}
              className="w-20 h-20 rounded-full object-cover"
            />
          )}
          <div className="flex-grow">
            {loading ? (
              <Skeleton className="h-6 w-40 mb-2" />
            ) : (
              <Button
                variant="link"
                onClick={onFetch}
                className="p-0 h-auto font-semibold text-lg"
              >
                {competitor.first_name} {competitor.last_name}
              </Button>
            )}
            {loading ? (
              <Skeleton className="h-4 w-60" />
            ) : (
              <p className="text-sm text-muted-foreground">
                {competitor.primary_disciplines}
              </p>
            )}
          </div>
          {competitor.summary && (
            <Button variant="ghost" size="icon" onClick={onToggle}>
              {isExpanded ? <ChevronUp /> : <ChevronDown />}
            </Button>
          )}
        </div>
        {isExpanded && competitor.summary && (
          <p className="mt-4 text-sm">{competitor.summary}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default CompetitorCard;
