'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Instagram, Heart, MessageCircle } from 'lucide-react';
import NextImage from 'next/image';

type MockPost = {
  id: number;
  likes: number;
  comments: number;
  hint: string;
};

export default function InstagramFeedPreview({ dictionary }: { dictionary: any }) {
  const [mockPosts, setMockPosts] = useState<MockPost[]>([]);
  const t = dictionary;

  useEffect(() => {
    const hints = ["product shot", "lifestyle model", "user generated content", "behind the scenes", "graphic design quote", "team photo", "office environment", "client testimonial", "marketing data"];
    const generatedPosts = Array.from({ length: 9 }, (_, i) => ({
      id: i,
      likes: Math.floor(Math.random() * 1200) + 50,
      comments: Math.floor(Math.random() * 90) + 5,
      hint: hints[i % hints.length] || "social media"
    }));
    setMockPosts(generatedPosts);
  }, []);

  if (!t) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Instagram className="h-6 w-6 text-primary" />
          {t.title}
        </CardTitle>
        <CardDescription>{t.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-1 md:gap-2">
          {mockPosts.length > 0 ? (
            mockPosts.map((post) => (
            <div key={post.id} className="group relative aspect-square">
              <NextImage
                src={`https://placehold.co/400x400.png`}
                alt={`Instagram post placeholder ${post.id + 1}`}
                fill
                className="object-cover rounded-md"
                data-ai-hint={post.hint}
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-sm sm:text-base gap-2 sm:gap-4 rounded-md cursor-pointer">
                <div className="flex items-center gap-1">
                  <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>{post.comments}</span>
                </div>
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
