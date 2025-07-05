import YouTubeGeneratorClientPage from '@/components/youtube-generator-client';

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
        errorTitle: "Generation Failed"
    };
    return <YouTubeGeneratorClientPage dictionary={dictionary} />;
}
