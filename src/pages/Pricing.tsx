import React, { useMemo } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CheckCircle, X, Zap, Crown, Rocket, Sparkles } from "lucide-react";
import { usePricingPlansContent } from "@/hooks/useContentstack";

const Pricing = () => {
  const { data: pricingContent, isLoading, error } = usePricingPlansContent();

  const iconMap: { [key: string]: any } = {
    starter: Zap,
    grow: Crown,
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
        .replace(/<\/li>/g, '\n\n')
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\n\s*\n/g, '\n\n')
        .trim();
      
      return {
        name: planName || 'Plan',
        icon: IconComponent,
        price: plan.price || 'Free',
        period: plan.period || 'forever',
        description: cleanDescription || 'Plan description',
        features: plan.features?.map((f: any) => f.feature) || [],
        popular: plan.is_popular || false,
        cta: plan.price === 'Free' ? 'Get Started Free' : 'Start Free Trial'
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
          <h1 className="text-6xl md:text-7xl font-bold mb-6 animate-fade-in">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Transparent
            </span>
            {' '}Pricing
          </h1>
          <p className="text-xl text-muted-foreground mb-8 animate-fade-in max-w-2xl mx-auto">
            {pricingContent?.description || "Choose the perfect plan for your team. Scale as you grow with flexible, usage-based pricing."}
          </p>
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
                    
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                      {plan.price !== "Free" && plan.price !== "Custom" && (
                        <span className="text-muted-foreground">/{plan.period}</span>
                      )}
                      {plan.price === "Custom" && (
                        <span className="text-muted-foreground"> {plan.period}</span>
                      )}
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
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="text-sm text-foreground">{feature}</span>
                        </div>
                      ))}
                      
                      {plan.limitations.map((limitation, limitIndex) => (
                        <div key={limitIndex} className="flex items-center space-x-3">
                          <X className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{limitation}</span>
                        </div>
                      ))}
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