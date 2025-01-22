import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface PBCardProps {
  pb: any;
  loading: boolean;
}

const PBCard: React.FC<PBCardProps> = ({ pb, loading }) => {
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        {loading ? (
          <>
            <Skeleton className="h-6 w-40 mb-2" />
            <Skeleton className="h-8 w-60 mb-2" />
            <Skeleton className="h-4 w-full" />
          </>
        ) : (
          <>
            <h3 className="text-lg font-semibold mb-2">{pb.discipline}</h3>
            <p className="text-2xl font-bold mb-2">
              {pb.result}{" "}
              {pb.records.length > 0 && (
                <span className="text-sm font-normal">
                  ({pb.records.join(", ")})
                </span>
              )}
            </p>
            <p className="text-sm text-muted-foreground">{pb.competition}</p>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default PBCard;
