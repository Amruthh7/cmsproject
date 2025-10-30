import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Zap, Globe, Shield, Code, Layers, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFeaturesContent } from "@/hooks/useContentstack";

const Features = () => {
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const { data: featuresContent, isLoading } = useFeaturesContent();

  // Icon mapping
  const iconMap: { [key: string]: any } = {
    zap: Zap,
    globe: Globe,
    shield: Shield,
    code: Code,
    layers: Layers,
    users: Users,
  };

  // Transform Contentstack data to component format with fallback
  const featuresContentData = featuresContent as any;
  const features = (featuresContentData?.features && Array.isArray(featuresContentData.features) && featuresContentData.features.length > 0)
    ? featuresContentData.features.map((feature: any) => ({
        icon: iconMap[feature.icon?.toLowerCase()] || Zap,
        title: feature.title,
        description: feature.description,
        image: feature.image?.url || feature.image || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&crop=center&auto=format&q=80",
      }))
    : [
        {
          icon: Zap,
          title: "Lightning Performance",
          description: "Deliver content at blazing speeds with our globally distributed CDN and intelligent caching.",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&crop=center&auto=format&q=80",
        },
        {
          icon: Globe,
          title: "Omnichannel Delivery",
          description: "Reach audiences anywhere with seamless content delivery across web, mobile, IoT, and beyond.",
          image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop&crop=center&auto=format&q=80",
        },
        {
          icon: Shield,
          title: "Enterprise Security",
          description: "Bank-level security with SOC 2 Type II compliance, advanced encryption, and role-based access.",
          image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=800&fit=crop&crop=center&auto=format&q=80",
        },
        {
          icon: Code,
          title: "Developer-First APIs",
          description: "Comprehensive REST and GraphQL APIs with SDKs in all major languages and frameworks.",
          image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=800&fit=crop&crop=center&auto=format&q=80",
        },
        {
          icon: Layers,
          title: "Composable Architecture",
          description: "Build with best-of-breed tools using our flexible, API-first headless architecture.",
          image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop&crop=center&auto=format&q=80",
        },
        {
          icon: Users,
          title: "Team Collaboration",
          description: "Empower teams with intuitive workflows, version control, and real-time collaboration tools.",
          image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop&crop=center&auto=format&q=80",
        }
      ];

  // Update index if features change
  useEffect(() => {
    if (features.length > 0 && currentFeatureIndex >= features.length) {
      setCurrentFeatureIndex(0);
    }
  }, [features.length, currentFeatureIndex]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl text-muted-foreground">Loading features...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 text-foreground tracking-tight">
            {featuresContentData?.title || "Powerful Features for Modern Teams"}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 font-light leading-relaxed">
            {featuresContentData?.description || "Built for the creditworthy. Experience the ascension yourself with tools designed for trustworthy individuals."}
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-background font-medium px-12 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105">
            Get Started Free
          </Button>
        </div>
      </section>

      <section className="py-32 px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-7xl font-bold mb-8 text-foreground tracking-tight">
                Scroll to Explore Features
              </h2>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto font-light leading-relaxed">
                Each feature reveals itself as you scroll down the page
              </p>
            </div>

            {/* Feature Box with Clickable Navigation */}
            <div className="w-full mb-16">
              <div className="w-full h-[600px] bg-card border border-border rounded-2xl overflow-hidden relative">
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
                  style={{
                    backgroundImage: `url(${features[currentFeatureIndex]?.image})`,
                    filter: 'brightness(0.8)'
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />

                <div className="absolute inset-0 p-12 flex flex-col justify-center items-start text-left transition-all duration-1000 ease-in-out z-10">
                  <div className="w-24 h-24 rounded-2xl bg-primary/20 backdrop-blur-sm flex items-center justify-center mb-10 transition-all duration-1000">
                    {React.createElement(features[currentFeatureIndex]?.icon || Zap, {
                      className: "w-12 h-12 text-primary transition-all duration-1000"
                    })}
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold mb-8 text-white transition-all duration-1000 max-w-lg">
                    {features[currentFeatureIndex]?.title}
                  </h3>
                  <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-lg transition-all duration-1000 font-light">
                    {features[currentFeatureIndex]?.description}
                  </p>
                </div>

                {/* Clickable Dots */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
                  {features.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentFeatureIndex(index)}
                      className={`w-4 h-4 rounded-full transition-all duration-500 cursor-pointer hover:scale-125 ${
                        index === currentFeatureIndex
                          ? 'bg-white scale-125 shadow-lg'
                          : 'bg-white/40 hover:bg-white/60'
                      }`}
                    />
                  ))}
                </div>

                {/* Progress Counter */}
                <div className="absolute top-8 right-8 z-20">
                  <div className="bg-black/80 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <p className="text-sm text-white/80">
                      {currentFeatureIndex + 1} of {features.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Grid Fallback */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 md:hidden">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="p-8 bg-card border border-border hover:border-primary/50 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                    {React.createElement(feature.icon, { className: "w-7 h-7 text-primary" })}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button size="lg" variant="outline" className="text-lg px-10 py-7 border-2 border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300">
                Explore All Features
              </Button>
            </div>
          </div>
        </section>

      <section className="py-32 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="text-5xl md:text-7xl font-bold mb-8 text-foreground tracking-tight">
              Ready to Transform Your{" "}
              <span className="text-primary">
                Content Strategy?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-16 font-light leading-relaxed">
              Join thousands of companies already building better digital experiences with The Content
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-background font-medium px-12 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105">
                Start Free Trial
              </Button>
              <Button size="lg" variant="ghost" className="text-foreground hover:text-primary font-medium px-12 py-4 text-lg transition-all duration-300">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;