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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Megaphone, Wand2, Copy, Check } from 'lucide-react';
import {
  generateSocialMediaPosts,
  type GenerateSocialMediaPostsOutput,
} from '@/ai/flows/generate-social-media-posts';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const formSchema = z.object({
  websiteContent: z.string().min(50, { message: 'Please enter at least 50 characters of content.' }),
  platform: z.string({ required_error: 'Please select a platform.' }),
  tone: z.string().min(2, { message: 'Please specify a tone.' }),
  numberOfPosts: z.coerce.number().min(1).max(5),
});

export default function SocialMediaGeneratorClientPage({ dictionary }: { dictionary: any }) {
  const [result, setResult] = useState<GenerateSocialMediaPostsOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<number | null>(null);

  const t = dictionary;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      websiteContent: '',
      platform: 'Twitter',
      tone: 'Professional',
      numberOfPosts: 3,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await generateSocialMediaPosts(values);
      setResult(res);
    } catch (e) {
      setError(t.error || 'An error occurred while generating posts. Please try again.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Megaphone className="h-6 w-6" />
            {t.title}
          </CardTitle>
          <CardDescription>
            {t.description}
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="websiteContent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.form.contentLabel}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t.form.contentPlaceholder}
                        className="h-32 resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="platform"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.form.platformLabel}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t.form.platformPlaceholder} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Twitter">Twitter</SelectItem>
                          <SelectItem value="Facebook">Facebook</SelectItem>
                          <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                          <SelectItem value="Instagram">Instagram</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.form.toneLabel}</FormLabel>
                      <FormControl>
                        <Input placeholder={t.form.tonePlaceholder} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="numberOfPosts"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.form.postsLabel}</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" max="5" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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

      {error && (
        <Alert variant="destructive" className="max-w-3xl mx-auto">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <div className="max-w-3xl mx-auto space-y-4 animate-fade-in">
          <h2 className="text-2xl font-bold text-center">{t.results.title}</h2>
          {result.posts.map((post, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start gap-4">
                  <p className="text-muted-foreground whitespace-pre-wrap flex-1">{post}</p>
                  <Button variant="ghost" size="icon" onClick={() => handleCopy(post, index)}>
                    {copied === index ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
