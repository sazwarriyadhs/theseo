'use server';
/**
 * @fileOverview Generates video assets (script, narration audio, image prompts) from website content.
 *
 * - generateVideoAssets - A function that handles the video asset generation process.
 * - GenerateVideoAssetsInput - The input type for the generateVideoAssets function.
 * - GenerateVideoAssetsOutput - The return type for the generateVideoAssets function.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/googleai';
import {z} from 'genkit';
import wav from 'wav';

// Input Schema
const GenerateVideoAssetsInputSchema = z.object({
  content: z
    .string()
    .min(100)
    .describe('The article or website content to be turned into a video.'),
});
export type GenerateVideoAssetsInput = z.infer<
  typeof GenerateVideoAssetsInputSchema
>;

// Output Schema
const SceneSchema = z.object({
  scene: z.number().describe('The scene number, starting from 1.'),
  narration: z.string().describe('The narration script for this scene.'),
  imagePrompt: z
    .string()
    .describe(
      'A descriptive prompt for an AI image generator to create a visual for this scene.'
    ),
});

const GenerateVideoAssetsOutputSchema = z.object({
  title: z.string().describe('A catchy title for the YouTube video.'),
  script: z
    .array(SceneSchema)
    .describe('An array of scenes that make up the video script.'),
  narrationAudioDataUri: z
    .string()
    .describe('The full narration audio as a WAV data URI.'),
});
export type GenerateVideoAssetsOutput = z.infer<
  typeof GenerateVideoAssetsOutputSchema
>;

// Exported function to be called from the client
export async function generateVideoAssets(
  input: GenerateVideoAssetsInput
): Promise<GenerateVideoAssetsOutput> {
  return generateVideoAssetsFlow(input);
}

// Helper to convert PCM audio buffer to WAV base64
async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    const bufs: Buffer[] = [];
    writer.on('error', reject);
    writer.on('data', (d) => bufs.push(d));
    writer.on('end', () => resolve(Buffer.concat(bufs).toString('base64')));

    writer.write(pcmData);
    writer.end();
  });
}

// Script generation prompt
const scriptGenerationPrompt = ai.definePrompt({
  name: 'generateVideoScriptPrompt',
  input: {schema: z.object({content: GenerateVideoAssetsInputSchema.shape.content})},
  output: {schema: z.object({
    title: GenerateVideoAssetsOutputSchema.shape.title,
    script: GenerateVideoAssetsOutputSchema.shape.script
  })},
  prompt: `You are an expert video script writer. Your task is to convert the following article content into a concise and engaging script for a short YouTube video.

The script should be broken down into scenes. For each scene, provide the narration text and a simple, clear prompt for an AI image generator to create a relevant visual.

Keep the narration for each scene to 1-2 sentences. Create about 5-7 scenes in total.

Article Content:
{{{content}}}
`,
});

// The main flow
const generateVideoAssetsFlow = ai.defineFlow(
  {
    name: 'generateVideoAssetsFlow',
    inputSchema: GenerateVideoAssetsInputSchema,
    outputSchema: GenerateVideoAssetsOutputSchema,
  },
  async (input) => {
    // 1. Generate the script and title
    const scriptResponse = await scriptGenerationPrompt(input);
    const scriptData = scriptResponse.output;

    if (!scriptData || !scriptData.script || scriptData.script.length === 0) {
      throw new Error('Failed to generate video script.');
    }

    // 2. Combine narration for TTS
    const fullNarration = scriptData.script
      .map((scene) => scene.narration)
      .join(' ');

    // 3. Generate TTS audio
    const { media } = await ai.generate({
      model: googleAI.model('gemini-2.5-flash-preview-tts'),
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Algenib' },
          },
        },
      },
      prompt: fullNarration,
    });

    if (!media) {
      throw new Error('Failed to generate audio narration.');
    }
    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    const wavBase64 = await toWav(audioBuffer);

    // 4. Return all assets
    return {
      title: scriptData.title,
      script: scriptData.script,
      narrationAudioDataUri: 'data:audio/wav;base64,' + wavBase64,
    };
  }
);
