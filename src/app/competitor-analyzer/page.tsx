import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function CompetitorAnalyzerPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Users className="h-6 w-6 text-primary" />
            Competitor Analyzer
          </CardTitle>
          <CardDescription className="text-base">
            Gain insights into your competitors' strategies by analyzing their keywords and content.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-8 text-center bg-secondary rounded-lg">
            <h3 className="text-xl font-semibold text-secondary-foreground mb-2">Feature Coming Soon</h3>
            <p className="text-muted-foreground">
              This tool will allow you to enter competitor domains and receive a detailed analysis of their SEO and content marketing efforts, helping you identify opportunities and refine your own strategy for digimediakomunika.cloud.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
