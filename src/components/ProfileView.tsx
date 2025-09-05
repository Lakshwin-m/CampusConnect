import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User, Settings, MapPin, Clock, Heart } from "lucide-react";

interface ProfileViewProps {
  onBack: () => void;
}

export const ProfileView = ({ onBack }: ProfileViewProps) => {
  const userStats = {
    activitiesJoined: 23,
    activitiesHosted: 8,
    connections: 47,
  };

  const interests = [
    "Cricket",
    "Guitar",
    "Coding",
    "Photography",
    "Basketball",
    "Study Groups",
  ];

  const recentActivities = [
    {
      title: "Guitar Jam Session",
      type: "hosted",
      date: "2 hours ago",
      participants: 4,
    },
    {
      title: "Basketball Game",
      type: "joined",
      date: "Yesterday",
      participants: 8,
    },
    {
      title: "Study Group - DS",
      type: "joined",
      date: "3 days ago",
      participants: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black pt-20 pb-20">
      <div className="max-w-md mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-black hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Profile</h1>
          <Button
            variant="ghost"
            size="sm"
            className="text-black hover:bg-gray-100"
          ></Button>
        </div>

        {/* Profile Header */}
        <Card className="border border-gray-200 shadow-sm mb-6 p-6">
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-black mx-auto mb-4 flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-1">Alex Johnson</h2>
            <p className="text-gray-500 mb-4">Computer Science • 3rd Year</p>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {userStats.activitiesJoined}
                </div>
                <div className="text-sm text-gray-500">Joined</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {userStats.activitiesHosted}
                </div>
                <div className="text-sm text-gray-500">Hosted</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {userStats.connections}
                </div>
                <div className="text-sm text-gray-500">Connections</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Interests */}
        <Card className="border border-gray-200 shadow-sm mb-6 p-6">
          <h3 className="text-lg font-semibold mb-4">Interests</h3>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest, index) => (
              <Badge
                key={index}
                variant="outline"
                className="border-black text-black"
              >
                {interest}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Recent Activities */}
        <Card className="border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-3 pb-3 border-b border-gray-200 last:border-0 last:pb-0"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === "hosted" ? "bg-black" : "bg-gray-300"
                  }`}
                >
                  {activity.type === "hosted" ? (
                    <MapPin className="w-5 h-5 text-white" />
                  ) : (
                    <Heart className="w-5 h-5 text-black" />
                  )}
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{activity.title}</span>
                    <Badge
                      variant="outline"
                      className="border-gray-400 text-gray-600 text-xs"
                    >
                      {activity.type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {activity.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {activity.participants} people
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Action Buttons */}
      </div>
    </div>
  );
};
