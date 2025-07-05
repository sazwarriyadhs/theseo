import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, CheckCircle2 } from "lucide-react";
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
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Integration Complete</AlertTitle>
            <AlertDescription>
              Google Analytics has been successfully configured. It may take up to 48 hours for data to start appearing in your Google Analytics dashboard.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
