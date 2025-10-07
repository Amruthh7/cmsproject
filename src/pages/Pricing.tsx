import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CheckCircle, X, Zap, Crown, Rocket, Sparkles } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      icon: <Zap className="w-6 h-6" />,
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
        "FlowStack branding",
        "Limited API calls"
      ],
      popular: false,
      cta: "Get Started Free"
    },
    {
      name: "Professional",
      icon: <Crown className="w-6 h-6" />,
      price: "$29",
      period: "per month",
      description: "Ideal for growing businesses and teams",
      features: [
        "Unlimited projects",
        "100GB storage",
        "Premium templates",
        "Priority support",
        "Advanced analytics",
        "Custom domains",
        "Team collaboration",
        "API access",
        "Webhook integrations"
      ],
      limitations: [],
      popular: true,
      cta: "Start Free Trial"
    },
    {
      name: "Enterprise",
      icon: <Rocket className="w-6 h-6" />,
      price: "Custom",
      period: "pricing",
      description: "For large organizations with specific needs",
      features: [
        "Everything in Professional",
        "Unlimited storage",
        "White-label solution",
        "Dedicated support",
        "Custom integrations",
        "SLA guarantee",
        "Advanced security",
        "On-premise option",
        "Custom training"
      ],
      limitations: [],
      popular: false,
      cta: "Contact Sales"
    }
  ];

  const faqs = [
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
  ];

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
            Simple, <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Transparent</span> Pricing
          </h1>
          <p className="text-xl text-muted-foreground mb-8 animate-fade-in max-w-2xl mx-auto">
            Choose the perfect plan for your team. Scale as you grow with flexible, usage-based pricing.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
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
                      {plan.icon}
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
                  
                  <p className="text-muted-foreground">{plan.description}</p>
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
            ))}
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
            {faqs.map((faq, index) => (
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