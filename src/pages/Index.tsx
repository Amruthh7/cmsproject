import { Header } from "@/components/Header";
import { HomeHero } from "@/components/HomeHero";
import { VideoSection } from "@/components/VideoSection";
import { CustomerPortfolio } from "@/components/CustomerPortfolio";
import { CallToAction } from "@/components/CallToAction";
import { Card } from "@/components/ui/card";
import { Zap, Globe, Shield, Code, Layers, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const keyFeatures = [
    {
      icon: Zap,
      title: "Agent OS",
      description: "Intelligent agents that adapt to user context in real-time"
    },
    {
      icon: Globe,
      title: "Omnichannel",
      description: "Deliver seamlessly across web, mobile, IoT, and beyond"
    },
    {
      icon: Shield,
      title: "Enterprise Grade",
      description: "SOC 2 compliant with bank-level security"
    },
    {
      icon: Code,
      title: "Developer First",
      description: "Comprehensive APIs and SDKs in all major languages"
    },
    {
      icon: Layers,
      title: "Composable",
      description: "Build with best-of-breed tools and integrations"
    },
    {
      icon: Users,
      title: "Collaborative",
      description: "Real-time workflows for modern teams"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HomeHero />

      {/* Key Features Grid */}
      <section className="py-24 px-6 bg-secondary/20">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Welcome to the Context Economy
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              One-size-fits-all digital experiences are over. Adapting to customers in the moment is critical.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {keyFeatures.map((feature, index) => (
              <Card 
                key={index}
                className="p-8 bg-card/50 backdrop-blur-sm border-border hover:border-accent/50 transition-all duration-300 group animate-fade-in hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                  <feature.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Video Sections */}
      <VideoSection
        title="Modernize your CMS"
        description="Create experiences faster across more channels with an easy-to-use, future-ready platform that scales with your business needs."
        videoPlaceholder="Watch: Headless CMS Platform Overview"
      />

      <VideoSection
        title="AI-Powered Workflows"
        description="Leverage intelligent automation to streamline content creation, optimize delivery, and enhance team productivity with built-in AI capabilities."
        videoPlaceholder="Watch: AI Automation in Action"
        reverse
      />

      <VideoSection
        title="Enterprise-Ready Security"
        description="Built for the most demanding security requirements with SOC 2 Type II compliance, advanced encryption, and comprehensive access controls."
        videoPlaceholder="Watch: Security & Compliance Overview"
      />

      {/* Customer Portfolio */}
      <CustomerPortfolio />

      {/* Use Cases Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Built for Every Industry
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From e-commerce to finance, healthcare to media—FlowStack powers exceptional experiences across all sectors.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "E-Commerce & Retail",
                description: "Create personalized shopping experiences that drive conversion and customer loyalty across all touchpoints.",
                metric: "45% increase in conversion"
              },
              {
                title: "Financial Services",
                description: "Deliver secure, compliant digital experiences that build trust and streamline customer journeys.",
                metric: "60% faster time-to-market"
              },
              {
                title: "Healthcare & Life Sciences",
                description: "Manage sensitive content with HIPAA-compliant workflows and deliver patient-centric experiences.",
                metric: "99.99% uptime SLA"
              },
              {
                title: "Media & Entertainment",
                description: "Scale content delivery globally with lightning-fast performance and seamless multi-device support.",
                metric: "5B+ monthly requests"
              }
            ].map((useCase, index) => (
              <Card 
                key={index}
                className="p-8 bg-card/50 backdrop-blur-sm border-border hover:border-accent/50 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-foreground">{useCase.title}</h3>
                  <div className="text-accent text-sm font-semibold">{useCase.metric}</div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">{useCase.description}</p>
                <Button variant="ghost" className="text-accent hover:text-accent/80 p-0 h-auto font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  Learn more <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CallToAction />
    </div>
  );
};

export default Index;
