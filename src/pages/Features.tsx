import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Zap, Globe, Lock, RefreshCw, Users, BarChart3, Cloud, Smartphone, Code, Package, Layers, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

const Features = () => {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Built for speed and performance with cutting-edge technology that delivers content instantly.",
    },
    {
      icon: Globe,
      title: "Global Scale",
      description: "Deploy worldwide with confidence. Our infrastructure ensures your content reaches everyone.",
    },
    {
      icon: Lock,
      title: "Enterprise Security",
      description: "Bank-level security protecting your data with advanced encryption and compliance.",
    },
    {
      icon: RefreshCw,
      title: "Real-time Updates",
      description: "Push updates instantly across all platforms and devices without delays.",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Work together seamlessly with powerful collaboration tools and workflows.",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Deep insights into content performance with comprehensive analytics dashboard.",
    },
    {
      icon: Cloud,
      title: "Cloud Native",
      description: "Built on modern cloud infrastructure for reliability and automatic scaling.",
    },
    {
      icon: Smartphone,
      title: "Omnichannel Delivery",
      description: "Deliver content to web, mobile, IoT, and any device through powerful APIs.",
    },
    {
      icon: Code,
      title: "Developer Friendly",
      description: "Comprehensive APIs and SDKs in your favorite languages with great documentation.",
    },
    {
      icon: Package,
      title: "Content Modeling",
      description: "Flexible content structures that adapt to your business needs and workflows.",
    },
    {
      icon: Layers,
      title: "Composable Architecture",
      description: "Mix and match best-of-breed tools to create your perfect content stack.",
    },
    {
      icon: Bot,
      title: "AI-Powered",
      description: "Leverage AI to automate workflows, optimize content, and enhance productivity.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-fade-in">
            Powerful Features for Modern Teams
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-fade-in">
            Everything you need to create, manage, and deliver exceptional digital experiences at scale.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg px-8 py-6 animate-fade-in">
            Get Started Free
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="p-8 bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(33,150,243,0.3)] group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <feature.icon className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-2xl font-bold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="p-12 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 border-primary/30 text-center">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Ready to Transform Your Content?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of teams building exceptional experiences with FlowStack.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg px-8">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 border-primary/50 hover:bg-primary/10">
                Schedule Demo
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Features;
