'use server';
/**
 * @fileOverview Generates social media posts based on website content.
 *
 * - generateSocialMediaPosts - A function that generates social media posts.
 * - GenerateSocialMediaPostsInput - The input type for the generateSocialMediaPosts function.
 * - GenerateSocialMediaPostsOutput - The return type for the generateSocialMediaPosts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSocialMediaPostsInputSchema = z.object({
  websiteContent: z
    .string()
    .describe('The content of the website to generate social media posts from.'),
  platform: z
    .string()
    .describe('The social media platform to generate posts for (e.g., Twitter, Facebook, LinkedIn).'),
  tone: z
    .string()
    .optional()
    .describe('The desired tone of the social media posts (e.g., professional, funny, informative).'),
  numberOfPosts: z
    .number()
    .optional()
    .default(3)
    .describe('The number of social media posts to generate.'),
});
export type GenerateSocialMediaPostsInput = z.infer<typeof GenerateSocialMediaPostsInputSchema>;

const GenerateSocialMediaPostsOutputSchema = z.object({
  posts: z.array(z.string()).describe('An array of generated social media posts.'),
});
export type GenerateSocialMediaPostsOutput = z.infer<typeof GenerateSocialMediaPostsOutputSchema>;

export async function generateSocialMediaPosts(input: GenerateSocialMediaPostsInput): Promise<GenerateSocialMediaPostsOutput> {
  return generateSocialMediaPostsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSocialMediaPostsPrompt',
  input: {schema: GenerateSocialMediaPostsInputSchema},
  output: {schema: GenerateSocialMediaPostsOutputSchema},
  prompt: `You are an expert social media manager. Generate social media posts based on the following website content for the given platform with the specified tone.

Website Content: {{{websiteContent}}}
Platform: {{{platform}}}
Tone: {{{tone}}}
Number of Posts: {{{numberOfPosts}}}

Posts:`, // Ensure "Posts:" remains at the end to guide the LLM to output the posts.
});

const generateSocialMediaPostsFlow = ai.defineFlow(
  {
    name: 'generateSocialMediaPostsFlow',
    inputSchema: GenerateSocialMediaPostsInputSchema,
    outputSchema: GenerateSocialMediaPostsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
