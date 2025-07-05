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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Search, Wand2 } from 'lucide-react';
import { analyzeWebsiteKeywords, type AnalyzeWebsiteKeywordsOutput } from '@/ai/flows/analyze-website-keywords';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  websiteUrl: z.string().url({ message: 'Please enter a valid URL.' }),
});

export default function KeywordAnalyzerClientPage({ dictionary }: { dictionary: any }) {
  const [result, setResult] = useState<AnalyzeWebsiteKeywordsOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const t = dictionary;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      websiteUrl: 'https://digimediakomunika.cloud',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await analyzeWebsiteKeywords(values);
      setResult(res);
    } catch (e) {
      setError(t.error || 'An error occurred while analyzing the website. Please try again.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-6 w-6" />
            {t.title}
          </CardTitle>
          <CardDescription>
            {t.description}
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              <FormField
                control={form.control}
                name="websiteUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.form.label}</FormLabel>
                    <FormControl>
                      <Input placeholder={t.form.placeholder} {...field} />
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

      {error && (
        <Alert variant="destructive" className="max-w-3xl mx-auto">
          <AlertTitle>{t.errorTitle}</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <Card className="max-w-3xl mx-auto animate-fade-in">
          <CardHeader>
            <CardTitle>{t.results.title}</CardTitle>
            <CardDescription>
              {t.results.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">{t.results.keywordsTitle}</h3>
              <div className="flex flex-wrap gap-2">
                {result.keywords.map((keyword) => (
                  <Badge key={keyword} variant="secondary" className="text-base px-3 py-1">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="text-lg font-semibold mb-2">{t.results.explanationTitle}</h3>
              <p className="text-muted-foreground">{result.explanation}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
