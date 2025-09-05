import { Button } from "@/components/ui/button";
import { Home, Heart, Map, User, Activity } from "lucide-react";

interface NavigationProps {
  activeView: "home" | "swipe" | "map" | "profile";
  onNavigate: (view: "home" | "swipe" | "map" | "profile") => void;
}

export const Navigation = ({ activeView, onNavigate }: NavigationProps) => {
  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "swipe", icon: Heart, label: "Swipe" },
    { id: "map", icon: Map, label: "Map" },
    { id: "profile", icon: User, label: "Profile" },
    { id: "activities", icon: Activity, label: "Activity" },
  ] as const;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => onNavigate("home")}
            className="text-2xl font-bold gradient-primary bg-clip-text text-transparent hover:opacity-80 transition-smooth"
          >
            CampusConnect
          </button>

          {/* Navigation items */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeView === item.id ? "gradient" : "ghost"}
                  onClick={() => onNavigate(item.id)}
                  className="transition-smooth"
                >
                  <Icon className="w-4 h-4 md:mr-2" />
                  <span className="hidden md:inline">{item.label}</span>
                </Button>
              );
            })}
          </div>

          {/* Mobile menu placeholder */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile bottom navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border">
        <div className="grid grid-cols-4 gap-1 p-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeView === item.id ? "gradient" : "ghost"}
                onClick={() => onNavigate(item.id)}
                className="flex flex-col gap-1 h-auto py-2 transition-smooth"
                size="sm"
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
