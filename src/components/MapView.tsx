import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Users,
  Plus,
  Minus,
  RotateCcw,
} from "lucide-react";
import { useState } from "react";

interface MapViewProps {
  onBack: () => void;
}

export const MapView = ({ onBack }: MapViewProps) => {
  const [mapCenter, setMapCenter] = useState({ x: 50, y: 50 });
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const activities = [
    {
      id: 1,
      title: "Cricket Practice",
      category: "Sports",
      location: "Sports Complex",
      timeLeft: "25 min",
      participants: 3,
      coordinates: { x: 25, y: 30 },
    },
    {
      id: 2,
      title: "Guitar Jam",
      category: "Music",
      location: "Music Room B",
      timeLeft: "45 min",
      participants: 2,
      coordinates: { x: 70, y: 40 },
    },
    {
      id: 3,
      title: "Study Group",
      category: "Study",
      location: "Library L3",
      timeLeft: "1h 20min",
      participants: 4,
      coordinates: { x: 45, y: 70 },
    },
    {
      id: 4,
      title: "Art Workshop",
      category: "Creative",
      location: "Art Studio",
      timeLeft: "2h 15min",
      participants: 6,
      coordinates: { x: 80, y: 25 },
    },
    {
      id: 5,
      title: "Coffee Meetup",
      category: "Social",
      location: "Cafeteria",
      timeLeft: "15 min",
      participants: 8,
      coordinates: { x: 35, y: 55 },
    },
  ];

  const handleMapClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMapCenter({ x, y });
  };

  const zoomIn = () => setZoomLevel(Math.min(zoomLevel * 1.2, 3));
  const zoomOut = () => setZoomLevel(Math.max(zoomLevel / 1.2, 0.5));
  const resetView = () => {
    setZoomLevel(1);
    setMapCenter({ x: 50, y: 50 });
    setSelectedActivity(null);
  };

  const getCategoryColor = (category) => {
    const colors = {
      Sports: "bg-black text-white",
      Music: "bg-gray-800 text-white",
      Study: "bg-gray-600 text-white",
      Creative: "bg-gray-400 text-black",
      Social: "bg-gray-200 text-black",
    };
    return colors[category] || "bg-gray-500 text-white";
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-200">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-black hover:bg-gray-100"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold text-black">Activity Map</h1>
        <Button className="bg-black text-white hover:bg-gray-800">
          <Plus className="w-4 h-4 mr-2" />
          Create
        </Button>
      </div>

      <div className="px-6">
        {/* Interactive Map */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold">Campus Map</h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={zoomOut}
                className="border-black text-black hover:bg-gray-100"
              >
                <Minus className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={zoomIn}
                className="border-black text-black hover:bg-gray-100"
              >
                <Plus className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={resetView}
                className="border-black text-black hover:bg-gray-100"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div
            className="relative w-full h-96 bg-gray-50 border-2 border-black cursor-crosshair overflow-hidden"
            onClick={handleMapClick}
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: `${mapCenter.x}% ${mapCenter.y}%`,
            }}
          >
            {/* Map Grid */}
            <div className="absolute inset-0 opacity-20">
              {[...Array(20)].map((_, i) => (
                <div
                  key={`v-${i}`}
                  className="absolute h-full w-px bg-gray-300"
                  style={{ left: `${i * 5}%` }}
                />
              ))}
              {[...Array(20)].map((_, i) => (
                <div
                  key={`h-${i}`}
                  className="absolute w-full h-px bg-gray-300"
                  style={{ top: `${i * 5}%` }}
                />
              ))}
            </div>

            {/* Buildings/Areas */}
            <div className="absolute inset-0">
              <div
                className="absolute bg-gray-300 border border-gray-500"
                style={{ left: "20%", top: "25%", width: "15%", height: "20%" }}
              >
                <span className="text-xs p-1 font-semibold">
                  Sports Complex
                </span>
              </div>
              <div
                className="absolute bg-gray-300 border border-gray-500"
                style={{ left: "65%", top: "35%", width: "12%", height: "15%" }}
              >
                <span className="text-xs p-1 font-semibold">Music Dept</span>
              </div>
              <div
                className="absolute bg-gray-300 border border-gray-500"
                style={{ left: "40%", top: "65%", width: "20%", height: "18%" }}
              >
                <span className="text-xs p-1 font-semibold">Library</span>
              </div>
              <div
                className="absolute bg-gray-300 border border-gray-500"
                style={{ left: "75%", top: "20%", width: "15%", height: "12%" }}
              >
                <span className="text-xs p-1 font-semibold">Art Studio</span>
              </div>
              <div
                className="absolute bg-gray-300 border border-gray-500"
                style={{ left: "30%", top: "50%", width: "18%", height: "12%" }}
              >
                <span className="text-xs p-1 font-semibold">Cafeteria</span>
              </div>
            </div>

            {/* Activity Markers */}
            {activities.map((activity) => (
              <div
                key={activity.id}
                className={`absolute w-6 h-6 rounded-full border-2 border-black cursor-pointer transition-all duration-200 flex items-center justify-center ${
                  selectedActivity?.id === activity.id
                    ? "scale-150 z-20"
                    : "hover:scale-125 z-10"
                }`}
                style={{
                  left: `${activity.coordinates.x}%`,
                  top: `${activity.coordinates.y}%`,
                  transform: "translate(-50%, -50%)",
                  backgroundColor:
                    selectedActivity?.id === activity.id ? "black" : "white",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedActivity(
                    selectedActivity?.id === activity.id ? null : activity
                  );
                }}
                title={activity.title}
              >
                <MapPin
                  className={`w-4 h-4 ${
                    selectedActivity?.id === activity.id
                      ? "text-white"
                      : "text-black"
                  }`}
                />
              </div>
            ))}

            {/* User Location */}
            <div
              className="absolute w-4 h-4 bg-black rounded-full border-2 border-white shadow-lg"
              style={{
                left: `${mapCenter.x}%`,
                top: `${mapCenter.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>

          {selectedActivity && (
            <Card className="mt-4 border-black bg-white">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge
                          className={getCategoryColor(
                            selectedActivity.category
                          )}
                        >
                          {selectedActivity.category}
                        </Badge>
                        <span className="font-semibold text-lg">
                          {selectedActivity.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{selectedActivity.location}</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {selectedActivity.timeLeft}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {selectedActivity.participants} people
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="border-black text-black hover:bg-gray-100"
                    >
                      Directions
                    </Button>
                    <Button className="bg-black text-white hover:bg-gray-800">
                      Join
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Activity List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">All Activities</h2>
          {activities.map((activity) => (
            <Card
              key={activity.id}
              className={`border-2 cursor-pointer transition-all duration-200 ${
                selectedActivity?.id === activity.id
                  ? "border-black bg-gray-50"
                  : "border-gray-200 hover:border-gray-400 bg-white"
              }`}
              onClick={() => setSelectedActivity(activity)}
            >
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className={getCategoryColor(activity.category)}>
                          {activity.category}
                        </Badge>
                        <span className="font-semibold">{activity.title}</span>
                      </div>
                      <div className="text-sm text-gray-600 mb-1">
                        {activity.description}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="font-medium">{activity.room}</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {activity.timeLeft}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {activity.participants} people
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-black text-black hover:bg-gray-100"
                  >
                    View on Map
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Create Beacon Button */}
        <div className="fixed bottom-6 right-6">
          <Button
            size="lg"
            className="rounded-full w-16 h-16 bg-black text-white hover:bg-gray-800 shadow-lg border-2 border-gray-300"
          >
            <Plus className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};
