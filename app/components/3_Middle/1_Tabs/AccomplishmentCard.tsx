import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface AccomplishmentCardProps {
  accomplishment: string;
  loading: boolean;
}

const AccomplishmentCard: React.FC<AccomplishmentCardProps> = ({
  accomplishment,
  loading,
}) => {
  const [count, achievement] = accomplishment.split("x");

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        {loading ? (
          <Skeleton className="h-12 w-full" />
        ) : (
          <div className="flex items-baseline">
            <span className="text-3xl font-bold mr-2">{count}x</span>
            <span className="text-lg">{achievement}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AccomplishmentCard;
