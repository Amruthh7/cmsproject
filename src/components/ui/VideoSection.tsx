import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";

interface VideoSectionProps {
  title: string;
  description: string;
  videoPlaceholder: string;
  reverse?: boolean;
}

export function VideoSection({ title, description, videoPlaceholder, reverse = false }: VideoSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`py-24 px-6 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}
    >
      <div className="container mx-auto max-w-7xl">
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${reverse ? "lg:flex-row-reverse" : ""}`}>
          <div className={reverse ? "lg:order-2" : ""}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              {title}
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>

          <div className={reverse ? "lg:order-1" : ""}>
            <Card className="relative overflow-hidden bg-card/50 backdrop-blur-sm border-border group hover:border-accent/50 transition-all duration-500">
              <div className="aspect-video relative bg-gradient-to-br from-primary/20 to-secondary/30 flex items-center justify-center">
                {/* Video placeholder with play icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-accent/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 cursor-pointer">
                    <Play className="w-8 h-8 text-accent-foreground ml-1" />
                  </div>
                </div>
                
                {/* Animated background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Video title overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-background/80 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <p className="text-sm font-medium text-foreground">{videoPlaceholder}</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
