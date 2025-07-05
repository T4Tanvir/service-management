import { Award, Clock, Shield, Star, ThumbsUp, Users } from "lucide-react";

export default function WhyChoose() {
  const features = [
    {
      icon: <Shield className="size-12 text-primary-600" />,
      title: "Verified Professionals",
      description:
        "All our service providers are thoroughly vetted, licensed, and insured for your peace of mind.",
      stats: "100% Verified",
    },
    {
      icon: <Clock className="size-12 text-secondary-600" />,
      title: "24/7 Availability",
      description:
        "Emergency services available round the clock. We're here when you need us most.",
      stats: "24/7 Support",
    },
    {
      icon: <Award className="size-12 text-accent-500" />,
      title: "Quality Guarantee",
      description:
        "We stand behind our work with comprehensive warranties and satisfaction guarantees.",
      stats: "90-Day Warranty",
    },
    {
      icon: <ThumbsUp className="size-12 text-success-500" />,
      title: "Transparent Pricing",
      description:
        "No hidden fees or surprise charges. Get upfront pricing before any work begins.",
      stats: "No Hidden Fees",
    },
    {
      icon: <Users className="size-12 text-primary-600" />,
      title: "Experienced Team",
      description:
        "Our professionals have years of experience and ongoing training in their specialties.",
      stats: "5+ Years Avg Experience",
    },
    {
      icon: <Star className="size-12 text-accent-500" />,
      title: "Customer Satisfaction",
      description:
        "Over 98% customer satisfaction rate with thousands of happy customers.",
      stats: "98% Satisfaction",
    },
  ];

  const achievements = [
    {
      number: "10,000+",
      label: "Happy Customers",
      icon: <Users className="size-8 text-primary-600" />,
    },
    {
      number: "5,000+",
      label: "Verified Professionals",
      icon: <Shield className="size-8 text-secondary-600" />,
    },
    {
      number: "50,000+",
      label: "Services Completed",
      icon: <ThumbsUp className="size-8 text-accent-500" />,
    },
    {
      number: "4.9/5",
      label: "Average Rating",
      icon: <Star className="size-8 text-warning-500" />,
    },
  ];

  return (
    <section
      id="why-choose-us"
      className="py-12 md:py-24 lg:py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
    >
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary-100 px-3 py-1 text-sm text-primary-600">
              Why Choose Us
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Your Trusted Home Service Partner
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We&apos;re committed to providing exceptional service quality and
              customer satisfaction. Here&apos;s what sets us apart from the
              competition.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 py-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-bl-full opacity-50"></div>
              <div className="relative">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-primary-50 to-secondary-50">
                    {feature.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-primary-600">
                      {feature.stats}
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Achievements Section */}
        <div className="mt-16 rounded-2xl bg-white p-8 md:p-12 shadow-even">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Our Achievements</h3>
            <p className="text-muted-foreground">
              Numbers that speak for our commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center group">
                <div className="flex justify-center mb-3">
                  <div className="flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-primary-50 to-secondary-50 group-hover:scale-110 transition-transform duration-300">
                    {achievement.icon}
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-1">
                  {achievement.number}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {achievement.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <div className="flex items-center gap-4 rounded-lg bg-white p-6 shadow-sm">
            <div className="flex size-12 items-center justify-center rounded-full bg-success-100">
              <Shield className="size-6 text-success-600" />
            </div>
            <div>
              <h4 className="font-bold">Fully Insured</h4>
              <p className="text-sm text-muted-foreground">
                All professionals carry comprehensive insurance
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-lg bg-white p-6 shadow-sm">
            <div className="flex size-12 items-center justify-center rounded-full bg-primary-100">
              <Award className="size-6 text-primary-600" />
            </div>
            <div>
              <h4 className="font-bold">Licensed Experts</h4>
              <p className="text-sm text-muted-foreground">
                Only certified and licensed professionals
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-lg bg-white p-6 shadow-sm">
            <div className="flex size-12 items-center justify-center rounded-full bg-accent-100">
              <Star className="size-6 text-accent-600" />
            </div>
            <div>
              <h4 className="font-bold">Satisfaction Guaranteed</h4>
              <p className="text-sm text-muted-foreground">
                100% satisfaction or we&apos;ll make it right
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
