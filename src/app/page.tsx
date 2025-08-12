"use client"

import { useState, useEffect } from "react"
// Using 'next/link' is standard in Next.js, but for a standalone React app, you might use react-router-dom's Link.
// This code assumes a Next.js environment as per the original.
import Link from "next/link"
// Importing icons from lucide-react. Ensure this library is installed.
import { Camera, TrendingUp, Zap, Award, BarChart3, ChevronRight, Star, MapPin, Users } from "lucide-react"

// These are placeholder components for ShadCN UI.
// In a real app, you would have these components defined or installed.
const Button = ({ children, className, asChild, ...props }) => {
  const Comp = asChild ? 'div' : 'button';
  return <Comp className={className} {...props}>{children}</Comp>;
};
const Card = ({ children, className, ...props }) => <div className={className} {...props}>{children}</div>;
const CardHeader = ({ children, className, ...props }) => <div className={className} {...props}>{children}</div>;
const CardTitle = ({ children, className, ...props }) => <h3 className={className}>{children}</h3>;
const CardContent = ({ children, className, ...props }) => <div className={className} {...props}>{children}</div>;
const CardDescription = ({ children, className, ...props }) => <p className={className}>{children}</p>;


export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentFeature, setCurrentFeature] = useState(0)

  // Effect for initial animation and feature card cycling
  useEffect(() => {
    setIsVisible(true)
    
    const interval = setInterval(() => {
      // Cycle through the 3 features every 3 seconds
      setCurrentFeature((prev) => (prev + 1) % 3)
    }, 3000)

    // Cleanup interval on component unmount
    return () => clearInterval(interval)
  }, [])

  // Data for the features section
  const features = [
    {
      icon: Zap,
      title: "AI-Powered Issue Detection",
      description: "Advanced machine learning algorithms automatically identify and categorize civic issues from photos and reports.",
      color: "from-yellow-500 to-orange-500" // Updated color for better visibility
    },
    {
      icon: Award,
      title: "Earn Points & Rewards",
      description: "Gamified system rewards active citizens with points, badges, and recognition for their contributions.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: BarChart3,
      title: "Track City Progress",
      description: "Real-time analytics and progress tracking show how your reports are transforming your city.",
      color: "from-blue-500 to-indigo-500"
    }
  ]

  // Data for the leaderboard section
  const topCities = [
    { name: "Mumbai", points: 15420, issues: 89, rank: 1 },
    { name: "Delhi", points: 12850, issues: 76, rank: 2 },
    { name: "Bangalore", points: 11230, issues: 65, rank: 3 },
    { name: "Chennai", points: 9870, issues: 58, rank: 4 },
    { name: "Hyderabad", points: 8450, issues: 52, rank: 5 },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-800 dark:text-gray-200">
      {/* Hero Section */}
      {/* Responsive adjustments: Adjusted min-height for mobile for better viewing on smaller screens. */}
      <section className="relative min-h-[80vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden bg-white dark:bg-black">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-green-500/10 to-blue-500/10">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,153,51,0.1)_1px,transparent_0)] bg-[length:20px_20px]"></div>
          </div>
        </div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Responsive Typography: Font sizes adjust from mobile (text-4xl) to tablet (sm:text-5xl) to desktop (lg:text-6xl) */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-black dark:text-white mb-6 leading-tight">
              Report.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-green-500">
                Reward.
              </span>{" "}
              Revive Your City.
            </h1>
            {/* Responsive Typography: Text size adjusts for better readability on different screens. */}
            <p className="text-md sm:text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Gamified AI-powered civic improvement platform for India. Join thousands of citizens making their cities better, one issue at a time.
            </p>
            {/* Responsive Layout: Buttons stack vertically on mobile (flex-col) and switch to a horizontal layout on small screens and up (sm:flex-row). */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-lg" 
                asChild
              >
                <Link href="/report" className="flex items-center justify-center">
                  <Camera className="mr-2 h-5 w-5" />
                  Report an Issue
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white font-bold px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-lg" 
                asChild
              >
                <Link href="/dashboard" className="flex items-center justify-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  View Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Elements: These are hidden on small screens (hidden) and appear on large screens (lg:block) to avoid clutter. */}
        <div className="absolute top-20 left-10 hidden lg:block animate-bounce">
          <div className="w-4 h-4 bg-yellow-500 rounded-full opacity-60"></div>
        </div>
        <div className="absolute bottom-20 right-10 hidden lg:block animate-bounce" style={{ animationDelay: '1s' }}>
          <div className="w-6 h-6 bg-green-500 rounded-full opacity-60"></div>
        </div>
      </section>

      {/* Features Section */}
      {/* Responsive Spacing: Padding and vertical spacing (py) adjust for different screen sizes. */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4">
              Why Choose Bharat Fix?
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Our platform combines cutting-edge technology with community engagement to create lasting change.
            </p>
          </div>

          {/* Responsive Grid: Stacks to a single column on mobile (grid-cols-1) and becomes a 3-column grid on medium screens (md:grid-cols-3). */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className={`group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl ${
                  currentFeature === index ? 'ring-2 ring-yellow-500 ring-opacity-75' : ''
                }`}
                onClick={() => setCurrentFeature(index)}
              >
                <CardHeader className="text-center p-6 pb-4">
                  <div className={`mx-auto w-16 h-16 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-black dark:text-white">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center p-6 pt-0">
                  <CardDescription className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard Preview Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4">
              Top Performing Cities
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              See which cities are leading the way in civic improvement and community engagement.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
              {/* Responsive Layout: Stacks on mobile, row on larger screens. */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <h3 className="text-xl font-semibold text-black dark:text-white">Current Rankings</h3>
                <Link 
                  href="/leaderboard"
                  className="inline-flex items-center text-yellow-600 hover:text-yellow-700 dark:text-yellow-500 dark:hover:text-yellow-400 font-medium transition-colors duration-200 group"
                >
                  View Full Leaderboard
                  <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </div>
            
            {/* Responsive Table: The container allows horizontal scrolling on small screens to prevent layout breaking. */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm sm:text-base">
                <thead className="bg-gray-100 dark:bg-gray-700/50">
                  <tr>
                    {/* Responsive Spacing: Padding is adjusted for mobile vs. desktop. */}
                    <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Rank</th>
                    <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">City</th>
                    <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Points</th>
                    <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Issues Resolved</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {topCities.map((city, index) => (
                    <tr 
                      key={city.name}
                      className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 ${
                        index < 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20' : ''
                      }`}
                    >
                      <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {index < 3 ? (
                            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                              index === 0 ? 'bg-yellow-400 text-yellow-900' :
                              index === 1 ? 'bg-gray-300 text-gray-700' :
                              'bg-orange-400 text-orange-900'
                            }`}>
                              {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                            </span>
                          ) : (
                            <span className="text-gray-600 dark:text-gray-400 font-medium w-8 text-center">#{city.rank}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <MapPin className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                          <span className="font-medium text-black dark:text-white">{city.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Star className="h-5 w-5 text-yellow-500 mr-3" />
                          <span className="font-semibold text-black dark:text-white">{city.points.toLocaleString()}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Users className="h-5 w-5 text-green-500 mr-3" />
                          <span className="text-black dark:text-white">{city.issues}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-yellow-500 to-green-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of citizens across India who are actively improving their cities. Every report counts!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              variant="secondary" 
              className="w-full sm:w-auto bg-white text-green-600 hover:bg-gray-100 font-bold px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-lg" 
              asChild
            >
              <Link href="/report">Get Started Today</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-green-600 font-bold px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-lg" 
              asChild
            >
              <Link href="/dashboard">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
