import {
  ArrowLeft,
  MapPin,
  Clock,
  Users,
  Heart,
  X,
  Zap,
  Star,
  Calendar,
  Menu,
  Sparkles,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";

interface SwipeViewProps {
  onBack: () => void;
}

export const SwipeView = ({ onBack }: SwipeViewProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMatch, setShowMatch] = useState(false);
  const [matchedActivity, setMatchedActivity] = useState(null);
  const cardRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, time: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const lastMoveTime = useRef(0);
  const lastMovePos = useRef({ x: 0, y: 0 });
  const [joinedActivities, setJoinedActivities] = useState([]);

  const activities = [
    {
      id: 1,
      title: "Cricket Practice Session",
      category: "Sports",
      location: "Sports Complex Field A",
      timeLeft: "25 minutes",
      participants: 3,
      maxParticipants: 8,
      description:
        "Looking for players for a casual cricket practice session. All skill levels welcome! We'll focus on batting techniques and team coordination.",
      host: "Raj Sharma",
      department: "Computer Science • 3rd Year",
      image: "🏏",
      urgency: "high",
      tags: ["Beginner Friendly", "Outdoor", "Team Sport"],
    },
    {
      id: 2,
      title: "Acoustic Guitar Jam",
      category: "Music",
      location: "Music Room B-204",
      timeLeft: "45 minutes",
      participants: 2,
      maxParticipants: 5,
      description:
        "Chill acoustic guitar session for all skill levels. Bring your guitar or just come to listen and sing along! We'll jam to popular indie songs.",
      host: "Sarah Mitchell",
      department: "Arts & Design • 2nd Year",
      image: "🎸",
      urgency: "medium",
      tags: ["Creative", "Relaxed", "All Levels"],
    },
    {
      id: 3,
      title: "Advanced Algorithms Study",
      category: "Academic",
      location: "Central Library L3-Study Room",
      timeLeft: "1h 20min",
      participants: 4,
      maxParticipants: 6,
      description:
        "Intensive study session for next week's algorithms exam. We'll cover dynamic programming, graph theory, and complex data structures.",
      host: "Alex Kumar",
      department: "Computer Science • 4th Year",
      image: "🧠",
      urgency: "low",
      tags: ["Study Group", "Advanced", "Exam Prep"],
    },
    {
      id: 4,
      title: "Basketball Pickup Game",
      category: "Sports",
      location: "Outdoor Court 2",
      timeLeft: "35 minutes",
      participants: 6,
      maxParticipants: 10,
      description:
        "Need a few more players for competitive 5v5 basketball. Fast-paced game with experienced players. Come ready to play!",
      host: "Jordan Park",
      department: "Business Administration • 3rd Year",
      image: "🏀",
      urgency: "high",
      tags: ["Competitive", "Athletic", "Team Play"],
    },
    {
      id: 5,
      title: "Coffee & Code Meetup",
      category: "Social",
      location: "Campus Cafe - Corner Booth",
      timeLeft: "1h 5min",
      participants: 2,
      maxParticipants: 4,
      description:
        "Work on personal projects together over coffee and pastries. Great for networking and collaborative coding. Bring your laptop!",
      host: "Maya Lopez",
      department: "Computer Science • 2nd Year",
      image: "☕",
      urgency: "low",
      tags: ["Networking", "Coding", "Casual"],
    },
  ];

  const handleSwipe = useCallback(
    (direction, isVelocityBased = false) => {
      if (isAnimating) return;

      const activity = activities[currentIndex];
      setIsAnimating(true);

      const exitX = direction === "right" ? 1200 : -1200;
      const exitY = isVelocityBased ? dragOffset.y : 0;

      setDragOffset({ x: exitX, y: exitY });

      if (direction === "right") {
        // Show match animation and add to joined activities
        setTimeout(() => {
          setMatchedActivity(activity);
          setShowMatch(true);
          if (onActivityJoin) {
            onActivityJoin(activity);
          }
          resetCard();
        }, 400);
        return;
      }

      setTimeout(() => {
        resetCard();
      }, 300);
    },
    [currentIndex, isAnimating, dragOffset.y]
  );

  const resetCard = () => {
    setCurrentIndex((prev) => (prev + 1) % activities.length);
    setDragOffset({ x: 0, y: 0 });
    setVelocity({ x: 0, y: 0 });
    setIsDragging(false);
    setIsAnimating(false);
  };

  const calculateVelocity = useCallback((currentX, currentY) => {
    const now = Date.now();
    const timeDiff = now - lastMoveTime.current;

    if (timeDiff > 0) {
      const velocityX = ((currentX - lastMovePos.current.x) / timeDiff) * 16;
      const velocityY = ((currentY - lastMovePos.current.y) / timeDiff) * 16;
      setVelocity({ x: velocityX, y: velocityY });
    }

    lastMoveTime.current = now;
    lastMovePos.current = { x: currentX, y: currentY };
  }, []);

  const handleStart = useCallback(
    (clientX, clientY) => {
      if (isAnimating) return;

      setIsDragging(true);
      setDragStart({ x: clientX, y: clientY, time: Date.now() });
      setVelocity({ x: 0, y: 0 });
      lastMoveTime.current = Date.now();
      lastMovePos.current = { x: clientX, y: clientY };
      document.body.style.userSelect = "none";
    },
    [isAnimating]
  );

  const handleMove = useCallback(
    (clientX, clientY) => {
      if (!isDragging || isAnimating) return;

      const deltaX = clientX - dragStart.x;
      const deltaY = clientY - dragStart.y;
      const resistanceY = Math.sign(deltaY) * Math.sqrt(Math.abs(deltaY)) * 0.4;

      setDragOffset({ x: deltaX, y: resistanceY });
      calculateVelocity(clientX, clientY);
    },
    [isDragging, isAnimating, dragStart, calculateVelocity]
  );

  const handleEnd = useCallback(() => {
    if (!isDragging || isAnimating) return;

    document.body.style.userSelect = "";

    const swipeThreshold = 100;
    const velocityThreshold = 0.8;
    const absVelocityX = Math.abs(velocity.x);
    const absDragX = Math.abs(dragOffset.x);

    const shouldSwipe =
      absDragX > swipeThreshold || absVelocityX > velocityThreshold;

    if (shouldSwipe) {
      const direction =
        absVelocityX > velocityThreshold
          ? velocity.x > 0
            ? "right"
            : "left"
          : dragOffset.x > 0
          ? "right"
          : "left";
      handleSwipe(direction, true);
    } else {
      setDragOffset({ x: 0, y: 0 });
      setVelocity({ x: 0, y: 0 });
      setTimeout(() => setIsDragging(false), 300);
    }
  }, [isDragging, isAnimating, dragOffset, velocity, handleSwipe]);

  const handleMouseDown = useCallback(
    (e) => {
      e.preventDefault();
      handleStart(e.clientX, e.clientY);
    },
    [handleStart]
  );

  const handleTouchStart = useCallback(
    (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      handleStart(touch.clientX, touch.clientY);
    },
    [handleStart]
  );

  const handleTouchMove = useCallback(
    (e) => {
      e.preventDefault();
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        handleMove(touch.clientX, touch.clientY);
      }
    },
    [handleMove]
  );

  const handleTouchEnd = useCallback(
    (e) => {
      e.preventDefault();
      handleEnd();
    },
    [handleEnd]
  );

  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalMouseMove = (e) => {
      e.preventDefault();
      handleMove(e.clientX, e.clientY);
    };

    const handleGlobalMouseUp = (e) => {
      e.preventDefault();
      handleEnd();
    };

    document.addEventListener("mousemove", handleGlobalMouseMove, {
      passive: false,
    });
    document.addEventListener("mouseup", handleGlobalMouseUp, {
      passive: false,
    });
    document.addEventListener("touchmove", (e) => e.preventDefault(), {
      passive: false,
    });

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
      document.removeEventListener("touchmove", (e) => e.preventDefault());
    };
  }, [isDragging, handleMove, handleEnd]);

  const currentActivity = activities[currentIndex];
  const rotation = Math.max(-30, Math.min(30, dragOffset.x * 0.1));
  const opacity = Math.max(0.7, 1 - Math.abs(dragOffset.x) / 300);
  const scale = Math.max(0.95, 1 - Math.abs(dragOffset.x) / 1000);

  if (showMatch && matchedActivity) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          {/* Success Animation */}
          <div className="relative mb-8">
            <div className="w-32 h-32 mx-auto bg-black rounded-full flex items-center justify-center animate-pulse">
              <CheckCircle className="w-16 h-16 text-white" />
            </div>
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gray-800 rounded-full animate-bounce">
              <Sparkles className="w-4 h-4 text-white m-2" />
            </div>
            <div
              className="absolute -bottom-2 -left-6 w-6 h-6 bg-gray-600 rounded-full animate-bounce"
              style={{ animationDelay: "0.5s" }}
            >
              <Star className="w-3 h-3 text-white m-1.5" />
            </div>
          </div>

          <h2 className="text-4xl font-black mb-4 tracking-tight">
            Perfect Match!
          </h2>

          <div className="bg-gray-50 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{matchedActivity.image}</span>
              <h3 className="text-xl font-bold text-left">
                {matchedActivity.title}
              </h3>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {matchedActivity.location}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {matchedActivity.timeLeft} left
              </div>
            </div>
          </div>

          <p className="text-gray-600 mb-8 text-lg">
            You've successfully joined this activity! Get ready to connect with
            like-minded people.
          </p>

          <div className="space-y-4">
            <button
              onClick={() => {
                setShowMatch(false);
                setMatchedActivity(null);
              }}
              className="w-full bg-black text-white py-4 rounded-2xl font-semibold text-lg hover:bg-gray-800 transition-colors flex items-center justify-center group"
            >
              Continue Discovering
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="w-full border-2 border-black text-black py-4 rounded-2xl font-semibold text-lg hover:bg-gray-50 transition-colors">
              View My Activities
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case "Sports":
        return "bg-black";
      case "Music":
        return "bg-gray-800";
      case "Academic":
        return "bg-gray-700";
      case "Social":
        return "bg-gray-600";
      default:
        return "bg-gray-500";
    }
  };

  const getUrgencyIndicator = (urgency) => {
    switch (urgency) {
      case "high":
        return { icon: Zap, color: "bg-red-100 text-red-800", label: "Urgent" };
      case "medium":
        return {
          icon: Star,
          color: "bg-yellow-100 text-yellow-800",
          label: "Active",
        };
      case "low":
        return {
          icon: Calendar,
          color: "bg-green-100 text-green-800",
          label: "Casual",
        };
      default:
        return {
          icon: Calendar,
          color: "bg-gray-100 text-gray-800",
          label: "Normal",
        };
    }
  };

  const urgencyInfo = getUrgencyIndicator(currentActivity.urgency);
  const UrgencyIcon = urgencyInfo.icon;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="flex items-center justify-between px-6 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </button>

          <div className="text-center">
            <h1 className="text-xl font-bold">Discover Activities</h1>
            <div className="w-16 h-1 bg-black rounded-full mx-auto mt-1" />
          </div>

          <button className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <Menu className="w-5 h-5" />
            {joinedActivities.length > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-black text-white rounded-full text-xs font-bold flex items-center justify-center">
                {joinedActivities.length}
              </div>
            )}
          </button>
        </div>
      </div>

      <div className="pt-24 pb-8 px-6">
        {/* Progress indicator */}
        <div className="max-w-sm mx-auto mb-8">
          <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
            <span>
              Activity {currentIndex + 1} of {activities.length}
            </span>
            <span>{activities.length - currentIndex - 1} remaining</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-black h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / activities.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Cards Stack */}
        <div className="relative h-[600px] max-w-sm mx-auto mb-8">
          {/* Background cards */}
          {[1, 2].map((i) => {
            const nextActivity =
              activities[(currentIndex + i) % activities.length];
            return (
              <div
                key={`bg-${currentIndex}-${i}`}
                className="absolute inset-0 bg-gray-50 border border-gray-200 rounded-3xl overflow-hidden"
                style={{
                  transform: `translateY(${i * 8}px) scale(${1 - i * 0.03})`,
                  zIndex: -i,
                  opacity: 0.6 - i * 0.2,
                }}
              >
                <div className="p-6">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl opacity-50">
                      {nextActivity.image}
                    </span>
                    <h3 className="font-semibold text-gray-400 truncate">
                      {nextActivity.title}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Main card */}
          <div
            ref={cardRef}
            className="absolute inset-0 cursor-grab active:cursor-grabbing select-none touch-none"
            style={{
              transform: `translateX(${dragOffset.x}px) translateY(${dragOffset.y}px) rotate(${rotation}deg) scale(${scale})`,
              opacity,
              transition: isDragging
                ? "none"
                : "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
              zIndex: 10,
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="h-full bg-white border-2 border-gray-200 rounded-3xl shadow-2xl overflow-hidden">
              {/* Card Header */}
              <div className="relative p-6 bg-gradient-to-br from-gray-50 to-white">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{currentActivity.image}</div>
                    <div>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white ${getCategoryColor(
                          currentActivity.category
                        )}`}
                      >
                        {currentActivity.category}
                      </span>
                      <div
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ml-2 ${urgencyInfo.color}`}
                      >
                        <UrgencyIcon className="w-3 h-3" />
                        {urgencyInfo.label}
                      </div>
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-black mb-4 leading-tight">
                  {currentActivity.title}
                </h2>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {currentActivity.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-white border border-gray-300 rounded-full text-xs font-medium text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Body */}
              <div className="px-6 pb-6">
                {/* Location & Time Grid */}
                <div className="grid grid-cols-1 gap-3 mb-6">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">
                        {currentActivity.location}
                      </p>
                      <p className="text-sm text-gray-600">
                        Tap for directions
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-2xl">
                      <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">
                          {currentActivity.timeLeft}
                        </p>
                        <p className="text-xs text-gray-600">Remaining</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-2xl">
                      <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">
                          {currentActivity.participants}/
                          {currentActivity.maxParticipants}
                        </p>
                        <p className="text-xs text-gray-600">Joined</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {currentActivity.description}
                  </p>
                </div>

                {/* Host Info */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white font-black text-lg">
                      {currentActivity.host.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">
                        {currentActivity.host}
                      </p>
                      <p className="text-sm text-gray-600">
                        {currentActivity.department}
                      </p>
                    </div>
                    <button className="px-3 py-1 bg-white border border-gray-300 rounded-full text-xs font-medium hover:bg-gray-50 transition-colors">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Swipe Indicators */}
          {isDragging && (
            <>
              <div
                className={`absolute top-20 left-6 px-4 py-2 rounded-2xl border-2 transition-all duration-200 ${
                  dragOffset.x > 60
                    ? "border-green-500 bg-green-50 opacity-100 scale-110"
                    : "border-green-200 bg-green-50/50 opacity-60 scale-90"
                }`}
                style={{
                  transform: `translateX(${Math.max(0, dragOffset.x * 0.2)}px)`,
                }}
              >
                <span className="text-green-700 font-bold text-sm flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  JOIN
                </span>
              </div>

              <div
                className={`absolute top-20 right-6 px-4 py-2 rounded-2xl border-2 transition-all duration-200 ${
                  dragOffset.x < -60
                    ? "border-red-500 bg-red-50 opacity-100 scale-110"
                    : "border-red-200 bg-red-50/50 opacity-60 scale-90"
                }`}
                style={{
                  transform: `translateX(${Math.min(0, dragOffset.x * 0.2)}px)`,
                }}
              >
                <span className="text-red-700 font-bold text-sm flex items-center gap-2">
                  <X className="w-4 h-4" />
                  PASS
                </span>
              </div>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-6 max-w-sm mx-auto mb-6">
          <button
            className="w-16 h-16 bg-white border-2 border-gray-300 rounded-full hover:border-red-400 hover:bg-red-50 transition-all duration-300 group active:scale-95 shadow-lg"
            onClick={() => handleSwipe("left")}
            disabled={isAnimating}
          >
            <X className="w-6 h-6 text-gray-600 group-hover:text-red-500 transition-colors mx-auto" />
          </button>

          <button
            className="w-20 h-20 bg-black hover:bg-gray-800 rounded-full shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300"
            onClick={() => handleSwipe("right")}
            disabled={isAnimating}
          >
            <Heart className="w-8 h-8 text-white mx-auto" />
          </button>

          <button
            className="w-16 h-16 bg-white border-2 border-gray-300 rounded-full hover:border-yellow-400 hover:bg-yellow-50 transition-all duration-300 group active:scale-95 shadow-lg"
            onClick={() => handleSwipe("right")}
            disabled={isAnimating}
          >
            <Star className="w-6 h-6 text-gray-600 group-hover:text-yellow-500 transition-colors mx-auto" />
          </button>
        </div>

        <div className="text-center max-w-xs mx-auto">
          <p className="text-sm text-gray-500 leading-relaxed mb-2">
            Swipe right to join • Swipe left to pass • Tap star to save for
            later
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
            <div className="w-2 h-2 bg-gray-300 rounded-full" />
            <span>Drag cards or use buttons</span>
            <div className="w-2 h-2 bg-gray-300 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
