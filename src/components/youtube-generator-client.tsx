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
  Youtube,
  Wand2,
  Copy,
  Check,
  Film,
  Download,
  Mic,
  Clapperboard,
  Image as ImageIcon,
} from 'lucide-react';
import {
  generateVideoAssets,
  type GenerateVideoAssetsOutput,
} from '@/ai/flows/generate-video-assets';
import {
  generateImage
} from '@/ai/flows/generate-image';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

const formSchema = z.object({
  content: z.string().min(100, { message: 'Please enter at least 100 characters.' }),
});

type Scene = GenerateVideoAssetsOutput['script'][0] & {
  imageUrl?: string;
  isGeneratingImage?: boolean;
};

export default function YouTubeGeneratorClientPage({ dictionary }: { dictionary: any }) {
  const [result, setResult] = useState<GenerateVideoAssetsOutput | null>(null);
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

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
    setResult(null);
    setScenes([]);
    try {
      const res = await generateVideoAssets(values);
      setResult(res);
      setScenes(res.script);
    } catch (e) {
      setError(t.error || 'An error occurred. Please try again.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const handleGenerateImage = async (sceneIndex: number, prompt: string) => {
    setScenes(prev => prev.map((s, i) => i === sceneIndex ? { ...s, isGeneratingImage: true } : s));
    try {
        const res = await generateImage({ prompt });
        setScenes(prev => prev.map((s, i) => i === sceneIndex ? { ...s, imageUrl: res.imageDataUri, isGeneratingImage: false } : s));
    } catch (e) {
        console.error("Image generation failed for scene " + sceneIndex, e);
        // Optionally show an error message to the user
        setScenes(prev => prev.map((s, i) => i === sceneIndex ? { ...s, isGeneratingImage: false } : s));
    }
  }

  const handleCopy = (text: string, index: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Youtube className="h-6 w-6 text-primary" />
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
      
      {result && scenes.length > 0 && (
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Film className="h-6 w-6" /> {t.results.title}</CardTitle>
            <CardDescription>{result.title}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-2"><Mic className="h-5 w-5" /> {t.results.narrationTitle}</h3>
              <audio controls className="w-full" src={result.narrationAudioDataUri} />
              <Button variant="outline" size="sm" asChild className="mt-2">
                <a href={result.narrationAudioDataUri} download="narration.wav">
                  <Download className="mr-2 h-4 w-4" /> {t.results.downloadAudio}
                </a>
              </Button>
            </div>
            <Separator />
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-4"><Clapperboard className="h-5 w-5" /> {t.results.scenesTitle}</h3>
              <div className="space-y-6">
                {scenes.map((scene, index) => (
                  <div key={scene.scene} className="grid md:grid-cols-2 gap-4 items-start p-4 border rounded-lg">
                    <div className="space-y-3">
                       <h4 className="font-semibold">{t.results.scene} {scene.scene}</h4>
                       <p className="text-muted-foreground">{scene.narration}</p>
                       <div className="flex items-center gap-2">
                         <p className="text-sm bg-secondary text-secondary-foreground p-2 rounded-md font-mono text-xs flex-1">
                          <span className="font-bold">Prompt:</span> {scene.imagePrompt}
                         </p>
                          <Button variant="ghost" size="icon" onClick={() => handleCopy(scene.imagePrompt, `prompt-${index}`)}>
                            {copiedIndex === `prompt-${index}` ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                          </Button>
                       </div>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-secondary rounded-lg aspect-video p-4">
                      {scene.isGeneratingImage ? (
                          <div className="flex flex-col items-center gap-2 text-muted-foreground">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            <span>{t.results.generatingImage}</span>
                          </div>
                      ) : scene.imageUrl ? (
                        <Image src={scene.imageUrl} alt={`Generated image for scene ${scene.scene}`} width={512} height={288} className="object-contain rounded-md" />
                      ) : (
                        <div className="text-center text-muted-foreground">
                            <ImageIcon className="h-10 w-10 mx-auto mb-2"/>
                            <Button size="sm" onClick={() => handleGenerateImage(index, scene.imagePrompt)}>
                                <Wand2 className="mr-2 h-4 w-4" /> {t.results.generateImage}
                            </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
