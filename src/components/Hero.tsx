import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useHeroContent } from "@/hooks/useContentstack";

export function Hero() {
  const { data: heroContent, isLoading, error } = useHeroContent();

  // Default content fallback
  const defaultContent = {
    title: "A REFLECTION OF CLARITY.",
    subtitle: "crafted for the creditworthy",
    description: "The Content is a members-only platform that enables the trustworthy to make digital progress",
    primary_button_text: "Get Started",
    secondary_button_text: "Learn More",
    trust_indicators: [
      { metric: "10K+", label: "Global Companies" },
      { metric: "99.99%", label: "Uptime SLA" },
      { metric: "5B+", label: "API Calls/Month" },
      { metric: "24/7", label: "Expert Support" }
    ]
  };

  const content = heroContent || defaultContent;

  if (isLoading) {
    return (
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="container relative z-10 max-w-6xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded mb-6 mx-auto w-96"></div>
            <div className="h-24 bg-muted rounded mb-8 mx-auto w-full max-w-4xl"></div>
            <div className="h-6 bg-muted rounded mb-12 mx-auto w-full max-w-3xl"></div>
            <div className="flex justify-center gap-6 mb-20">
              <div className="h-12 bg-muted rounded-full w-40"></div>
              <div className="h-12 bg-muted rounded-full w-40"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      {/* CRED-style minimal background */}
      <div className="absolute inset-0 bg-background"></div>

      <div className="container relative z-10 max-w-6xl mx-auto text-center">
        {/* CRED-style subtitle */}
        <div className="mb-8 inline-block">
          <span className="text-muted-foreground font-medium text-sm tracking-widest uppercase">
            {content.subtitle}
          </span>
        </div>

        {/* CRED-style main title */}
        <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight tracking-tight">
          <span className="block">The world's best</span>
          <span className="block text-white">digital experiences</span>
          <span className="block text-muted-foreground/30">start here</span>
        </h1>
        
        {/* CRED-style description */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-16 max-w-4xl mx-auto leading-relaxed font-light">
          {content.description}
        </p>

        {/* CRED-style buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-24">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-background font-medium px-12 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105">
            {content.primary_button_text}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button size="lg" variant="ghost" className="text-foreground hover:text-primary font-medium px-12 py-4 text-lg transition-all duration-300">
            <Play className="mr-2 w-5 h-5" />
            {content.secondary_button_text}
          </Button>
        </div>

        {/* CRED-style trust indicators */}
        <div className="space-y-8">
          <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">
            Trusted by industry leaders
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-4xl mx-auto">
            {content.trust_indicators.map((indicator, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <div className="text-4xl font-bold text-primary mb-2">
                  {indicator.metric}
                </div>
                <div className="text-muted-foreground text-sm font-medium tracking-wide">
                  {indicator.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}