import React from "react";

export function CustomerPortfolio() {
  const customers = [
    "Microsoft","Amazon","Google","Apple","Netflix","Spotify","Adobe",
    "Salesforce","Oracle","IBM","Meta","Twitter","LinkedIn","Uber","Airbnb",
  ];

  // Duplicate for seamless scroll
  const scrollingCustomers = [...customers, ...customers];

  return (
    <section className="py-20 overflow-hidden bg-secondary/30 border-y border-border">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Trusted by Industry Leaders
          </h2>
          <p className="text-muted-foreground text-lg">
            Over 10,000 companies worldwide rely on FlowStack
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex gap-16 items-center animate-scroll">
            {scrollingCustomers.map((customer, index) => (
              <div key={index} className="flex-shrink-0 px-8 py-4 hover:scale-110 transition-transform duration-300">
                <div className="text-2xl font-bold text-muted-foreground/60 hover:text-foreground transition-colors duration-300 whitespace-nowrap">
                  {customer}
                </div>
              </div>
            ))}
          </div>

          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-secondary/30 to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-secondary/30 to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}
