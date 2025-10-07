import { Card } from "@/components/ui/card";
import { Zap, Globe, Shield, Code, Layers, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Features() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Performance",
      description: "Deliver content at blazing speeds with our globally distributed CDN and intelligent caching.",
    },
    {
      icon: Globe,
      title: "Omnichannel Delivery",
      description: "Reach audiences anywhere with seamless content delivery across web, mobile, IoT, and beyond.",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level security with SOC 2 Type II compliance, advanced encryption, and role-based access.",
    },
    {
      icon: Code,
      title: "Developer-First APIs",
      description: "Comprehensive REST and GraphQL APIs with SDKs in all major languages and frameworks.",
    },
    {
      icon: Layers,
      title: "Composable Architecture",
      description: "Build with best-of-breed tools using our flexible, API-first headless architecture.",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Empower teams with intuitive workflows, version control, and real-time collaboration tools.",
    },
  ];

  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Built for the Modern
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mt-2">
              Digital Landscape
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Everything you need to create, manage, and scale exceptional digital experiences across every touchpoint.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-8 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(33,150,243,0.2)] group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>

        <div className="text-center animate-fade-in">
          <Button size="lg" variant="outline" className="text-lg px-10 py-7 border-2 border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300">
            Explore All Features
          </Button>
        </div>
      </div>
    </section>
  );
}
s