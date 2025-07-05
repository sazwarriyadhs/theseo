import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function GoogleAdsensePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <DollarSign className="h-6 w-6 text-primary" />
            Google Adsense
          </CardTitle>
          <CardDescription className="text-base">
            Integration and optimization suggestions for Google Adsense.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Integration Complete</AlertTitle>
            <AlertDescription>
              Google AdSense has been successfully configured and Auto Ads are enabled. Ads will begin to appear on your site as Google's crawlers review your pages. This may take a few hours to a few days.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
