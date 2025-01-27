"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { components } from "@/src/lib/api/v1";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type LetsRunSummaryParts = components["schemas"]["LetsRunSummaryItemSchema"];
import { useCallback } from "react";
import { getLetsRunSummaryParts } from "../api/api";
import mixpanel from "mixpanel-browser";

//Initialize Mixpanel
mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN, {
  debug: true,
  track_pageview: true,
  persistence: "localStorage",
});

const LoadingCard = () => (
  <Card className="overflow-hidden">
    <CardHeader className="bg-muted">
      <Skeleton className="h-8 w-3/4" />
    </CardHeader>
    <CardContent className="p-6 space-y-4">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-11/12" />
      <Skeleton className="h-4 w-4/5" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-48" />
        <Skeleton className="h-3 w-40" />
      </div>
    </CardContent>
    <Separator className="my-0" />
  </Card>
);

export default function SummaryPage() {
  const router = useRouter();
  const [summaryParts, setSummaryParts] = useState<LetsRunSummaryParts[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getLetsRunDailySummaryFunction = useCallback(async () => {
    try {
      const { data, error } = await getLetsRunSummaryParts();
      if (error) {
        return;
      }
      setSummaryParts(data);
    } catch (error) {
      console.error('Error fetching summary parts:', error);
    } finally {
      setIsLoading(false);
    }
  }, [setSummaryParts]);

  React.useEffect(() => {
    getLetsRunDailySummaryFunction();
  }, [getLetsRunDailySummaryFunction]);

  return (
    <Box
      style={{ padding: "20px" }}
      role="presentation"
    >
      <div className="space-y-6 p-4 max-w-3xl mx-auto">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        {isLoading ? (
          <>
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </>
        ) : summaryParts.length === 0 ? (
          <Card className="p-6 text-center">
            <p className="text-muted-foreground">No summaries available</p>
          </Card>
        ) : (
          summaryParts.map((part) => (
            <Card key={part.id} className="overflow-hidden">
              <CardHeader className="bg-muted">
                <CardTitle
                  style={{ fontSize: "23px" }}
                  className="text-lg font-semibold"
                >
                  {part.section_title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="mb-4 text-sm leading-relaxed">
                  {part.summary_text}
                </p>
                <h6 className="mb-2 font-semibold text-muted-foreground">
                  Sources
                </h6>
                <ul
                  className="space-y-2"
                  style={{ padding: "0px", margin: "0px" }}
                >
                  {part.source_links.map((link) => (
                    <li key={link.id}>
                      <a
                        href={link.source_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-primary hover:underline"
                      >
                        {link.source_name}
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <Separator className="my-0" />
            </Card>
          ))
        )}
      </div>
    </Box>
  );
}