'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  Loader2,
  Instagram,
  Wand2,
  Copy,
  Check,
  Image as ImageIcon,
} from 'lucide-react';
import {
  generateInstagramAssets,
  type GenerateInstagramAssetsOutput,
} from '@/ai/flows/generate-instagram-assets';
import {
  generateImage
} from '@/ai/flows/generate-image';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import NextImage from 'next/image';

const formSchema = z.object({
  content: z.string().min(50, { message: 'Please enter at least 50 characters.' }),
});

type Post = GenerateInstagramAssetsOutput['posts'][0] & {
  imageUrl?: string;
  isGeneratingImage?: boolean;
};

export default function InstagramGeneratorClientPage({ dictionary }: { dictionary: any }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});

  const t = dictionary;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError(null);
    setPosts([]);
    try {
      const res = await generateInstagramAssets(values);
      setPosts(res.posts);
    } catch (e) {
      setError(t.error || 'An error occurred. Please try again.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const handleGenerateImage = async (postIndex: number, prompt: string) => {
    setPosts(prev => prev.map((p, i) => i === postIndex ? { ...p, isGeneratingImage: true } : p));
    try {
        const res = await generateImage({ prompt });
        setPosts(prev => prev.map((p, i) => i === postIndex ? { ...p, imageUrl: res.imageDataUri, isGeneratingImage: false } : p));
    } catch (e) {
        console.error("Image generation failed for post " + postIndex, e);
        // Optionally show an error message to the user
        setPosts(prev => prev.map((p, i) => i === postIndex ? { ...p, isGeneratingImage: false } : p));
    }
  }

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStates(prev => ({ ...prev, [key]: true }));
    setTimeout(() => setCopiedStates(prev => ({ ...prev, [key]: false })), 2000);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Instagram className="h-6 w-6 text-primary" />
            {t.title}
          </CardTitle>
          <CardDescription>{t.description}</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.form.contentLabel}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t.form.contentPlaceholder}
                        className="h-40 resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t.form.loading}
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    {t.form.button}
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {loading && (
        <Card className="flex items-center justify-center p-8">
          <div className="flex flex-col items-center gap-4 text-muted-foreground">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p>{t.results.loadingTitle}</p>
            <p className="text-sm text-center">{t.results.loadingDescription}</p>
          </div>
        </Card>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertTitle>{t.errorTitle}</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {posts.length > 0 && (
        <div className="space-y-6 animate-fade-in">
          <h2 className="text-2xl font-bold text-center">{t.results.title}</h2>
          {posts.map((post, index) => (
            <Card key={index}>
              <CardContent className="p-4 grid md:grid-cols-2 gap-6 items-start">
                  <div className="space-y-6">
                      <div>
                          <div className="flex justify-between items-center mb-2">
                              <h4 className="font-semibold text-lg">{t.results.caption}</h4>
                              <Button variant="ghost" size="icon" onClick={() => handleCopy(post.caption, `caption-${index}`)}>
                                  {copiedStates[`caption-${index}`] ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                              </Button>
                          </div>
                          <p className="text-muted-foreground whitespace-pre-wrap text-sm">{post.caption}</p>
                      </div>
                       <div>
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-semibold text-lg">{t.results.hashtags}</h4>
                            <Button variant="ghost" size="icon" onClick={() => handleCopy(post.hashtags, `hashtags-${index}`)}>
                                {copiedStates[`hashtags-${index}`] ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                            </Button>
                          </div>
                          <p className="text-muted-foreground text-sm">{post.hashtags}</p>
                      </div>
                      <div>
                          <h4 className="font-semibold text-lg mb-2">{t.results.imagePrompt}</h4>
                          <p className="text-sm bg-secondary text-secondary-foreground p-3 rounded-md font-mono text-xs">
                              {post.imagePrompt}
                          </p>
                      </div>
                  </div>
                  <div className="flex flex-col items-center justify-center bg-secondary rounded-lg aspect-video p-4">
                      {post.isGeneratingImage ? (
                          <div className="flex flex-col items-center gap-2 text-muted-foreground">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            <span>{t.results.generatingImage}</span>
                          </div>
                      ) : post.imageUrl ? (
                        <NextImage src={post.imageUrl} alt={`Generated image for post ${index + 1}`} width={512} height={288} className="object-contain rounded-md" />
                      ) : (
                        <div className="text-center text-muted-foreground">
                            <ImageIcon className="h-10 w-10 mx-auto mb-2"/>
                            <Button size="sm" onClick={() => handleGenerateImage(index, post.imagePrompt)}>
                                <Wand2 className="mr-2 h-4 w-4" /> {t.results.generateImage}
                            </Button>
                        </div>
                      )}
                  </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
