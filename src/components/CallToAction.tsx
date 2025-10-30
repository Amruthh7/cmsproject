import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

export function CallToAction() {
  const benefits = [
    "14-day free trial",
    "No credit card required",
    "Full platform access",
    "24/7 support included"
  ];

  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto text-center">
          {/* CRED-style main heading */}
          <h2 className="text-5xl md:text-7xl font-bold text-foreground mb-8 tracking-tight">
            Ready to transform your{" "}
            <span className="text-primary">
              content strategy?
            </span>
          </h2>
          
          {/* CRED-style description */}
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-16 font-light leading-relaxed">
            Join thousands of companies already building better digital experiences with The Content
          </p>

          {/* CRED-style benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center justify-center space-x-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground font-medium">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CRED-style buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-background font-medium px-12 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105"
            >
              Start Your Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="ghost" 
              className="text-foreground hover:text-primary font-medium px-12 py-4 text-lg transition-all duration-300"
            >
              Schedule Demo
            </Button>
          </div>

          {/* CRED-style footer text */}
          <p className="text-sm text-muted-foreground font-medium tracking-wide">
            Used by 10,000+ companies • No setup fees • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}