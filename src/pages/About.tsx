import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Target, 
  Award, 
  Globe, 
  Heart, 
  Lightbulb,
  Shield,
  Rocket,
  ArrowRight
} from "lucide-react";

const About = () => {
  const stats = [
    { number: "10M+", label: "Content Requests Daily", icon: <Globe className="w-6 h-6" /> },
    { number: "150+", label: "Countries Served", icon: <Award className="w-6 h-6" /> },
    { number: "99.9%", label: "Uptime SLA", icon: <Shield className="w-6 h-6" /> },
    { number: "10,000+", label: "Happy Customers", icon: <Heart className="w-6 h-6" /> }
  ];

  const values = [
    {
      icon: <Lightbulb className="w-8 h-8 text-primary" />,
      title: "Innovation First",
      description: "We constantly push the boundaries of what's possible in content management and delivery."
    },
    {
      icon: <Users className="w-8 h-8 text-accent" />,
      title: "Customer Obsessed",
      description: "Every decision we make is driven by delivering exceptional value to our customers."
    },
    {
      icon: <Rocket className="w-8 h-8 text-primary" />,
      title: "Speed & Performance",
      description: "We believe fast, reliable experiences are essential for modern digital success."
    },
    {
      icon: <Heart className="w-8 h-8 text-accent" />,
      title: "Inclusive & Diverse",
      description: "We build products and foster a culture that welcomes everyone, everywhere."
    }
  ];

  const team = [
    {
      name: "Alex Chen",
      role: "CEO & Co-Founder",
      bio: "Former VP of Engineering at major tech companies. Passionate about democratizing content creation.",
      image: "AC"
    },
    {
      name: "Sarah Martinez",
      role: "CTO & Co-Founder",
      bio: "20+ years in distributed systems. Led engineering teams at scale-up and Fortune 500 companies.",
      image: "SM"
    },
    {
      name: "David Kim",
      role: "Head of Product",
      bio: "Product leader with expertise in developer tools and enterprise software. Former PM at leading SaaS companies.",
      image: "DK"
    },
    {
      name: "Maria Rodriguez",
      role: "VP of Engineering",
      bio: "Full-stack engineer turned engineering leader. Expert in cloud infrastructure and API design.",
      image: "MR"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 animate-fade-in">
            About <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">FlowStack</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 animate-fade-in max-w-3xl mx-auto leading-relaxed">
            We're on a mission to empower teams worldwide to create exceptional digital experiences that drive business growth and delight customers.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Our Mission
                </h2>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  Founded in 2019, FlowStack emerged from a simple observation: content creation and management 
                  was becoming increasingly complex, while user expectations for digital experiences were soaring.
                </p>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  We set out to build a platform that would make it easy for teams of any size to create, 
                  manage, and deliver content that truly engages their audience—without the technical complexity 
                  that traditionally came with such capabilities.
                </p>
                <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 group">
                  Learn More About Our Story
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl"></div>
                <Card className="relative bg-card/80 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <Target className="w-12 h-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Vision for Tomorrow
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      A world where every organization can deliver personalized, 
                      contextual experiences that adapt in real-time to user needs and preferences.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              These principles guide everything we do, from product development to customer relationships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="group hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 group-hover:from-primary/20 group-hover:to-accent/20 transition-colors">
                      {value.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Meet Our Leadership Team
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Experienced leaders who are passionate about building technology that makes a difference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                    {member.image}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {member.name}
                  </h3>
                  <div className="text-primary font-medium mb-3">
                    {member.role}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <Card className="max-w-4xl mx-auto bg-card/80 backdrop-blur-sm border-2 border-border/50 shadow-xl">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to join our journey?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Whether you're looking to build amazing experiences or join our team, 
                we'd love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 group">
                  Start Building Today
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline">
                  View Open Positions
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default About;