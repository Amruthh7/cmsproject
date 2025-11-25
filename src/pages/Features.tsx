import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Zap, Globe, Shield, Code, Layers, Users, Sparkles, ArrowRight, CheckCircle, RefreshCw, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFeaturesContent, useWhyChoosePlatformContent } from "@/hooks/useContentstack";
import { useQueryClient } from "@tanstack/react-query";

const Features = () => {
  const queryClient = useQueryClient();
  const { data: featuresContent, isLoading, error, refetch } = useFeaturesContent();
  const { data: whyChooseData, isLoading: whyChooseLoading, refetch: refetchWhyChoose } = useWhyChoosePlatformContent();

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['contentstack', 'features'] });
    queryClient.invalidateQueries({ queryKey: ['contentstack', 'whyChoosePlatform'] });
    refetch();
    refetchWhyChoose();
  };

  // Icon mapping for benefits
  const benefitIconMap: { [key: string]: any } = {
    checkcircle: CheckCircle,
    shield: Shield,
    clock: Clock,
    star: Star,
    zap: Zap,
    globe: Globe,
    default: CheckCircle
  };

  // Color mapping for benefits
  const getColorClasses = (color: string) => {
    const colorLower = color.toLowerCase();
    switch (colorLower) {
      case 'green':
        return { text: 'text-green-400', bgFrom: 'from-green-400', bgTo: 'to-emerald-400' };
      case 'blue':
        return { text: 'text-blue-400', bgFrom: 'from-blue-400', bgTo: 'to-cyan-400' };
      case 'purple':
        return { text: 'text-purple-400', bgFrom: 'from-purple-400', bgTo: 'to-pink-400' };
      case 'pink':
        return { text: 'text-pink-400', bgFrom: 'from-pink-400', bgTo: 'to-rose-400' };
      default:
        return { text: 'text-primary', bgFrom: 'from-primary', bgTo: 'to-accent' };
    }
  };

  // Icon mapping
  const iconMap: { [key: string]: any } = {
    zap: Zap,
    globe: Globe,
    shield: Shield,
    code: Code,
    layers: Layers,
    users: Users,
  };

  // Gradient colors for each feature
  const gradients = [
    "from-yellow-500 via-orange-500 to-red-500",
    "from-blue-500 via-cyan-500 to-teal-500",
    "from-purple-500 via-pink-500 to-rose-500",
    "from-green-500 via-emerald-500 to-teal-500",
    "from-indigo-500 via-purple-500 to-pink-500",
    "from-cyan-500 via-blue-500 to-indigo-500",
  ];
  const bgGradients = [
    "from-yellow-500/10 via-orange-500/10 to-red-500/10",
    "from-blue-500/10 via-cyan-500/10 to-teal-500/10",
    "from-purple-500/10 via-pink-500/10 to-rose-500/10",
    "from-green-500/10 via-emerald-500/10 to-teal-500/10",
    "from-indigo-500/10 via-purple-500/10 to-pink-500/10",
    "from-cyan-500/10 via-blue-500/10 to-indigo-500/10",
  ];

  // Transform Contentstack data to component format with fallback
  const featuresContentData = featuresContent as any;
  
  // Log raw data for debugging
  useEffect(() => {
    if (featuresContentData) {
      console.log('🔍 Raw Contentstack data:', {
        hasFeatures: !!featuresContentData.features,
        featuresIsArray: Array.isArray(featuresContentData.features),
        featuresCount: featuresContentData.features?.length || 0,
        features: featuresContentData.features
      });
    }
  }, [featuresContentData]);
  
  // Get features from Contentstack or use fallback
  let contentstackFeatures: any[] = [];
  try {
    if (featuresContentData?.features && Array.isArray(featuresContentData.features) && featuresContentData.features.length > 0) {
      contentstackFeatures = featuresContentData.features;
      console.log('✅ Using Contentstack features:', contentstackFeatures.length);
    } else {
      console.log('⚠️ No features array found, using fallback');
    }
  } catch (err) {
    console.error('❌ Error parsing features:', err);
  }
  
  // Ensure features is always an array
  const features = contentstackFeatures.length > 0
    ? contentstackFeatures.map((feature: any, index: number) => {
        try {
          // Handle icon - could be string (from Contentstack) or component (from fallback)
          let IconComponent = Zap;
          if (typeof feature.icon === 'string') {
            const iconName = feature.icon.toLowerCase() || 'zap';
            IconComponent = iconMap[iconName] || Zap;
          } else if (feature.icon && typeof feature.icon !== 'string') {
            // Already a component
            IconComponent = feature.icon;
          }
          
          return {
            icon: IconComponent,
            title: feature.title || '',
            description: feature.description || '',
            image: feature.image?.url || feature.image || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&crop=center&auto=format&q=80",
            gradient: gradients[index % gradients.length] || gradients[0],
            bgGradient: bgGradients[index % bgGradients.length] || bgGradients[0],
          };
        } catch (err) {
          console.error('Error mapping feature:', err, feature);
          return null;
        }
      }).filter((f: any) => f && f.title) // Filter out null and features without titles
    : [
        {
          icon: Zap,
          title: "Lightning Performance",
          description: "Deliver content at blazing speeds with our globally distributed CDN and intelligent caching.",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&crop=center&auto=format&q=80",
          gradient: "from-yellow-500 via-orange-500 to-red-500",
          bgGradient: "from-yellow-500/10 via-orange-500/10 to-red-500/10",
        },
        {
          icon: Globe,
          title: "Omnichannel Delivery",
          description: "Reach audiences anywhere with seamless content delivery across web, mobile, IoT, and beyond.",
          image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop&crop=center&auto=format&q=80",
          gradient: "from-blue-500 via-cyan-500 to-teal-500",
          bgGradient: "from-blue-500/10 via-cyan-500/10 to-teal-500/10",
        },
        {
          icon: Shield,
          title: "Enterprise Security",
          description: "Bank-level security with SOC 2 Type II compliance, advanced encryption, and role-based access.",
          image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=800&fit=crop&crop=center&auto=format&q=80",
          gradient: "from-purple-500 via-pink-500 to-rose-500",
          bgGradient: "from-purple-500/10 via-pink-500/10 to-rose-500/10",
        },
        {
          icon: Code,
          title: "Developer-First APIs",
          description: "Comprehensive REST and GraphQL APIs with SDKs in all major languages and frameworks.",
          image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=800&fit=crop&crop=center&auto=format&q=80",
          gradient: "from-green-500 via-emerald-500 to-teal-500",
          bgGradient: "from-green-500/10 via-emerald-500/10 to-teal-500/10",
        },
        {
          icon: Layers,
          title: "Composable Architecture",
          description: "Build with best-of-breed tools using our flexible, API-first headless architecture.",
          image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop&crop=center&auto=format&q=80",
          gradient: "from-indigo-500 via-purple-500 to-pink-500",
          bgGradient: "from-indigo-500/10 via-purple-500/10 to-pink-500/10",
        },
        {
          icon: Users,
          title: "Team Collaboration",
          description: "Empower teams with intuitive workflows, version control, and real-time collaboration tools.",
          image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop&crop=center&auto=format&q=80",
          gradient: "from-cyan-500 via-blue-500 to-indigo-500",
          bgGradient: "from-cyan-500/10 via-blue-500/10 to-indigo-500/10",
        }
      ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Ensure features is always defined
  const safeFeatures = Array.isArray(features) ? features : [];

  // Log features when they change
  useEffect(() => {
    if (safeFeatures.length > 0) {
      console.log('🎨 Features loaded:', safeFeatures.length, 'features');
      console.log('📋 Feature titles:', safeFeatures.map((f: any) => f?.title || 'No title'));
    }
  }, [safeFeatures]);

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
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 -z-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse delay-700"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 backdrop-blur-sm">
              <Sparkles className="w-5 h-5 text-purple-400 mr-2" />
              <span className="text-sm font-medium text-purple-400">Powerful Features</span>
            </div>
            <Button
              onClick={handleRefresh}
              variant="outline"
              size="sm"
              className="border-purple-500/30 hover:bg-purple-500/10"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-8 p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-left max-w-4xl mx-auto">
              <p className="text-red-400 font-semibold">Error Loading Features:</p>
              <p className="text-red-300 text-sm mt-1">{error.message || JSON.stringify(error)}</p>
            </div>
          )}

          <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent animate-fade-in">
            {featuresContentData?.title || "Powerful Features for Modern Teams"}
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-10 font-light leading-relaxed">
            {featuresContentData?.description || "Built for the creditworthy. Experience the ascension yourself with tools designed for trustworthy individuals."}
          </p>

          <Button 
            size="lg" 
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium px-10 py-6 rounded-full text-lg shadow-xl shadow-purple-500/30 transition-all duration-300 hover:scale-105"
          >
            Get Started Free
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 relative">
        <div className="container mx-auto max-w-7xl">
          
          <div className={`grid gap-8 ${
            safeFeatures.length === 1 ? 'grid-cols-1 max-w-md mx-auto' :
            safeFeatures.length === 2 ? 'md:grid-cols-2 max-w-4xl mx-auto' :
            'md:grid-cols-2 lg:grid-cols-3'
          }`}>
            {safeFeatures.length > 0 ? safeFeatures.map((feature, index) => {
              const IconComponent = (feature?.icon && typeof feature.icon !== 'string') ? feature.icon : Zap;
              const gradient = feature.gradient || "from-primary via-accent to-primary";
              const bgGradient = feature.bgGradient || "from-primary/10 via-accent/10 to-primary/10";
              const isHovered = hoveredIndex === index;

              return (
                <Card
                  key={index}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`group relative overflow-hidden border border-border/50 p-8 bg-card/80 backdrop-blur-xl transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl cursor-pointer ${
                    isHovered ? 'shadow-2xl border-primary/30' : 'shadow-md'
                  }`}
                >
                  {/* Elegant Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-50 group-hover:opacity-80 transition-opacity duration-700`}></div>
                  
                  {/* Subtle Glow Effect on Hover */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-700 rounded-2xl`}></div>

                  {/* Elegant Border Glow */}
                  <div className={`absolute inset-0 rounded-lg bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-700`} style={{ 
                    maskImage: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                    maskComposite: 'subtract',
                    WebkitMaskComposite: 'xor',
                    padding: '1px'
                  }}></div>

                  <div className="relative z-10">
                    {/* Icon with Elegant Container */}
                    <div className={`mb-6 w-16 h-16 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-[-5deg] transition-all duration-500`}>
                      <IconComponent className="w-8 h-8 text-white drop-shadow-lg" />
                    </div>

                    {/* Title with Elegant Typography */}
                    <h3 className={`text-xl md:text-2xl font-bold mb-4 text-foreground group-hover:text-transparent group-hover:bg-gradient-to-r ${gradient} group-hover:bg-clip-text transition-all duration-500`}>
                      {feature.title}
                    </h3>

                    {/* Description with Refined Typography */}
                    <p className="text-muted-foreground leading-relaxed mb-6 text-sm md:text-base group-hover:text-foreground/80 transition-colors duration-500 line-clamp-3">
                      {feature.description}
                    </p>

                    {/* Elegant Learn More Link */}
                    <div className="flex items-center text-sm font-medium text-primary/70 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300">
                      <span>Learn more</span>
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>

                  {/* Subtle Decorative Corner Elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/5 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-white/5 to-transparent rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                </Card>
              );
            }) : (
              <div className="col-span-full text-center py-20">
                <p className="text-xl text-muted-foreground">No features available. Please check Contentstack configuration.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-pink-500/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
              {whyChooseData?.title || "Why Choose Our Platform?"}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {whyChooseData?.description || "Experience the power of next-generation content management"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(whyChooseData?.benefits && whyChooseData.benefits.length > 0 ? whyChooseData.benefits : [
              { title: "99.99% Uptime SLA", color: "green", icon: "checkcircle" },
              { title: "Enterprise Security", color: "blue", icon: "shield" },
              { title: "24/7 Support", color: "purple", icon: "clock" },
              { title: "Global CDN", color: "pink", icon: "globe" },
            ]).map((benefit: any, index: number) => {
              const colorClasses = getColorClasses(benefit.color || 'primary');
              const IconComponent = benefitIconMap[benefit.icon?.toLowerCase()] || benefitIconMap.default;
              
              return (
                <div
                  key={index}
                  className="p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-white/10 hover:border-primary/50 transition-all duration-300 hover:scale-105 group"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colorClasses.bgFrom}/20 ${colorClasses.bgTo}/10 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <IconComponent className={`w-6 h-6 ${colorClasses.text}`} />
                      </div>
                      <span className="font-semibold text-foreground">{benefit.title}</span>
                    </div>
                    {benefit.description && (
                      <p className="text-sm text-muted-foreground ml-[52px] leading-relaxed">{benefit.description}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="relative">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 rounded-3xl blur-3xl"></div>
            
            <div className="relative bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/20 rounded-3xl p-12 md:p-16">
              <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
                Ready to Transform Your Content Strategy?
              </h2>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                Join thousands of companies already building better digital experiences with The Content
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium px-10 py-6 rounded-full text-lg shadow-xl shadow-purple-500/30 transition-all duration-300 hover:scale-105"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-purple-500/30 hover:border-purple-500/50 hover:bg-purple-500/10 font-medium px-10 py-6 rounded-full text-lg transition-all duration-300 hover:scale-105"
                >
                  Schedule Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
