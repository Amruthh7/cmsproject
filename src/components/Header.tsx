import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles, Zap } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
    { label: "Career", href: "/career" }
  ];

  return (
    <header className="w-full border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg shadow-blue-500/30">
              <Zap className="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <div className="text-2xl font-bold group-hover:scale-105 transition-transform duration-300">
              <span className="text-white">The</span>
              <span className="text-blue-400"> Content</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return item.href.startsWith('/') ? (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`transition-colors duration-200 font-medium ${
                    isActive
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium"
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-foreground hover:text-primary transition-colors duration-300">
              Sign In
            </Button>
            <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity duration-300 shadow-lg shadow-primary/30">
              Start Free
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return item.href.startsWith('/') ? (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`transition-colors duration-200 font-medium py-2 ${
                      isActive
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                );
              })}
              <div className="flex flex-col space-y-3 pt-4 border-t">
                <Button variant="ghost" className="justify-start">
                  Sign In
                </Button>
                <Button className="bg-gradient-to-r from-primary to-accent">
                  Start Free
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}