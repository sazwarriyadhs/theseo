import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Action Required</AlertTitle>
            <AlertDescription>
              <p className="mb-2">
                To complete the integration, please add your Google Analytics Measurement ID to the <code>.env</code> file in the root of your project. You can find your Measurement ID (it starts with "G-") in your Google Analytics account under Admin {'>'} Data Streams.
              </p>
              <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
              </code>
              <p className="mt-2 text-xs text-muted-foreground">
                Once the ID is added, data may take up to 48 hours to appear in your Google Analytics dashboard.
              </p>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
