import InstagramGeneratorClientPage from "@/components/instagram-generator-client";
import InstagramFeedPreview from "@/components/instagram-feed-preview";
import { Separator } from "@/components/ui/separator";

export default function InstagramOptimizationPage() {
    const dictionary = {
        title: "AI Instagram Post Generator",
        description: "Turn your content into engaging Instagram posts with AI-generated captions, hashtags, and image ideas.",
        form: {
            contentLabel: "Content Source",
            contentPlaceholder: "Paste your content here...",
            button: "Generate Posts",
            loading: "Generating..."
        },
        results: {
            loadingTitle: "AI is creating your Instagram posts...",
            loadingDescription: "This may take a moment.",
            title: "Generated Instagram Posts",
            caption: "Caption",
            hashtags: "Hashtags",
            imagePrompt: "Image Idea",
            generateImage: "Generate Image",
            generatingImage: "Generating..."
        },
        error: "An error occurred while generating Instagram posts. Please try again.",
        errorTitle: "Generation Failed",
        feedPreview: {
          title: "Instagram Feed Preview",
          description: "See how your generated posts might look on your profile."
        }
    };
    return (
        <div className="space-y-8">
            <InstagramGeneratorClientPage dictionary={dictionary} />
            <Separator />
            <InstagramFeedPreview dictionary={dictionary.feedPreview} />
        </div>
    );
}
