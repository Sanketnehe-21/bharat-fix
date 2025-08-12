"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Camera, MapPin, Filter, TrendingUp, AlertCircle, CheckCircle, Clock, BarChart3, Users, Target } from "lucide-react"

// --- Placeholder Components for ShadCN UI ---
// These are included to make the component previewable.
// In a real Next.js app, you would install and import these from your UI library.

const Button = ({ children, className, asChild, ...props }) => {
  const Comp = asChild ? 'div' : 'button';
  return <Comp className={className} {...props}>{children}</Comp>;
};
const Card = ({ children, className, ...props }) => <div className={className} {...props}>{children}</div>;
const CardHeader = ({ children, className, ...props }) => <div className={className} {...props}>{children}</div>;
const CardTitle = ({ children, className, ...props }) => <h3 className={className}>{children}</h3>;
const CardContent = ({ children, className, ...props }) => <div className={className} {...props}>{children}</div>;
const CardDescription = ({ children, className, ...props }) => <p className={className}>{children}</p>;
const Badge = ({ children, className, ...props }) => <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`} {...props}>{children}</span>;

// Placeholder for Select components
const Select = ({ children, value, onValueChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <div onClick={() => setIsOpen(!isOpen)}>{children[0]}</div>
      {isOpen && <div onMouseLeave={() => setIsOpen(false)}>{children[1]}</div>}
    </div>
  );
};
const SelectTrigger = ({ children, className }) => <div className={`cursor-pointer border rounded-md px-3 py-2 ${className}`}>{children}</div>;
const SelectValue = ({ placeholder }) => <span>{placeholder}</span>;
const SelectContent = ({ children, className }) => <div className={`absolute z-10 mt-1 w-full border rounded-md shadow-lg ${className}`}>{children}</div>;
const SelectItem = ({ children, value, className }) => <div className={`cursor-pointer px-3 py-2 ${className}`}>{children}</div>;


export default function DashboardPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  // --- Data for the Dashboard ---
  const stats = [
    { title: "Issues Reported", value: "247", change: "+12%", changeType: "increase", icon: AlertCircle, color: "from-red-500 to-pink-500" },
    { title: "Issues Resolved", value: "189", change: "+8%", changeType: "increase", icon: CheckCircle, color: "from-green-500 to-emerald-500" },
    { title: "Pending Issues", value: "58", change: "-5%", changeType: "decrease", icon: Clock, color: "from-yellow-500 to-orange-500" }
  ];

  const issues = [
    { id: "ISSUE-001", title: "Large pothole on Main Street", category: "pothole", status: "resolved", location: "Main Street, Downtown", reportedDate: "2024-07-15", resolvedDate: "2024-07-18", priority: "high" },
    { id: "ISSUE-002", title: "Broken streetlight near park", category: "streetlight", status: "in-progress", location: "Central Park, West Side", reportedDate: "2024-07-16", resolvedDate: null, priority: "medium" },
    { id: "ISSUE-003", title: "Garbage accumulation in alley", category: "garbage", status: "pending", location: "Back Alley, Market Area", reportedDate: "2024-07-17", resolvedDate: null, priority: "low" },
    { id: "ISSUE-004", title: "Water leak from fire hydrant", category: "water", status: "resolved", location: "Fire Station Road", reportedDate: "2024-07-14", resolvedDate: "2024-07-15", priority: "high" },
    { id: "ISSUE-005", title: "Damaged traffic signal", category: "traffic", status: "in-progress", location: "Main Intersection", reportedDate: "2024-07-18", resolvedDate: null, priority: "high" }
  ];

  const categories = [
    { value: "all", label: "All Categories", icon: "🗂️" },
    { value: "pothole", label: "Potholes", icon: "🕳️" },
    { value: "garbage", label: "Garbage", icon: "🗑️" },
    { value: "streetlight", label: "Streetlights", icon: "💡" },
    { value: "water", label: "Water Issues", icon: "💧" },
    { value: "traffic", label: "Traffic Signals", icon: "🚦" }
  ];

  const statuses = [
    { value: "all", label: "All Statuses" },
    { value: "pending", label: "Pending", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" },
    { value: "in-progress", label: "In Progress", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
    { value: "resolved", label: "Resolved", color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" }
  ];

  // --- Helper Functions ---
  const getStatusBadge = (status) => {
    const statusConfig = statuses.find(s => s.value === status);
    if (!statusConfig) return null;
    return <Badge className={`${statusConfig.color} border-none`}>{statusConfig.label}</Badge>;
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      high: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
      medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
      low: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
    };
    return <Badge className={`${priorityConfig[priority]} border-none`}>{priority.charAt(0).toUpperCase() + priority.slice(1)}</Badge>;
  };

  const getCategoryIcon = (category) => {
    const categoryConfig = categories.find(c => c.value === category);
    return categoryConfig?.icon || "📋";
  };

  // --- Filtering Logic ---
  const filteredIssues = issues.filter(issue => {
    const categoryMatch = selectedCategory === "all" || issue.category === selectedCategory;
    const statusMatch = selectedStatus === "all" || issue.status === selectedStatus;
    return categoryMatch && statusMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-4 shadow-lg">
            <BarChart3 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-3">
            City Dashboard
          </h1>
          <p className="text-md sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Monitor civic issues, track progress, and see the impact of community reporting in your city.
          </p>
        </div>

        {/* Stats Cards */}
        {/* Responsive Grid: Stacks on mobile, 2 cols on tablet, 3 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-black dark:text-white mb-2">{stat.value}</p>
                    <div className={`flex items-center text-sm ${stat.changeType === "increase" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                      <TrendingUp className={`h-4 w-4 mr-1 ${stat.changeType === "decrease" ? "transform rotate-180" : ""}`} />
                      {stat.change} from last month
                    </div>
                  </div>
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-md`}>
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Issues Section */}
        <Card className="border-0 rounded-xl shadow-lg bg-white dark:bg-gray-800">
          <CardHeader className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
            {/* Responsive Layout: Stacks filters below title on mobile */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <CardTitle className="flex items-center space-x-2 text-black dark:text-white text-xl">
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                  <span>Recent Issues</span>
                </CardTitle>
                <CardDescription className="text-gray-500 dark:text-gray-400 mt-1">
                  Track the status and progress of reported civic issues.
                </CardDescription>
              </div>
              
              {/* Filters: Stack on mobile, row on larger screens */}
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full sm:w-48 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-black dark:text-white">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value} className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <div className="flex items-center space-x-2">
                          <span>{category.icon}</span>
                          <span>{category.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-full sm:w-48 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-black dark:text-white">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                    {statuses.map((status) => (
                      <SelectItem key={status.value} value={status.value} className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <span>{status.label}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-4">
              {filteredIssues.length > 0 ? (
                filteredIssues.map((issue) => (
                  <Card key={issue.id} className="border border-gray-200 dark:border-gray-700 hover:border-yellow-500/50 transition-colors duration-200 bg-white dark:bg-gray-900/50 rounded-lg">
                    <CardContent className="p-4">
                      {/* Responsive Issue Card: Stacks vertically on mobile */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex-1 min-w-0"> {/* min-w-0 prevents text overflow */}
                          <div className="flex items-start space-x-4">
                            <div className="text-2xl mt-1 hidden sm:block">{getCategoryIcon(issue.category)}</div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-black dark:text-white text-md sm:text-lg mb-2 truncate">{issue.title}</h3>
                              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-3">
                                {getStatusBadge(issue.status)}
                                {getPriorityBadge(issue.priority)}
                              </div>
                              {/* Responsive Meta Info: Stacks on mobile for readability */}
                              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 space-y-1 sm:space-y-0">
                                <div className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-1.5" />
                                  <span className="truncate">{issue.location}</span>
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1.5" />
                                  <span>Reported: {new Date(issue.reportedDate).toLocaleDateString()}</span>
                                </div>
                                {issue.resolvedDate && (
                                  <div className="flex items-center text-green-600 dark:text-green-500">
                                    <CheckCircle className="h-4 w-4 mr-1.5" />
                                    <span>Resolved: {new Date(issue.resolvedDate).toLocaleDateString()}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex-shrink-0 self-start sm:self-center">
                          <Button variant="outline" size="sm" className="text-yellow-600 border-yellow-500 hover:bg-yellow-500 hover:text-white dark:text-yellow-400 dark:border-yellow-400 dark:hover:bg-yellow-400 dark:hover:text-black rounded-md">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <AlertCircle className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">No issues found</p>
                  <p className="text-sm">Try adjusting your filters or report a new issue.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Quick Actions */}
        <div className="mt-10 text-center">
          <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-lg" asChild>
            <Link href="/report" className="flex items-center justify-center">
              <Camera className="mr-2 h-5 w-5" />
              Report New Issue
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
