import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart } from "lucide-react";

export default function GoogleAnalyticsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <LineChart className="h-6 w-6 text-primary" />
            Google Analytics
          </CardTitle>
          <CardDescription className="text-base">
            Integration for Google Analytics.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-8 text-center bg-secondary rounded-lg">
            <h3 className="text-xl font-semibold text-secondary-foreground mb-2">Feature Coming Soon</h3>
            <p className="text-muted-foreground">
              Seamlessly connect your Google Analytics account to view key website metrics directly within the DigiMedia Optimizer dashboard. We'll provide simplified reports and actionable insights based on your traffic data.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
