import React, { useMemo } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CheckCircle, X, Zap, Crown, Rocket, Sparkles, RefreshCw } from "lucide-react";
import { usePricingPlansContent } from "@/hooks/useContentstack";
import { useQueryClient } from "@tanstack/react-query";

const Pricing = () => {
  const queryClient = useQueryClient();
  const { data: pricingContent, isLoading, error, refetch } = usePricingPlansContent();

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['contentstack', 'pricing'] });
    refetch();
  };

  const iconMap: { [key: string]: any } = {
    starter: Zap,
    grow: Crown,
    professional: Crown,
    nexus: Rocket,
    enterprise: Rocket,
    default: Zap
  };

  // Handle array structure from Contentstack
  const plans = useMemo(() => {
    if (!pricingContent?.plans || pricingContent.plans.length === 0) {
      return [
        {
          name: "Starter",
          icon: Zap,
          price: "Free",
          period: "forever",
          description: "Perfect for small projects and personal use",
          features: [
            "Up to 3 projects",
            "5GB storage",
            "Basic templates",
            "Community support",
            "Basic analytics"
          ],
          limitations: [
            "No custom domains",
            "The Content branding",
            "Limited API calls"
          ],
          popular: false,
          cta: "Get Started Free"
        },
        {
          name: "Grow",
          icon: Crown,
          price: "$29",
          period: "per month",
          description: "Ideal for growing businesses and teams",
          features: [
            "Unlimited projects",
            "50GB storage",
            "Custom templates",
            "Priority support",
            "Advanced analytics",
            "Custom domains",
            "API access",
            "Team collaboration"
          ],
          limitations: [
            "No white-labeling",
            "Limited integrations"
          ],
          popular: true,
          cta: "Start Free Trial"
        },
        {
          name: "Nexus",
          icon: Rocket,
          price: "$99",
          period: "per month",
          description: "For large organizations with advanced needs",
          features: [
            "Everything in Grow",
            "Unlimited storage",
            "White-labeling",
            "Advanced integrations",
            "Dedicated support",
            "Custom workflows",
            "SSO integration",
            "Advanced security"
          ],
          limitations: [],
          popular: false,
          cta: "Contact Sales"
        }
      ];
    }

    return pricingContent.plans.map((plan: any) => {
      const planName = Array.isArray(plan.plan_name) ? plan.plan_name[0] : plan.plan_name;
      const IconComponent = iconMap[planName?.toLowerCase()] || iconMap.default;
      
      // Clean description with proper bullet point formatting
      const cleanDescription = String(plan.description || '')
        .replace(/<ul[^>]*>/g, '')
        .replace(/<\/ul>/g, '')
        .replace(/<li[^>]*>/g, '\n• ')
        .replace(/<\/li>/g, '\n')
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\n\s*\n/g, '\n')
        .trim();
      
      // Extract features - handle both array of objects and array of strings
      const features: string[] = [];
      if (plan.features && Array.isArray(plan.features)) {
        plan.features.forEach((f: any) => {
          if (typeof f === 'string') {
            features.push(f);
          } else if (f.feature) {
            features.push(f.feature);
          }
        });
      }
      
      // Determine CTA based on price
      let cta = 'Start Free Trial';
      if (plan.price === 'Free' || plan.price?.toLowerCase() === 'free') {
        cta = 'Get Started Free';
      } else if (plan.price === 'Custom' || plan.price?.toLowerCase() === 'custom') {
        cta = 'Contact Sales';
      }
      
      // Format period for better readability (e.g., "1year" -> "1 year", "permonth" -> "per month")
      let formattedPeriod = plan.period || 'forever';
      if (formattedPeriod !== 'forever' && formattedPeriod !== 'Custom') {
        // Add space before "year", "month", "week", "day" if missing
        formattedPeriod = formattedPeriod
          .replace(/(\d)(year|month|week|day)/gi, '$1 $2')
          .replace(/per(month|year|week|day)/gi, 'per $1');
      }
      
      return {
        name: planName || 'Plan',
        icon: IconComponent,
        price: plan.price || 'Free',
        period: formattedPeriod,
        description: cleanDescription || 'Plan description',
        features: features,
        limitations: [], // Not used in current data structure
        popular: plan.is_popular || false,
        cta: cta
      };
    });
  }, [pricingContent]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading pricing plans...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]"></div>
        </div>
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 backdrop-blur-sm">
              <Sparkles className="w-5 h-5 text-purple-400 mr-2" />
              <span className="text-sm font-medium text-purple-400">Pricing Plans</span>
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

          {/* Debug Info */}
          {error && (
            <div className="mb-8 p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-left max-w-4xl mx-auto">
              <p className="text-red-400 font-semibold">Error Loading Pricing Plans:</p>
              <p className="text-red-300 text-sm mt-1">{error.message || JSON.stringify(error)}</p>
            </div>
          )}

          <h1 className="text-6xl md:text-7xl font-bold mb-6 animate-fade-in">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Transparent
            </span>
            {' '}Pricing
          </h1>
          <div className="text-lg md:text-xl text-muted-foreground mb-12 animate-fade-in max-w-4xl mx-auto whitespace-pre-line leading-relaxed space-y-4">
            <div className="bg-muted/30 border border-muted rounded-lg p-6 md:p-8">
              {(pricingContent?.description || `Get started with no upfront costs, commitments, or hidden fees. Every plan provides full access to essential tools, allowing you to explore all key capabilities right away. As your needs expand, our flexible plans scale seamlessly with your business. 

From day one, you can rely on enterprise-grade security and reliability, supported by responsive resources and expert assistance at every stage. 

Plus, with continuous innovation, you'll automatically receive regular updates and new features at no additional cost.`)
                .replace(/<p[^>]*>/g, '')
                .replace(/<\/p>/g, '\n\n')
                .replace(/<[^>]*>/g, '')
                .replace(/&nbsp;/g, ' ')
                .replace(/&amp;/g, '&')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g, "'")
                .replace(/\n\s*\n\s*\n/g, '\n\n')
                .trim()}
            </div>
          </div>
          
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => {
              const IconComponent = typeof plan.icon === 'function' ? plan.icon : Zap;
              return (
                <Card 
                  key={index}
                  className={`p-8 relative ${
                    plan.popular 
                      ? 'border-primary shadow-[0_0_40px_rgba(33,150,243,0.3)] scale-105 bg-gradient-to-b from-primary/5 to-transparent' 
                      : 'border-border bg-card/50 backdrop-blur-sm'
                  } transition-all duration-300 hover:shadow-[0_0_30px_rgba(33,150,243,0.2)] animate-fade-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg">
                      <Sparkles className="w-4 h-4" />
                      Most Popular
                    </div>
                  )}
                  
                  <CardHeader className={`text-center ${plan.popular ? 'pt-12' : 'pt-6'}`}>
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                    </div>
                    
                    <div className="mb-6 flex flex-col items-center gap-2 relative">
                      {/* Decorative background glow for price */}
                      <div className="absolute inset-0 -z-0 flex items-center justify-center">
                        <div className="w-32 h-32 rounded-full bg-primary/5 blur-2xl"></div>
                      </div>
                      
                      <div className="relative z-10 flex items-baseline justify-center gap-1.5">
                        {plan.price === "Free" ? (
                          <div className="flex flex-col items-center">
                            <div className="relative inline-block">
                              <span className="relative text-3xl md:text-4xl font-black bg-gradient-to-br from-slate-400 via-muted-foreground to-slate-500 bg-clip-text text-transparent">
                                {plan.price}
                              </span>
                              <div className="absolute inset-0 text-3xl md:text-4xl font-black bg-gradient-to-br from-slate-400/20 via-muted-foreground/20 to-slate-500/20 bg-clip-text text-transparent blur-sm">
                                {plan.price}
                              </div>
                            </div>
                            {plan.period && plan.period !== "forever" && (
                              <span className="mt-1 text-xs font-semibold text-muted-foreground/70 uppercase tracking-[0.15em]">
                                {plan.period}
                              </span>
                            )}
                            {plan.period === "forever" && (
                              <span className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-muted/30 border border-muted-foreground/20 rounded-full">
                                <Sparkles className="w-3 h-3 text-muted-foreground/60" />
                                <span className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider">
                                  Forever Free
                                </span>
                              </span>
                            )}
                          </div>
                        ) : plan.price === "Custom" ? (
                          <div className="flex items-baseline justify-center gap-1">
                            <div className="relative inline-block">
                              <span className="relative text-2xl md:text-3xl font-black bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                                {plan.price}
                              </span>
                              <div className="absolute inset-0 text-2xl md:text-3xl font-black bg-gradient-to-br from-violet-500/30 via-fuchsia-500/30 to-pink-500/30 bg-clip-text text-transparent blur-sm">
                                {plan.price}
                              </div>
                            </div>
                            <span className="text-[10px] font-extrabold text-fuchsia-400 uppercase tracking-[0.2em]">
                              {plan.period}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-baseline gap-1 whitespace-nowrap">
                            <div className="relative inline-block">
                              <span className="relative text-2xl md:text-3xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                                {plan.price}
                              </span>
                              <div className="absolute inset-0 text-2xl md:text-3xl font-black bg-gradient-to-r from-primary/40 to-accent/40 bg-clip-text text-transparent blur-sm">
                                {plan.price}
                              </div>
                            </div>
                            <span className="text-[11px] font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent uppercase tracking-[0.2em] leading-none">
                              /{plan.period}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-muted-foreground whitespace-pre-line leading-relaxed text-left !text-left space-y-2">
                      {plan.description}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <Button 
                      size="lg" 
                      className={
                        plan.popular 
                          ? "w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg shadow-primary/30" 
                          : "w-full border-2 border-primary/30 hover:bg-primary/10"
                      }
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.cta}
                    </Button>

                    <div className="space-y-3">
                      {plan.features && plan.features.length > 0 ? (
                        plan.features.map((feature: string, featureIndex: number) => (
                          <div key={featureIndex} className="flex items-center space-x-3">
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                            <span className="text-sm text-foreground">{feature}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground italic">No features listed</p>
                      )}
                      
                      {plan.limitations && plan.limitations.length > 0 && (
                        plan.limitations.map((limitation: string, limitIndex: number) => (
                          <div key={limitIndex} className="flex items-center space-x-3">
                            <X className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{limitation}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Got questions? We've got answers. If you can't find what you're looking for, feel free to contact our support team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "Can I switch plans anytime?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately."
              },
              {
                question: "Is there a free trial?",
                answer: "Yes! Professional plan comes with a 14-day free trial. No credit card required."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, PayPal, and bank transfers for enterprise customers."
              },
              {
                question: "Do you offer refunds?",
                answer: "Yes, we offer a 30-day money-back guarantee for all paid plans."
              }
            ].map((faq, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;