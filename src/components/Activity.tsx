import {
  ArrowLeft,
  MapPin,
  Clock,
  Users,
  MessageSquare,
  Calendar,
  Star,
  Zap,
  Bell,
  TrendingUp,
  Award,
  Target,
  Activity,
  ChevronRight,
  UserCheck,
  Timer,
  MoreHorizontal,
} from "lucide-react";
import { useState } from "react";

interface ActivityItem {
  id: number;
  title: string;
  category: string;
  location: string;
  timeLeft: string;
  participants: number;
  maxParticipants: number;
  description: string;
  host: string;
  department: string;
  image: string;
  urgency: string;
  joinedAt?: Date;
}

interface ActivityDashboardProps {
  joinedActivities: ActivityItem[];
  onBack: () => void;
  onLeaveActivity: (activityId: number) => void;
}

export const ActivityDashboard = ({
  joinedActivities,
  onBack,
  onLeaveActivity,
}: ActivityDashboardProps) => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedActivity, setSelectedActivity] = useState(null);

  // Mock past activities for demonstration
  const pastActivities = [
    {
      id: 101,
      title: "Morning Yoga Session",
      category: "Fitness",
      location: "Wellness Center Main Hall",
      timeLeft: "Completed",
      participants: 8,
      maxParticipants: 10,
      description:
        "Relaxing morning yoga session focused on mindfulness and flexibility. Perfect way to start the day with positive energy.",
      host: "Priya Sharma",
      department: "Health Sciences • Instructor",
      image: "🧘",
      urgency: "low",
      joinedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      rating: 4.8,
    },
    {
      id: 102,
      title: "AI Ethics Discussion",
      category: "Academic",
      location: "Tech Hub Auditorium B",
      timeLeft: "Completed",
      participants: 32,
      maxParticipants: 40,
      description:
        "Deep dive into ethical implications of AI development and deployment in modern society.",
      host: "Dr. Michael Chen",
      department: "Computer Science • Professor",
      image: "🤖",
      urgency: "medium",
      joinedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      rating: 4.9,
    },
  ];

  const getCategoryStyle = (category) => {
    switch (category) {
      case "Sports":
        return { bg: "bg-black", text: "text-white" };
      case "Music":
        return { bg: "bg-gray-800", text: "text-white" };
      case "Academic":
        return { bg: "bg-gray-700", text: "text-white" };
      case "Social":
        return { bg: "bg-gray-600", text: "text-white" };
      case "Fitness":
        return { bg: "bg-gray-500", text: "text-white" };
      default:
        return { bg: "bg-gray-400", text: "text-white" };
    }
  };

  const getUrgencyIndicator = (urgency) => {
    switch (urgency) {
      case "high":
        return {
          icon: Zap,
          color: "text-red-600",
          bg: "bg-red-50",
          label: "Urgent",
        };
      case "medium":
        return {
          icon: Star,
          color: "text-yellow-600",
          bg: "bg-yellow-50",
          label: "Active",
        };
      case "low":
        return {
          icon: Calendar,
          color: "text-green-600",
          bg: "bg-green-50",
          label: "Casual",
        };
      default:
        return {
          icon: Calendar,
          color: "text-gray-600",
          bg: "bg-gray-50",
          label: "Normal",
        };
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );
    if (diffInHours < 1) return "Just joined";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "Yesterday";
    return `${diffInDays} days ago`;
  };

  const currentActivities =
    activeTab === "upcoming" ? joinedActivities : pastActivities;

  // Activity Detail View
  if (selectedActivity) {
    const urgencyInfo = getUrgencyIndicator(selectedActivity.urgency);
    const UrgencyIcon = urgencyInfo.icon;
    const categoryStyle = getCategoryStyle(selectedActivity.category);

    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-100 z-40">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSelectedActivity(null)}
              className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back</span>
            </button>
            <h1 className="text-lg font-bold">Activity Details</h1>
            <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <MoreHorizontal className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="px-6 py-8">
          <div className="max-w-2xl mx-auto">
            {/* Activity Header */}
            <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 mb-6 shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="text-5xl">{selectedActivity.image}</div>
                <div className="flex-1">
                  <h2 className="text-3xl font-black mb-3 leading-tight">
                    {selectedActivity.title}
                  </h2>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-bold ${categoryStyle.bg} ${categoryStyle.text}`}
                    >
                      {selectedActivity.category}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${urgencyInfo.color} ${urgencyInfo.bg}`}
                    >
                      <UrgencyIcon className="w-3 h-3" />
                      {urgencyInfo.label}
                    </span>
                  </div>
                </div>
              </div>

              {/* Key Details */}
              <div className="grid gap-4 mb-6">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">
                      {selectedActivity.location}
                    </h4>
                    <p className="text-sm text-gray-600">Tap for directions</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                    <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">
                        {selectedActivity.timeLeft}
                      </p>
                      <p className="text-sm text-gray-600">
                        {activeTab === "upcoming" ? "Remaining" : "Status"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                    <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">
                        {selectedActivity.participants +
                          (activeTab === "upcoming" ? 1 : 0)}
                        /{selectedActivity.maxParticipants}
                      </p>
                      <p className="text-sm text-gray-600">Participants</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-3">
                  About this activity
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  {selectedActivity.description}
                </p>
              </div>

              {/* Host Information */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-5 mb-6">
                <h4 className="font-bold text-gray-900 mb-3">Host</h4>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center text-white font-black text-xl">
                    {selectedActivity.host.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 text-lg">
                      {selectedActivity.host}
                    </p>
                    <p className="text-gray-600">
                      {selectedActivity.department}
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                    View Profile
                  </button>
                </div>
              </div>

              {/* Past Activity Rating */}
              {activeTab === "past" && selectedActivity.rating && (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-5 mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Award className="w-5 h-5 text-green-600" />
                    <h4 className="font-bold text-green-900">
                      Activity Completed
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-green-900">
                      {selectedActivity.rating}
                    </span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(selectedActivity.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-green-700 ml-2">
                      Average rating
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {activeTab === "upcoming" && (
                <div className="flex gap-3">
                  <button className="flex-1 bg-black text-white py-4 rounded-2xl font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Message Host
                  </button>
                  <button
                    onClick={() => {
                      onLeaveActivity(selectedActivity.id);
                      setSelectedActivity(null);
                    }}
                    className="px-6 py-4 bg-white border-2 border-red-300 text-red-600 rounded-2xl font-semibold hover:bg-red-50 transition-colors"
                  >
                    Leave
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Dashboard View
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-100 z-40">
        <div className="flex items-center justify-between px-6 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </button>

          <div className="text-center">
            <h1 className="text-xl font-bold">My Activities</h1>
            <div className="w-12 h-1 bg-black rounded-full mx-auto mt-1" />
          </div>

          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-gray-400" />
            {joinedActivities.length > 0 && (
              <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
            )}
          </div>
        </div>
      </div>

      <div className="px-6 py-8">
        {/* Quick Stats */}
        {(joinedActivities.length > 0 || pastActivities.length > 0) && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto">
            <div className="bg-black text-white p-6 rounded-2xl text-center">
              <div className="flex items-center justify-center mb-2">
                <Target className="w-6 h-6 mr-2" />
                <span className="text-2xl font-black">
                  {joinedActivities.length}
                </span>
              </div>
              <p className="text-sm text-gray-300">Upcoming</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-2xl text-center">
              <div className="flex items-center justify-center mb-2">
                <Award className="w-6 h-6 mr-2 text-gray-700" />
                <span className="text-2xl font-black text-gray-900">
                  {pastActivities.length}
                </span>
              </div>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-2xl text-center">
              <div className="flex items-center justify-center mb-2">
                <Activity className="w-6 h-6 mr-2 text-gray-700" />
                <span className="text-2xl font-black text-gray-900">
                  {
                    new Set(
                      [...joinedActivities, ...pastActivities].map(
                        (a) => a.category
                      )
                    ).size
                  }
                </span>
              </div>
              <p className="text-sm text-gray-600">Categories</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-2xl text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-6 h-6 mr-2 text-gray-700" />
                <span className="text-2xl font-black text-gray-900">
                  {joinedActivities.reduce((acc, a) => acc + a.participants, 0)}
                </span>
              </div>
              <p className="text-sm text-gray-600">Connections</p>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 rounded-2xl p-1 border-2 border-gray-200">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 relative ${
                activeTab === "upcoming"
                  ? "bg-black text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Upcoming
              {joinedActivities.length > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                  {joinedActivities.length}
                </div>
              )}
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === "past"
                  ? "bg-black text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Past Activities
            </button>
          </div>
        </div>

        {/* Activities List */}
        <div className="max-w-4xl mx-auto">
          {currentActivities.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">
                {activeTab === "upcoming" ? "🎯" : "📅"}
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                {activeTab === "upcoming"
                  ? "No upcoming activities"
                  : "No past activities"}
              </h3>
              <p className="text-gray-600 max-w-md mx-auto text-lg leading-relaxed mb-8">
                {activeTab === "upcoming"
                  ? "Start discovering and join exciting activities happening around campus!"
                  : "Your completed activities will appear here once you finish them."}
              </p>
              {activeTab === "upcoming" && (
                <button
                  onClick={onBack}
                  className="bg-black text-white px-8 py-4 rounded-2xl font-semibold hover:bg-gray-800 transition-colors"
                >
                  Discover Activities
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {currentActivities.map((activity) => {
                const urgencyInfo = getUrgencyIndicator(activity.urgency);
                const UrgencyIcon = urgencyInfo.icon;
                const categoryStyle = getCategoryStyle(activity.category);

                return (
                  <div
                    key={activity.id}
                    className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-gray-400 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                    onClick={() => setSelectedActivity(activity)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="text-3xl">{activity.image}</div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-2 group-hover:text-black transition-colors text-lg">
                            {activity.title}
                          </h3>
                          <div className="flex items-center gap-3">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-bold ${categoryStyle.bg} ${categoryStyle.text}`}
                            >
                              {activity.category}
                            </span>
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${urgencyInfo.color} ${urgencyInfo.bg}`}
                            >
                              <UrgencyIcon className="w-3 h-3" />
                              {urgencyInfo.label}
                            </span>
                            {activeTab === "past" && activity.rating && (
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="text-sm font-medium text-gray-700">
                                  {activity.rating}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700 truncate">
                          {activity.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">
                          {activity.timeLeft}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">
                          {activity.participants +
                            (activeTab === "upcoming" ? 1 : 0)}
                          /{activity.maxParticipants}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                      {activity.description}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {activity.host.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {activity.host}
                          </p>
                          {activity.joinedAt && (
                            <p className="text-xs text-gray-500">
                              Joined {formatTimeAgo(activity.joinedAt)}
                            </p>
                          )}
                        </div>
                      </div>

                      {activeTab === "upcoming" && (
                        <div className="flex items-center gap-2">
                          <UserCheck className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-700">
                            Joined
                          </span>
                        </div>
                      )}
                    </div>

                    {activeTab === "upcoming" && (
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                          <span>Activity Progress</span>
                          <span>
                            {Math.round(
                              ((activity.participants + 1) /
                                activity.maxParticipants) *
                                100
                            )}
                            % full
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-black h-2 rounded-full transition-all duration-500"
                            style={{
                              width: `${Math.min(
                                100,
                                ((activity.participants + 1) /
                                  activity.maxParticipants) *
                                  100
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
