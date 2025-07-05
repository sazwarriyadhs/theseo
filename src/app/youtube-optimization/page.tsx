import YouTubeGeneratorClientPage from '@/components/youtube-generator-client';
import { Separator } from '@/components/ui/separator';
import YouTubeFeedPreview from '@/components/youtube-feed-preview';

export default function YouTubeOptimizationPage() {
    const dictionary = {
        title: "AI YouTube Video Generator",
        description: "Turn your website content or articles into engaging video scripts with AI-generated narration and visuals.",
        form: {
            contentLabel: "Article or Content",
            contentPlaceholder: "Paste your blog post, article, or any other content here...",
            button: "Generate Video Assets",
            loading: "Generating..."
        },
        results: {
            loadingTitle: "AI is creating your video assets...",
            loadingDescription: "This process involves generating a script and audio, so it may take a minute.",
            title: "Video Asset Package",
            narrationTitle: "Narration Audio",
            downloadAudio: "Download WAV",
            scenesTitle: "Video Storyboard",
            scene: "Scene",
            generateImage: "Generate Image",
            generatingImage: "Generating..."
        },
        error: "An error occurred while generating video assets. Please try again.",
        errorTitle: "Generation Failed",
        feedPreview: {
            title: "YouTube Channel Preview",
            description: "See a preview of how your videos could look on your channel.",
            visitChannel: "Visit Channel"
        }
    };
    return (
        <div className="space-y-8">
            <YouTubeGeneratorClientPage dictionary={dictionary} />
            <Separator />
            <YouTubeFeedPreview dictionary={dictionary.feedPreview} />
        </div>
    );
}
