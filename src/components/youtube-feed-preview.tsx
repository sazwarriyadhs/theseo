'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Youtube, PlayCircle } from 'lucide-react';
import NextImage from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';

type MockVideo = {
  id: number;
  title: string;
  views: string;
  thumbnailHint: string;
};

export default function YouTubeFeedPreview({ dictionary }: { dictionary: any }) {
  const [mockVideos, setMockVideos] = useState<MockVideo[]>([]);
  const t = dictionary;

  useEffect(() => {
    const titles = [
      "Unlocking SEO Secrets for 2024",
      "How We Generated 10k Leads with Social Media",
      "Content Marketing Masterclass",
      "AI in Digital Marketing: The Future is Now",
      "Top 5 Google Ads Mistakes to Avoid",
      "Building a Brand from Scratch",
    ];
    const hints = ["business meeting", "laptop code", "presentation audience", "ai robot", "analytics dashboard", "brand logo"];

    const generatedVideos = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      title: titles[i % titles.length] || "Sample Video Title",
      views: `${(Math.random() * 100).toFixed(1)}k views`,
      thumbnailHint: hints[i % hints.length] || "digital marketing"
    }));
    setMockVideos(generatedVideos);
  }, []);

  if (!t) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Youtube className="h-6 w-6 text-primary" />
                {t.title}
            </div>
            <Button asChild variant="outline">
                <Link href="https://www.youtube.com/@NgobrolDigitalYuk" target="_blank" rel="noopener noreferrer">
                    {t.visitChannel}
                </Link>
            </Button>
        </CardTitle>
        <CardDescription>{t.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockVideos.length > 0 ? (
            mockVideos.map((video) => (
            <div key={video.id} className="group relative">
               <div className="aspect-video w-full overflow-hidden rounded-lg">
                 <NextImage
                    src={`https://placehold.co/600x400.png`}
                    alt={video.title}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full transition-transform group-hover:scale-105"
                    data-ai-hint={video.thumbnailHint}
                 />
               </div>
               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg cursor-pointer">
                  <PlayCircle className="h-12 w-12 text-white" />
               </div>
               <div className="mt-2">
                  <h4 className="font-semibold text-sm truncate">{video.title}</h4>
                  <p className="text-xs text-muted-foreground">{video.views}</p>
               </div>
            </div>
          ))
          ) : (
             <div className="col-span-3 text-center text-muted-foreground p-4">Loading feed preview...</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
