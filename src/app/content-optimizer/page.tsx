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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, FileText, Wand2, Sparkles, BookOpen, Heart } from 'lucide-react';
import {
  optimizeWebsiteContent,
  type OptimizeWebsiteContentOutput,
} from '@/ai/flows/optimize-website-content';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const formSchema = z.object({
  content: z.string().min(100, { message: 'Please enter at least 100 characters of content.' }),
  targetKeywords: z.string().min(3, { message: 'Please enter at least one target keyword.' }),
});

export default function ContentOptimizerPage() {
  const [result, setResult] = useState<OptimizeWebsiteContentOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
      targetKeywords: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await optimizeWebsiteContent(values);
      setResult(res);
    } catch (e) {
      setError('An error occurred while optimizing the content. Please try again.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-6 w-6" />
            AI Content Optimizer
          </CardTitle>
          <CardDescription>
            Paste your website content and target keywords to get AI-powered optimization advice.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website Content</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Paste your website content here..."
                        className="h-64 resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="targetKeywords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Keywords</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., digital marketing, SEO, social media" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={loading} className="w-full md:w-auto">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Optimizing...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Get Recommendations
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      
      <div className="space-y-4">
        {loading && (
          <Card className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center gap-4 text-muted-foreground">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p>AI is analyzing your content...</p>
              <p className="text-sm">This may take a moment.</p>
            </div>
          </Card>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {result && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Optimization Report</CardTitle>
              <CardDescription>Here are the AI's recommendations for your content.</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible defaultValue="seo" className="w-full">
                <AccordionItem value="seo">
                  <AccordionTrigger className="text-lg font-semibold">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" /> SEO Recommendations
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-base leading-relaxed prose prose-sm dark:prose-invert">
                    {result.seoRecommendations}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="readability">
                  <AccordionTrigger className="text-lg font-semibold">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" /> Readability Improvements
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-base leading-relaxed prose prose-sm dark:prose-invert">
                    {result.readabilityImprovements}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="engagement">
                  <AccordionTrigger className="text-lg font-semibold">
                    <div className="flex items-center gap-2">
                      <Heart className="h-5 w-5 text-primary" /> Engagement Suggestions
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-base leading-relaxed prose prose-sm dark:prose-invert">
                    {result.engagementSuggestions}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        )}

        {!result && !loading && !error && (
           <Card className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center gap-4 text-muted-foreground text-center p-8">
              <FileText className="h-12 w-12" />
              <h3 className="text-lg font-semibold">Your report will appear here</h3>
              <p className="text-sm">Fill out the form to get started.</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
