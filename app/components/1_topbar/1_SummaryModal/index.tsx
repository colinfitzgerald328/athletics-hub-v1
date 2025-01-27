import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/joy/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ExternalLink } from "lucide-react";
import { useAthleteContext } from "../../athlete_context";
import Link from 'next/link'

type Anchor = "top" | "left" | "bottom" | "right";

export default function AnchorTemporaryDrawer() {
  const { summaryParts } = useAthleteContext();

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
      
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      // mixpanel.track("Open Summary Modal");

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      style={{ padding: "20px" }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="space-y-6 p-4 max-w-3xl mx-auto">
        {summaryParts.map((part) => (
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
        ))}
      </div>
    </Box>
  );

  return (
    <div>
      {(["bottom"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Link
            href="/daily-news"
          >
          <Button
            sx={{
              marginLeft: "15px",
              borderRadius: "25px",
              marginTop: "auto",
              marginBottom: "auto",
            }}
            variant="soft"
            color="primary"
            onClick={() => window.location.href = "/daily-news"}
          >
            Daily News
          </Button>
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
}
