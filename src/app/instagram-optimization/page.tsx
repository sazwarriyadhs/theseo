import InstagramGeneratorClientPage from "@/components/instagram-generator-client";

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
        errorTitle: "Generation Failed"
    };
    return <InstagramGeneratorClientPage dictionary={dictionary} />;
}
