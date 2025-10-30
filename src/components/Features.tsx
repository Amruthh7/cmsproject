import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Zap, Globe, Shield, Code, Layers, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFeaturesContent } from "@/hooks/useContentstack";

const Features = () => {
  const { data: featuresData, isLoading, error } = useFeaturesContent();

  const iconMap = {
    zap: Zap,
    globe: Globe,
    shield: Shield,
    code: Code,
    layers: Layers,
    users: Users,
  };

  const defaultFeatures = [
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
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop&crop=center&auto=format&q=80",
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
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=800&fit=crop&crop=center&auto=format&q=80",
    },
    {
      icon: Layers,
      title: "Composable Architecture",
      description: "Build with best-of-breed tools using our flexible, API-first headless architecture.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=800&fit=crop&crop=center&auto=format&q=80",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Empower teams with intuitive workflows, version control, and real-time collaboration tools.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop&crop=center&auto=format&q=80",
    },
  ];

  const features = featuresData?.features?.map(feature => ({
    icon: iconMap[feature.icon] || Users,
    title: feature.title,
    description: feature.description,
    image: feature.image?.url || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop&crop=center&auto=format&q=80",
  })) || defaultFeatures;

  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);

  useEffect(() => {
    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;
    let lastScrollTime = 0;

    const handleScroll = (e: WheelEvent) => {
      const featuresSection = document.getElementById('features-section');
      if (!featuresSection) return;

      const rect = featuresSection.getBoundingClientRect();
      const featureBox = featuresSection.querySelector('.feature-box');
      if (!featureBox) return;

      const boxRect = featureBox.getBoundingClientRect();

      // Check if the entire box is visible on screen
      const isBoxCentered = boxRect.top >= 0 && boxRect.bottom <= window.innerHeight;
      const isBoxFullyVisible = boxRect.top >= 0 && boxRect.bottom <= window.innerHeight;

      if (isBoxCentered && isBoxFullyVisible) {
        e.preventDefault();

        const now = Date.now();
        const timeSinceLastScroll = now - lastScrollTime;

        // Very slow scroll - 60 seconds minimum between changes
        if (timeSinceLastScroll < 60000) {
          return;
        }

        if (isScrolling) return;

        isScrolling = true;
        lastScrollTime = now;
        clearTimeout(scrollTimeout);

        const direction = e.deltaY > 0 ? 1 : -1;

        if (direction === 1 && currentFeatureIndex < features.length - 1) {
          setCurrentFeatureIndex(prev => Math.min(prev + 1, features.length - 1));
        } else if (direction === -1 && currentFeatureIndex > 0) {
          setCurrentFeatureIndex(prev => Math.max(prev - 1, 0));
        } else if (direction === 1 && currentFeatureIndex === features.length - 1) {
          // Allow normal page scroll when at last feature and scrolling down
          const nextSection = document.querySelector('#cta-section');
          if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
          }
        } else if (direction === -1 && currentFeatureIndex === 0) {
          // Allow normal page scroll when at first feature and scrolling up
          const prevSection = document.querySelector('#hero-section');
          if (prevSection) {
            prevSection.scrollIntoView({ behavior: 'smooth' });
          }
        }

        scrollTimeout = setTimeout(() => {
          isScrolling = false;
        }, 60000); // 60 seconds timeout
      }
    };

    document.addEventListener('wheel', handleScroll, { passive: false });

    return () => {
      document.removeEventListener('wheel', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [currentFeatureIndex, features.length]);

  const handleDotClick = (index: number) => {
    setCurrentFeatureIndex(index);
  };

  return (
    <section id="features-section" className="py-32 px-6 relative overflow-hidden">
      {/* CRED-style minimal background */}
      <div className="absolute inset-0 bg-background" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 text-foreground tracking-tight">
            {featuresData?.title || "Powerful Features for Modern Teams"}
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto font-light leading-relaxed">
            {featuresData?.description || "Built for the creditworthy. Experience the ascension yourself with tools designed for trustworthy individuals."}
          </p>
        </div>

        {/* Animated Feature Box */}
        <div className="w-full mb-16">
          <div className="feature-box w-full h-[600px] bg-card border border-border rounded-2xl overflow-hidden relative">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
              style={{
                backgroundImage: `url(${features[currentFeatureIndex].image})`,
                filter: 'brightness(0.8)'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
            <div className="absolute inset-0 p-12 flex flex-col justify-center items-start text-left transition-all duration-1000 ease-in-out z-10">
              <div className="w-24 h-24 rounded-2xl bg-primary/20 backdrop-blur-sm flex items-center justify-center mb-10 transition-all duration-1000">
                {React.createElement(features[currentFeatureIndex].icon, {
                  className: "w-12 h-12 text-primary transition-all duration-1000"
                })}
              </div>
              <h3 className="text-4xl md:text-5xl font-bold mb-8 text-white transition-all duration-1000 max-w-lg">
                {features[currentFeatureIndex].title}
              </h3>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-lg transition-all duration-1000 font-light">
                {features[currentFeatureIndex].description}
              </p>
            </div>

            {/* Clickable Progress Indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-500 cursor-pointer hover:scale-125 ${
                    index === currentFeatureIndex 
                      ? 'bg-white scale-125 shadow-lg' 
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>

            {/* Scroll Instructions */}
            <div className="absolute top-8 right-8 z-20">
              <div className="bg-black/80 backdrop-blur-sm px-4 py-2 rounded-lg">
                <p className="text-sm text-white/80">
                  Scroll to navigate • {currentFeatureIndex + 1} of {features.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Static Grid for Mobile */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 md:hidden">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-8 bg-card border border-border hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <feature.icon className="w-7 h-7 text-primary" />
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
  );
};

export default Features;