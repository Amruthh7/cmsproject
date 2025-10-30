import React from "react";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Award, Globe, Heart, ArrowRight, Sparkles, Zap, Shield, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAboutPageContent } from "@/hooks/useContentstack";
import { useQueryClient } from "@tanstack/react-query";

const About = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: aboutContent, isLoading, error, refetch } = useAboutPageContent();

  // Debug logging
  React.useEffect(() => {
    console.log('=== ABOUT PAGE DEBUG ===');
    console.log('isLoading:', isLoading);
    console.log('error:', error);
    console.log('aboutContent:', aboutContent);
    console.log('team_members length:', aboutContent?.team_members?.length || 0);
  }, [aboutContent, isLoading, error]);

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['contentstack', 'about'] });
    refetch();
  };

  const handleViewPositions = () => {
    navigate('/career');
  };

  // Icon mapping for values
  const iconMap: { [key: string]: any } = {
    innovation: Zap,
    reliability: Shield,
    simplicity: Heart,
    community: Users,
    default: Heart
  };

  // Separate leaders from team members based on position or check if they have leader data
  const allMembers = aboutContent?.team_members || [];
  
  // Ensure photos are always available - normalize photo URLs
  const normalizedMembers = allMembers.length > 0 ? allMembers.map((member: any) => {
    let photoUrl = '';
    if (member.photo) {
      if (typeof member.photo === 'string') {
        photoUrl = member.photo;
      } else if (member.photo.url) {
        photoUrl = member.photo.url;
      } else {
        photoUrl = member.photo;
      }
    }
    return {
      ...member,
      photo: photoUrl || (member.name?.includes('Sarah') ? 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=faces&auto=format&q=80' : 
                            member.name?.includes('Emily') ? 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces&auto=format&q=80' :
                            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces&auto=format&q=80')
    };
  }) : [
    // Default fallback leaders
    {
      name: "Sarah Johnson",
      position: "CEO & Co-founder",
      bio: "Former VP of Engineering at TechCorp, leading our vision for the future of content management with 15+ years of experience in scaling technology companies.",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=faces&auto=format&q=80"
    },
    {
      name: "Michael Chen",
      position: "CTO & Co-founder",
      bio: "Architect of our scalable platform infrastructure with 15+ years in distributed systems and a passion for building technology that scales globally.",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces&auto=format&q=80"
    },
    // Default fallback team members
    {
      name: "Emily Rodriguez",
      position: "Head of Engineering",
      bio: "Product strategist focused on creating intuitive user experiences that delight our customers.",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces&auto=format&q=80"
    },
    {
      name: "David Kim",
      position: "Lead Engineer",
      bio: "Full-stack developer passionate about building scalable systems and mentoring the next generation of engineers.",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces&auto=format&q=80"
    },
    {
      name: "Lisa Wang",
      position: "Head of Design",
      bio: "Creative director who believes great design is invisible and focuses on user-centered design principles.",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces&auto=format&q=80"
    },
    {
      name: "James Wilson",
      position: "Head of Marketing",
      bio: "Growth expert who loves telling stories and building communities around innovative technology solutions.",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces&auto=format&q=80"
    }
  ];
  
  // Separate into CEO, CTO, and Team Members
  const ceo = normalizedMembers.find((member: any) => {
    const pos = member.position?.toLowerCase() || '';
    return pos.includes('ceo') || (pos.includes('founder') && pos.includes('ceo'));
  });
  
  const cto = normalizedMembers.find((member: any) => {
    const pos = member.position?.toLowerCase() || '';
    return pos.includes('cto') || (pos.includes('founder') && pos.includes('cto'));
  });
  
  // Get team members (exclude CEO and CTO)
  const teamMembers = normalizedMembers.filter((member: any) => {
    const pos = member.position?.toLowerCase() || '';
    return !pos.includes('ceo') && !pos.includes('co-founder') && !pos.includes('cto') && !pos.includes('founder');
  }).slice(0, 4);
  
  console.log('CEO:', ceo);
  console.log('CTO:', cto);
  console.log('Team members:', teamMembers);

  // Default values if no data
  const heroTitle = aboutContent?.title || "Building the future of content management";
  const heroDescription = aboutContent?.subtitle || aboutContent?.description || "We're on a mission to revolutionize how companies create, manage, and deliver digital experiences that captivate and convert.";
  const mission = aboutContent?.mission_statement || "To empower teams with intelligent content management tools that adapt to their needs and scale with their growth.";
  const vision = aboutContent?.vision_statement || "A world where every digital experience is perfectly tailored to its audience, powered by intelligent content management.";
  const values = aboutContent?.values || [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="container max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 backdrop-blur-sm">
              <Sparkles className="w-5 h-5 text-purple-400 mr-2" />
              <span className="text-sm font-medium text-purple-400">About The Content</span>
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
          <div className="mb-8 p-4 bg-gray-900/50 border border-gray-700 rounded-lg text-left max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold text-white mb-4">🔍 Debug Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>Loading:</strong> {isLoading ? 'Yes' : 'No'}</p>
                <p><strong>Error:</strong> {error ? 'Yes' : 'No'}</p>
                <p><strong>Data:</strong> {aboutContent ? 'Yes' : 'No'}</p>
                <p><strong>Team Members:</strong> {aboutContent?.team_members?.length || 0}</p>
              </div>
              <div>
                <p><strong>Title:</strong> {aboutContent?.title || 'Not loaded'}</p>
                <p><strong>Mission:</strong> {aboutContent?.mission_statement ? 'Yes' : 'No'}</p>
                <p><strong>Vision:</strong> {aboutContent?.vision_statement ? 'Yes' : 'No'}</p>
                <p><strong>Values:</strong> {aboutContent?.values?.length || 0}</p>
              </div>
            </div>
            {error && (
              <div className="mt-4 p-3 bg-red-900/20 border border-red-500/30 rounded">
                <p className="text-red-400 font-semibold">Error Details:</p>
                <p className="text-red-300 text-xs mt-1">{error.message || JSON.stringify(error)}</p>
              </div>
            )}
            <div className="mt-4 text-xs text-gray-400">
              <p><strong>Check browser console (F12) for detailed logs</strong></p>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight mt-12">
            {heroTitle.split(' ').map((word, i) => 
              word.toLowerCase() === 'content' ? (
                <span key={i} className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {word}{' '}
                </span>
              ) : (
                <span key={i}>{word}{' '}</span>
              )
            )}
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed font-light">
            {heroDescription}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white text-lg px-10 py-7 shadow-xl shadow-purple-500/20 group transition-all duration-300 hover:scale-105">
              Join Our Mission
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="text-foreground hover:text-primary font-medium px-10 py-7 text-lg transition-all duration-300 hover:scale-105 border-2">
              Our Story
            </Button>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      {mission && vision && (
        <section className="py-20 px-6 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-cyan-500/5">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                  Our <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Mission</span>
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                  {mission}
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-purple-400" />
                  </div>
                  <span className="text-lg font-medium text-foreground">Passionate about innovation</span>
                </div>
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                  Our <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Vision</span>
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                  {vision}
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                    <Globe className="w-6 h-6 text-blue-400" />
              </div>
                  <span className="text-lg font-medium text-foreground">Global impact through technology</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Values */}
      {values.length > 0 && (
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                Our <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Values</span>
            </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                The principles that guide everything we do
            </p>
          </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const IconComponent = iconMap[value.value_title.toLowerCase()] || iconMap.default;
                return (
                  <Card key={index} className="p-8 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-green-500/20 hover:border-green-500/40 transition-all duration-300 hover:scale-105 group">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500/20 to-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-7 h-7 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{value.value_title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.value_description}</p>
              </Card>
                );
              })}
          </div>
        </div>
      </section>
      )}

      {/* Leadership Team - Flowchart Style */}
      {(ceo || cto || teamMembers.length > 0) && (
        <section className="py-20 px-6 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5">
          <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                Meet Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Team</span>
            </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                The visionaries leading our mission to transform content management
            </p>
          </div>

            {/* Flowchart Structure */}
            <div className="flex flex-col items-center space-y-8">
              {/* CEO at top */}
              {ceo && (
                <div className="flex flex-col items-center">
                  <Card className="p-8 bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-md border-2 border-blue-500/40 hover:border-blue-500/60 transition-all duration-300 hover:scale-105 shadow-xl shadow-blue-500/20 w-72">
                    <div className="text-center">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center mx-auto mb-6 overflow-hidden border-4 border-blue-500/50 shadow-lg">
                        <img 
                          src={typeof ceo.photo === 'string' ? ceo.photo : (ceo.photo?.url || 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=faces&auto=format&q=80')}
                          alt={ceo.name || 'CEO'}
                          className="w-28 h-28 rounded-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=faces&auto=format&q=80';
                          }}
                        />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{ceo.name || 'CEO'}</h3>
                      <p className="text-lg text-blue-400 mb-4 font-medium">{ceo.position || 'CEO'}</p>
                      <p className="text-muted-foreground leading-relaxed text-sm">{ceo.bio || 'Bio coming soon'}</p>
                    </div>
                  </Card>
                  
                  {/* Connection line down to CTO */}
                  {cto && (
                    <div className="w-0.5 h-16 bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500 mt-8"></div>
                  )}
                </div>
              )}

              {/* CTO below CEO */}
              {cto && (
                <div className="flex flex-col items-center">
                  <Card className="p-6 bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-md border-2 border-purple-500/40 hover:border-purple-500/60 transition-all duration-300 hover:scale-105 shadow-xl shadow-purple-500/20 w-64">
                    <div className="text-center">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center mx-auto mb-4 overflow-hidden border-4 border-purple-500/50 shadow-lg">
                        <img 
                          src={typeof cto.photo === 'string' ? cto.photo : (cto.photo?.url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces&auto=format&q=80')}
                          alt={cto.name || 'CTO'}
                          className="w-20 h-20 rounded-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces&auto=format&q=80';
                          }}
                        />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-1">{cto.name || 'CTO'}</h3>
                      <p className="text-base text-purple-400 mb-2 font-medium">{cto.position || 'CTO'}</p>
                      <p className="text-muted-foreground leading-relaxed text-xs">{cto.bio || 'Bio coming soon'}</p>
                    </div>
                  </Card>
                  
                  {/* Connection line down to Team Members */}
                  {teamMembers.length > 0 && (
                    <div className="w-0.5 h-16 bg-gradient-to-b from-purple-500 via-green-500 to-cyan-500 mt-8"></div>
                  )}
                </div>
              )}

              {/* Team Members T1-T4 below CTO at same level */}
              {teamMembers.length > 0 && (
                <div className="flex flex-col items-center w-full">
                  {/* Horizontal connecting line */}
                  <div className="relative w-full max-w-5xl mb-8 flex justify-center">
                    <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-green-500/50 to-transparent"></div>
                  </div>
                  
                  {/* Team Members row */}
                  <div className="flex flex-wrap items-start justify-center gap-6 md:gap-8 w-full max-w-6xl">
                    {teamMembers.map((member, index) => {
                      const photoUrl = typeof member.photo === 'string' ? member.photo : (member.photo?.url || '');
                      const fallbackImages = [
                        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces&auto=format&q=80',
                        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces&auto=format&q=80',
                        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces&auto=format&q=80',
                        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces&auto=format&q=80'
                      ];
                      return (
                        <div key={index} className="flex flex-col items-center">
                          <Card className="p-5 bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-md border-2 border-green-500/40 hover:border-green-500/60 transition-all duration-300 hover:scale-105 shadow-xl shadow-green-500/20 w-56">
                            <div className="text-center">
                              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500/30 to-blue-500/30 flex items-center justify-center mx-auto mb-3 overflow-hidden border-2 border-green-500/50 shadow-lg">
                                <img 
                                  src={photoUrl || fallbackImages[index % fallbackImages.length]}
                                  alt={member.name || `T${index + 1}`}
                                  className="w-18 h-18 rounded-full object-cover"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = fallbackImages[index % fallbackImages.length];
                                  }}
                                />
                              </div>
                              <h3 className="text-lg font-bold text-white mb-1">{member.name || `T${index + 1}`}</h3>
                              <p className="text-sm text-green-400 mb-2 font-medium">{member.position || 'Team Member'}</p>
                              <p className="text-muted-foreground leading-relaxed text-xs line-clamp-2">{member.bio || 'Bio'}</p>
                            </div>
                          </Card>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
          </div>
        </div>
      </section>
      )}


      {/* CTA */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="text-5xl md:text-7xl font-bold mb-8 text-foreground tracking-tight">
              Ready to Join Our
              <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Mission?
              </span>
              </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-16 font-light leading-relaxed">
              Be part of a team that's shaping the future of content management
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                onClick={handleViewPositions}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium px-12 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105"
              >
                  View Open Positions
                </Button>
              <Button size="lg" variant="ghost" className="text-foreground hover:text-primary font-medium px-12 py-4 text-lg transition-all duration-300">
                Learn More
              </Button>
            </div>
              </div>
        </div>
      </section>
    </div>
  );
};

export default About;