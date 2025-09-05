import { useState } from "react";
import {
  MapPin,
  Clock,
  Users,
  Zap,
  Heart,
  Map,
  ArrowRight,
  Sparkles,
  Target,
  Globe,
} from "lucide-react";
import { SwipeView } from "@/components/SwipeView";
import { ActivityDashboard } from "@/components/Activity";
import { MapView } from "@/components/MapView";
import { ProfileView } from "@/components/ProfileView";
const Index = () => {
  const [activeView, setActiveView] = useState("home");

  const renderActiveView = () => {
    switch (activeView) {
      case "swipe":
        return <SwipeView onBack={() => setActiveView("home")} />;
      case "map":
        return <MapView onBack={() => setActiveView("home")} />;
      case "profile":
        return <ProfileView onBack={() => setActiveView("home")} />;
      case "activities":
        return (
          <ActivityDashboard
            onBack={() => setActiveView("home")}
            joinedActivities={[]} // TODO: Replace with actual joined activities
            onLeaveActivity={() => {}} // TODO: Replace with actual leave handler
          />
        );
      default:
        return <HomeView onNavigate={setActiveView} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation activeView={activeView} onNavigate={setActiveView} />
      {renderActiveView()}
    </div>
  );
};

const Navigation = ({ activeView, onNavigate }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight">
              CampusConnect
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onNavigate("home")}
              className={`text-sm font-medium transition-colors ${
                activeView === "home"
                  ? "text-black"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate("swipe")}
              className={`text-sm font-medium transition-colors ${
                activeView === "swipe"
                  ? "text-black"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              Discover
            </button>
            <button
              onClick={() => onNavigate("map")}
              className={`text-sm font-medium transition-colors ${
                activeView === "map"
                  ? "text-black"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              Map
            </button>

            <button
              onClick={() => onNavigate("activities")}
              className={`text-sm font-medium transition-colors ${
                activeView === "activities"
                  ? "text-black"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              Activity
            </button>
            <button
              onClick={() => onNavigate("profile")}
              className={`text-sm font-medium transition-colors ${
                activeView === "profile"
                  ? "text-black"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              Profile
            </button>
          </div>

          <button className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

const HomeView = ({ onNavigate }) => {
  const features = [
    {
      icon: Target,
      title: "Instant Matching",
      description:
        "Create activity beacons and find like-minded peers instantly with our smart matching algorithm",
      gradient: "from-gray-900 to-gray-700",
    },
    {
      icon: Globe,
      title: "Location-Based",
      description:
        "Discover activities happening around your campus with precise location tracking",
      gradient: "from-gray-800 to-gray-600",
    },
    {
      icon: Clock,
      title: "Ephemeral Chats",
      description:
        "Privacy-focused conversations that automatically expire after activities end",
      gradient: "from-gray-700 to-gray-500",
    },
  ];

  const sampleActivities = [
    {
      title: "Cricket Practice Session",
      location: "Main Sports Complex",
      time: "25 min",
      participants: 8,
      category: "Sports",
      urgency: "high",
    },
    {
      title: "Acoustic Guitar Jam",
      location: "Music Room B-204",
      time: "45 min",
      participants: 4,
      category: "Music",
      urgency: "medium",
    },
    {
      title: "CS101 Study Circle",
      location: "Central Library L3",
      time: "1h 20min",
      participants: 12,
      category: "Academic",
      urgency: "low",
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white" />

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-green-500 mb-8">
            <Sparkles className="w-4 h-4 mr-2 text-green-500" />
            Now live on campus
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter">
            Find Your
            <span className="block bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent">
              Campus Tribe
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Connect with peers for spontaneous activities. Create beacons,
            discover opportunities, and build meaningful connections that
            matter.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => onNavigate("swipe")}
              className="group bg-black text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center justify-center shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              <Heart className="w-5 h-5 mr-3" />
              Start Discovering
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate("map")}
              className="group bg-white border-2 border-black text-black px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-gray-50 transition-all duration-300 flex items-center justify-center"
            >
              <Map className="w-5 h-5 mr-3" />
              Explore Campus
            </button>
          </div>

          {/* Stats */}
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-black rounded-full opacity-20 animate-pulse" />
        <div className="absolute bottom-32 right-16 w-6 h-6 bg-gray-800 rounded-full opacity-15 animate-bounce" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-black rounded-full opacity-25" />
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to connect with your campus community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="group">
                  <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                    <h3 className="text-2xl font-bold mb-4 text-center">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-center leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  <div className="text-center mt-4">
                    <span className="text-4xl font-black text-gray-200">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Live Activities Preview */}

      {/* CTA Section */}
      <section className="py-32 px-6 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-8 tracking-tight">
            Ready to Connect?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join thousands of students already discovering their campus
            community through meaningful activities.
          </p>
          <button
            onClick={() => onNavigate("swipe")}
            className="bg-white text-black px-12 py-6 rounded-2xl text-xl font-bold hover:bg-gray-100 transition-colors inline-flex items-center"
          >
            Get Started Today
            <ArrowRight className="w-6 h-6 ml-4" />
          </button>
        </div>
      </section>
    </div>
  );
};

// Placeholder components

export default Index;
