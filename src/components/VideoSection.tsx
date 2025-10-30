import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Play, Pause } from "lucide-react";

interface VideoSectionProps {
  title: string;
  description: string;
  videoPlaceholder: string;
  reverse?: boolean;
}

export function VideoSection({ title, description, videoPlaceholder, reverse = false }: VideoSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Auto-play video when section is visible
          if (videoRef.current) {
            videoRef.current.play().catch(console.error);
            setIsPlaying(true);
          }
        } else {
          // Pause video when section is not visible
          if (videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        }
      },
      { threshold: 0.5 } // Play when 50% of the video is visible
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

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(console.error);
        setIsPlaying(true);
      }
    }
  };

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
            <Card className="relative overflow-hidden bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-blue-500/20 group hover:border-blue-500/40 transition-all duration-500 hover:scale-105">
              <div className="aspect-video relative bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-cyan-500/20">
                {/* Video element */}
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  loop
                  muted
                  playsInline
                  poster="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center&auto=format&q=80"
                >
                  <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Play/Pause overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={togglePlayPause}
                    className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500/90 to-purple-500/90 hover:from-blue-600/90 hover:to-purple-600/90 flex items-center justify-center group-hover:scale-110 transition-all duration-300 cursor-pointer backdrop-blur-sm"
                  >
                    {isPlaying ? (
                      <Pause className="w-8 h-8 text-white" />
                    ) : (
                      <Play className="w-8 h-8 text-white ml-1" />
                    )}
                  </button>
                </div>
                
                {/* Video title overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/80 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <p className="text-sm font-medium text-white">{videoPlaceholder}</p>
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
