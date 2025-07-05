'use server';
/**
 * @fileOverview Generates Instagram post assets (captions, hashtags, image prompts) from website content.
 *
 * - generateInstagramAssets - A function that handles the Instagram asset generation process.
 * - GenerateInstagramAssetsInput - The input type for the generateInstagramAssets function.
 * - GenerateInstagramAssetsOutput - The return type for the generateInstagramAssets function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input Schema
const GenerateInstagramAssetsInputSchema = z.object({
  content: z
    .string()
    .min(50)
    .describe('The article or website content to be turned into Instagram posts.'),
});
export type GenerateInstagramAssetsInput = z.infer<
  typeof GenerateInstagramAssetsInputSchema
>;

// Output Schema
const PostSchema = z.object({
  caption: z.string().describe('The engaging caption for the Instagram post.'),
  hashtags: z
    .string()
    .describe('A string of relevant hashtags, separated by spaces.'),
  imagePrompt: z
    .string()
    .describe(
      'A descriptive prompt for an AI image generator to create a visual for this post.'
    ),
});

const GenerateInstagramAssetsOutputSchema = z.object({
  posts: z
    .array(PostSchema)
    .describe('An array of 3-5 suggested Instagram posts.'),
});
export type GenerateInstagramAssetsOutput = z.infer<
  typeof GenerateInstagramAssetsOutputSchema
>;

// Exported function to be called from the client
export async function generateInstagramAssets(
  input: GenerateInstagramAssetsInput
): Promise<GenerateInstagramAssetsOutput> {
  return generateInstagramAssetsFlow(input);
}

// Script generation prompt
const postGenerationPrompt = ai.definePrompt({
  name: 'generateInstagramAssetsPrompt',
  input: {schema: GenerateInstagramAssetsInputSchema},
  output: {schema: GenerateInstagramAssetsOutputSchema},
  prompt: `You are an expert social media manager specializing in Instagram. Your task is to convert the following content into 3-5 engaging Instagram post ideas.

For each post idea, provide:
1. A compelling and concise caption.
2. A string of relevant, popular hashtags (e.g., #digitalmarketing #seo #socialmedia).
3. A simple, clear prompt for an AI image generator to create a relevant visual.

Content to analyze:
{{{content}}}
`,
});

// The main flow
const generateInstagramAssetsFlow = ai.defineFlow(
  {
    name: 'generateInstagramAssetsFlow',
    inputSchema: GenerateInstagramAssetsInputSchema,
    outputSchema: GenerateInstagramAssetsOutputSchema,
  },
  async (input) => {
    const {output} = await postGenerationPrompt(input);

    if (!output || !output.posts || output.posts.length === 0) {
      throw new Error('Failed to generate Instagram posts.');
    }

    return output;
  }
);
