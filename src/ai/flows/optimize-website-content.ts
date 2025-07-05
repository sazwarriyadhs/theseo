'use server';

/**
 * @fileOverview This file defines a Genkit flow for optimizing website content based on SEO principles.
 *
 * - optimizeWebsiteContent - A function that takes website content as input and returns SEO optimization recommendations.
 * - OptimizeWebsiteContentInput - The input type for the optimizeWebsiteContent function.
 * - OptimizeWebsiteContentOutput - The return type for the optimizeWebsiteContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeWebsiteContentInputSchema = z.object({
  content: z.string().describe('The website content to be optimized.'),
  targetKeywords: z
    .string()
    .describe('Comma separated list of target keywords for SEO.'),
});
export type OptimizeWebsiteContentInput = z.infer<
  typeof OptimizeWebsiteContentInputSchema
>;

const OptimizeWebsiteContentOutputSchema = z.object({
  seoRecommendations: z
    .string()
    .describe('SEO recommendations for the website content.'),
  readabilityImprovements: z
    .string()
    .describe('Readability improvements for the website content.'),
  engagementSuggestions: z
    .string()
    .describe('Suggestions to improve user engagement.'),
});

export type OptimizeWebsiteContentOutput = z.infer<
  typeof OptimizeWebsiteContentOutputSchema
>;

export async function optimizeWebsiteContent(
  input: OptimizeWebsiteContentInput
): Promise<OptimizeWebsiteContentOutput> {
  return optimizeWebsiteContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeWebsiteContentPrompt',
  input: {schema: OptimizeWebsiteContentInputSchema},
  output: {schema: OptimizeWebsiteContentOutputSchema},
  prompt: `You are an SEO expert. Analyze the website content provided and provide recommendations to improve its SEO, readability, and engagement.

  Prioritize improvements related to the target keywords: {{{targetKeywords}}}

  Content to analyze:
  {{{content}}}

  Respond with the following format:
  {
    seoRecommendations: "SEO recommendations for the website content.",
    readabilityImprovements: "Readability improvements for the website content.",
    engagementSuggestions: "Suggestions to improve user engagement.",
  }`,
});

const optimizeWebsiteContentFlow = ai.defineFlow(
  {
    name: 'optimizeWebsiteContentFlow',
    inputSchema: OptimizeWebsiteContentInputSchema,
    outputSchema: OptimizeWebsiteContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
