import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Animated background elements with Meta blue style */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] animate-spin-slow"></div>
      </div>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3a8a08_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="container relative z-10 max-w-6xl mx-auto text-center">
        <div className="mb-6 inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 animate-fade-in">
          <span className="text-primary font-medium">✨ Introducing Agent OS - The Future of Content</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight animate-fade-in">
          The world's best
          <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mt-2">
            digital experiences
          </span>
          <span className="block mt-2">start here</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-fade-in leading-relaxed">
          Create, manage, and deliver exceptional content experiences across every channel with the platform trusted by global brands.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in">
          <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg px-10 py-7 shadow-xl shadow-primary/30 group transition-all duration-300">
            Get Started Free
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-10 py-7 border-2 border-primary/30 hover:bg-primary/10 hover:border-primary/50 group transition-all duration-300">
            <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
            Watch Demo
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="mt-20 animate-fade-in">
          <p className="text-sm text-muted-foreground mb-8 uppercase tracking-wider">Trusted by industry leaders</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">10K+</div>
              <div className="text-muted-foreground text-sm">Global Companies</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">99.99%</div>
              <div className="text-muted-foreground text-sm">Uptime SLA</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">5B+</div>
              <div className="text-muted-foreground text-sm">API Calls/Month</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">24/7</div>
              <div className="text-muted-foreground text-sm">Expert Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
