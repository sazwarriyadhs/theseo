'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Youtube, PlayCircle, AlertTriangle } from 'lucide-react';
import NextImage from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';
import { Skeleton } from './ui/skeleton';

type YouTubeVideo = {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      high: {
        url: string;
        width: number;
        height: number;
      };
    };
    publishedAt: string;
  };
};

export default function YouTubeFeedPreview({ dictionary }: { dictionary: any }) {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const t = dictionary;

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setError(null);
      const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
      const channelId = 'UCyxPy9dYgUO7UdC2zEnJpSA'; // @NgobrolDigitalYuk

      if (!apiKey) {
        setError("YouTube API key is not configured.");
        setLoading(false);
        return;
      }
      
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&order=date&maxResults=6&type=video`
        );
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error?.message || 'Failed to fetch videos from YouTube API');
        }
        const data = await res.json();
        setVideos(data.items || []);
      } catch (err: any) {
        console.error("Failed to fetch YouTube videos:", err);
        setError(err.message || "An unknown error occurred while fetching videos.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (!t) return null;

  const renderContent = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i}>
              <Skeleton className="aspect-video w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4 mt-2" />
              <Skeleton className="h-3 w-1/2 mt-1" />
            </div>
          ))}
        </div>
      );
    }
    
    if (error) {
       const urlRegex = /(https?:\/\/[^\s]+)/;
       const urlMatch = error.match(urlRegex);
       const url = urlMatch ? urlMatch[0] : null;
       const message = url ? error.replace(urlRegex, '') : error;

       return (
        <div className="col-span-full flex flex-col items-center justify-center text-center text-destructive bg-destructive/10 p-8 rounded-lg">
          <AlertTriangle className="h-10 w-10 mb-4" />
          <h4 className="text-lg font-semibold">Could not load videos</h4>
          <p className="text-sm max-w-md">{message}</p>
          {url && (
             <Button asChild variant="link" className="mt-2 text-destructive hover:text-destructive/80">
                <Link href={url} target="_blank" rel="noopener noreferrer">
                    Click here to enable the API
                </Link>
            </Button>
          )}
        </div>
      );
    }

    if (videos.length === 0) {
      return (
        <div className="col-span-3 text-center text-muted-foreground p-8">
          No videos found for this channel.
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => {
          if (!video.id.videoId || !video.snippet) return null;
          return (
            <Link key={video.id.videoId} href={`https://www.youtube.com/watch?v=${video.id.videoId}`} target="_blank" rel="noopener noreferrer" className="group relative block">
               <div className="aspect-video w-full overflow-hidden rounded-lg">
                 <NextImage
                    src={video.snippet.thumbnails.high.url}
                    alt={video.snippet.title}
                    width={video.snippet.thumbnails.high.width}
                    height={video.snippet.thumbnails.high.height}
                    className="object-cover w-full h-full transition-transform group-hover:scale-105"
                 />
               </div>
               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg cursor-pointer">
                  <PlayCircle className="h-12 w-12 text-white" />
               </div>
               <div className="mt-2">
                  <h4 className="font-semibold text-sm truncate" title={video.snippet.title}>{video.snippet.title}</h4>
                   <p className="text-xs text-muted-foreground">{new Date(video.snippet.publishedAt).toLocaleDateString()}</p>
               </div>
            </Link>
          );
        })}
      </div>
    );
  };

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
        {renderContent()}
      </CardContent>
    </Card>
  );
}
