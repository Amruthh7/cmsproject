import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Rocket, 
  Award, 
  TrendingUp, 
  Globe, 
  Code, 
  Heart,
  ArrowRight,
  Star,
  Zap,
  Shield,
  Layers
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { useCareerPageContent } from "@/hooks/useContentstack";

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
};

const Career = () => {
  const { data: careerContent, isLoading } = useCareerPageContent();

  // Icon mapping for company history
  const historyIcons = [Rocket, Zap, Globe, Shield, Layers];
  const historyColors = ["text-blue-400", "text-yellow-400", "text-green-400", "text-purple-400", "text-orange-400"];
  const historyBgColors = ["bg-blue-500/10", "bg-yellow-500/10", "bg-green-500/10", "bg-purple-500/10", "bg-orange-500/10"];

  const companyHistory = careerContent?.company_history?.map((item, index) => ({
    year: item.year,
    title: item.title,
    description: item.description,
    icon: historyIcons[index % historyIcons.length],
    color: historyColors[index % historyColors.length],
    bgColor: historyBgColors[index % historyBgColors.length]
  })) || [
    {
      year: "2020",
      title: "The Beginning",
      description: "Founded with a vision to revolutionize content management",
      icon: Rocket,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10"
    },
    {
      year: "2021",
      title: "First Breakthrough",
      description: "Launched our first AI-powered content platform",
      icon: Zap,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10"
    },
    {
      year: "2022",
      title: "Global Expansion",
      description: "Expanded to 50+ countries with enterprise clients",
      icon: Globe,
      color: "text-green-400",
      bgColor: "bg-green-500/10"
    },
    {
      year: "2023",
      title: "Security Milestone",
      description: "Achieved SOC 2 Type II certification",
      icon: Shield,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10"
    },
    {
      year: "2024",
      title: "Platform Evolution",
      description: "Launched The Content platform with advanced features",
      icon: Layers,
      color: "text-orange-400",
      bgColor: "bg-orange-500/10"
    }
  ];

  const openPositions = careerContent?.open_positions || [
    {
      title: "Senior Frontend Developer",
      location: "San Francisco, CA",
      type: "Full-time",
      department: "Engineering",
      description: "Build amazing user experiences with React, TypeScript, and modern web technologies."
    },
    {
      title: "Product Manager",
      location: "New York, NY",
      type: "Full-time",
      department: "Product",
      description: "Lead product strategy and work with cross-functional teams to deliver exceptional features."
    },
    {
      title: "DevOps Engineer",
      location: "Remote",
      type: "Full-time",
      department: "Engineering",
      description: "Scale our infrastructure and ensure 99.99% uptime for our global platform."
    },
    {
      title: "UX Designer",
      location: "Austin, TX",
      type: "Full-time",
      department: "Design",
      description: "Create intuitive and beautiful interfaces that users love."
    },
    {
      title: "Sales Engineer",
      location: "Chicago, IL",
      type: "Full-time",
      department: "Sales",
      description: "Help enterprise clients understand and implement our platform solutions."
    },
    {
      title: "Content Marketing Manager",
      location: "Remote",
      type: "Full-time",
      department: "Marketing",
      description: "Develop compelling content that showcases our platform's capabilities."
    }
  ];

  const benefits = careerContent?.benefits?.map((benefit, index) => {
    const benefitIcons = [Heart, Calendar, Award, MapPin, Users, Star];
    return {
      icon: benefitIcons[index % benefitIcons.length],
      title: benefit.title,
      description: benefit.description
    };
  }) || [
    { icon: Heart, title: "Health & Wellness", description: "Comprehensive health, dental, and vision coverage" },
    { icon: Calendar, title: "Flexible Time Off", description: "Unlimited PTO and flexible work arrangements" },
    { icon: Award, title: "Learning & Development", description: "$5,000 annual learning budget per employee" },
    { icon: MapPin, title: "Remote First", description: "Work from anywhere with global team collaboration" },
    { icon: Users, title: "Team Events", description: "Regular team building and company retreats" },
    { icon: Star, title: "Equity Program", description: "Stock options for all employees" }
  ];

  const companyStats = careerContent?.company_stats || [
    { value: "150+", label: "Team Members" },
    { value: "50+", label: "Countries" },
    { value: "4.9", label: "Glassdoor Rating" },
    { value: "99%", label: "Employee Satisfaction" }
  ];

  const heroTitle = careerContent?.title || "Join Our Mission";
  const heroSubtitle = careerContent?.subtitle || careerContent?.description || "Build the future of content management with a team that's passionate about innovation, collaboration, and making a real impact.";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-[10%] w-[500px] h-[500px] bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-20 left-[10%] w-[400px] h-[400px] bg-gradient-to-br from-green-500/10 to-cyan-500/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container relative z-10 max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Join Our <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Mission</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
            {heroSubtitle}
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {companyStats.map((stat, index) => {
              const statIcons = [Users, Globe, Star, Heart];
              const statColors = ["text-blue-400", "text-green-400", "text-yellow-400", "text-red-400"];
              const valueStr = stat.value;
              const isNumber = /^\d+/.test(valueStr);
              const numberValue = isNumber ? parseInt(valueStr.replace(/[^\d]/g, '')) : 0;
              const suffix = valueStr.includes('+') ? '+' : '';
              const isPercent = valueStr.includes('%');
              const exactValue = isPercent ? valueStr : null;

              return (
                <Card key={index} className="p-6 text-center bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105 group">
                  <div className="flex justify-center mb-4">
                    {React.createElement(statIcons[index % statIcons.length], { className: `w-8 h-8 ${statColors[index % statColors.length]} group-hover:scale-110 transition-transform` })}
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">
                    {exactValue || (isNumber && numberValue > 0 ? <AnimatedCounter end={numberValue} suffix={suffix} /> : stat.value)}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Company History Timeline */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Journey</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From a small startup to a global platform trusted by thousands of companies
            </p>
          </div>

          <div className="relative">
            {/* Dotted Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500" style={{
                backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 8px, currentColor 8px, currentColor 16px)',
                backgroundSize: 'auto 16px'
              }}></div>
            </div>
            
            <div className="space-y-12">
              {companyHistory.map((milestone, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <Card className="p-8 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105">
                      <div className={`w-16 h-16 rounded-2xl ${milestone.bgColor} flex items-center justify-center mb-6 ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'}`}>
                        {React.createElement(milestone.icon, { className: `w-8 h-8 ${milestone.color}` })}
                      </div>
                      <div className={`text-2xl font-bold ${milestone.color} mb-2`}>{milestone.year}</div>
                      <h3 className="text-2xl font-bold text-white mb-4">{milestone.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{milestone.description}</p>
                    </Card>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-background shadow-lg z-10"></div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Open <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Positions</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join our team and help us build the future of content management
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {openPositions.map((position, index) => (
              <Card key={index} className="p-8 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105 group">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">{position.title}</h3>
                  <div className="text-sm text-muted-foreground bg-blue-500/10 px-3 py-1 rounded-full">{position.type}</div>
                </div>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{position.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{position.department}</span>
                  </div>
                </div>
                
                <p className="text-muted-foreground leading-relaxed mb-6">{position.description}</p>
                
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white group-hover:scale-105 transition-all duration-300">
                  Apply Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-green-500/5 via-blue-500/5 to-purple-500/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Why You'll <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Love Working Here</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We believe in taking care of our team so they can take care of our customers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-8 text-center bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105 group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  {React.createElement(benefit.icon, { className: "w-8 h-8 text-blue-400" })}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <Card className="p-12 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-blue-500/20">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-8">
              <Rocket className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Ready to Join Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Team</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Don't see a position that fits? We're always looking for talented individuals who share our passion for innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4">
                View All Positions
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-blue-500/30 hover:bg-blue-500/10 hover:border-blue-500/50 px-8 py-4">
                Send Us Your Resume
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Career;