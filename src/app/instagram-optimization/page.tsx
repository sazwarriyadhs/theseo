import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Instagram, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function InstagramOptimizationPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-2 text-2xl">
            <span className="flex items-center gap-2">
              <Instagram className="h-6 w-6 text-primary" />
              Instagram Optimization
            </span>
            <Button asChild variant="outline" size="sm">
              <a href="https://www.instagram.com/digimediakomunikapt?igsh=MXRmMjdtYWJ5ZTM1MQ==" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Visit Profile
              </a>
            </Button>
          </CardTitle>
          <CardDescription className="text-base">
            Get insights and suggestions to grow your Instagram presence.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-8 text-center bg-secondary rounded-lg">
            <h3 className="text-xl font-semibold text-secondary-foreground mb-2">Feature Coming Soon</h3>
            <p className="text-muted-foreground">
              Connect your Instagram account to get AI-powered suggestions for post ideas, hashtag strategies, and content optimization to boost your engagement and follower growth.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
