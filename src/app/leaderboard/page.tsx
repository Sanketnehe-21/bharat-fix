"use client"

import React, { useState, ReactNode } from "react"
import { Search, Trophy, Award, Users, MapPin } from "lucide-react"

interface DivProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  className?: string;
}

interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
  className?: string;
}

interface SpanProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  className?: string;
}

interface TabsProps {
  children: ReactNode;
  value: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

interface TabsListProps {
  children: ReactNode;
  className?: string;
  activeTab?: string;
  setActiveTab?: (value: string) => void;
}

interface TabsTriggerProps {
  children: ReactNode;
  value: string;
  className?: string;
  activeTab?: string;
  setActiveTab?: (value: string) => void;
}

interface TabsContentProps {
  children: ReactNode;
  value: string;
}

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} />;
const Card = ({ children, className, ...props }: DivProps) => <div className={className} {...props}>{children}</div>;
const CardHeader = ({ children, className, ...props }: DivProps) => <div className={className} {...props}>{children}</div>;
const CardTitle = ({ children, className, ...props }: HeadingProps) => <h2 className={className} {...props}>{children}</h2>;
const CardContent = ({ children, className, ...props }: DivProps) => <div className={className} {...props}>{children}</div>;
const CardDescription = ({ children, className, ...props }: ParagraphProps) => <p className={className} {...props}>{children}</p>;
const Badge = ({ children, className, ...props }: SpanProps) => <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`} {...props}>{children}</span>;

const Tabs = ({ children, value, onValueChange, ...props }: TabsProps) => (
  <div {...props}>
    {React.Children.map(children, child => {
      if (!React.isValidElement(child)) return null;

      if (child.type === TabsList) {
        return React.cloneElement(child as React.ReactElement<TabsListProps>, { activeTab: value, setActiveTab: onValueChange });
      }
      if (child.type === TabsContent && child.props.value === value) {
        return child;
      }
      return null;
    })}
  </div>
);

const TabsList = ({ children, className, activeTab, setActiveTab }: TabsListProps) => (
  <div className={className}>
    {React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child as React.ReactElement<TabsTriggerProps>, { activeTab, setActiveTab });
      }
      return null;
    })}
  </div>
);

const TabsTrigger = ({ children, value, className, activeTab, setActiveTab }: TabsTriggerProps) => (
  <button
    onClick={() => setActiveTab?.(value)}
    data-state={activeTab === value ? 'active' : 'inactive'}
    className={className}
  >
    {children}
  </button>
);

const TabsContent = ({ children }: TabsContentProps) => <div>{children}</div>;

export default function LeaderboardPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("cities")

  const citiesData = [
    { rank: 1, name: "Mumbai", points: 15420, issues: 89, population: "20.4M", state: "Maharashtra" },
    { rank: 2, name: "Delhi", points: 12850, issues: 76, population: "18.9M", state: "Delhi" },
    { rank: 3, name: "Bangalore", points: 11230, issues: 65, population: "12.3M", state: "Karnataka" },
    { rank: 4, name: "Chennai", points: 9870, issues: 58, population: "10.9M", state: "Tamil Nadu" },
    { rank: 5, name: "Hyderabad", points: 8450, issues: 52, population: "9.7M", state: "Telangana" },
    { rank: 6, name: "Ahmedabad", points: 7230, issues: 45, population: "7.2M", state: "Gujarat" },
    { rank: 7, name: "Kolkata", points: 6890, issues: 42, population: "14.8M", state: "West Bengal" },
    { rank: 8, name: "Pune", points: 6120, issues: 38, population: "6.6M", state: "Maharashtra" },
    { rank: 9, name: "Jaipur", points: 5450, issues: 35, population: "3.1M", state: "Rajasthan" },
    { rank: 10, name: "Surat", points: 4890, issues: 32, population: "6.1M", state: "Gujarat" },
  ]

  const neighborhoodsData = [
    { rank: 1, name: "Bandra West", city: "Mumbai", points: 3240, issues: 18, area: "2.1 km²" },
    { rank: 2, name: "Connaught Place", city: "Delhi", points: 2890, issues: 16, area: "1.8 km²" },
    { rank: 3, name: "Indiranagar", city: "Bangalore", points: 2670, issues: 14, area: "2.3 km²" },
    { rank: 4, name: "T Nagar", city: "Chennai", points: 2340, issues: 12, area: "1.9 km²" },
    { rank: 5, name: "Banjara Hills", city: "Hyderabad", points: 2120, issues: 11, area: "2.7 km²" },
  ]

  const mlasData = [
    { rank: 1, name: "Rajesh Kumar", constituency: "Mumbai Central", party: "BJP", points: 5670, issues: 34 },
    { rank: 2, name: "Priya Sharma", constituency: "Delhi Cantonment", party: "AAP", points: 4890, issues: 28 },
    { rank: 3, name: "Amit Patel", constituency: "Bangalore Central", party: "INC", points: 4230, issues: 25 },
    { rank: 4, name: "Suresh Reddy", constituency: "Chennai Central", party: "DMK", points: 3780, issues: 22 },
    { rank: 5, name: "Kiran Rao", constituency: "Hyderabad Central", party: "TRS", points: 3340, issues: 19 },
  ]

  const getRankIcon = (rank: number) => {
    if (rank === 1) return "🥇"
    if (rank === 2) return "🥈"
    if (rank === 3) return "🥉"
    return `#${rank}`
  }

  const getRankStyle = (rank: number) => {
    if (rank === 1) return "bg-gradient-to-r from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30 border-yellow-300 dark:border-yellow-700"
    if (rank === 2) return "bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-900/30 dark:to-gray-800/30 border-gray-300 dark:border-gray-700"
    if (rank === 3) return "bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 border-orange-300 dark:border-orange-700"
    return "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
  }

  const filterData = (data: any[], query: string) => {
    if (!query) return data
    return data.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      (item.city && item.city.toLowerCase().includes(query.toLowerCase())) ||
      (item.constituency && item.constituency.toLowerCase().includes(query.toLowerCase()))
    )
  }

  const renderCitiesTable = () => (
    <div className="space-y-4">
      {filterData(citiesData, searchQuery).map((city) => (
        <Card
          key={city.rank}
          className={`transition-all duration-300 hover:shadow-xl cursor-pointer border hover:border-blue-400 dark:hover:border-blue-600 rounded-xl ${getRankStyle(city.rank)}`}
        >
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-4 flex-1 min-w-0">
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-lg sm:text-xl font-bold shadow-md ${city.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-yellow-500 text-white' : city.rank === 2 ? 'bg-gradient-to-br from-gray-400 to-gray-500 text-white' : city.rank === 3 ? 'bg-gradient-to-br from-orange-400 to-orange-500 text-white' : 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white'}`}>
                    {getRankIcon(city.rank)}
                  </div>
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-black dark:text-white text-lg sm:text-xl truncate">{city.name}</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center mt-1 sm:mt-0">
                      <MapPin className="h-4 w-4 mr-1.5" />
                      <span>{city.state}</span>
                    </div>
                    <div className="flex items-center mt-1 sm:mt-0">
                      <Users className="h-4 w-4 mr-1.5" />
                      <span>{city.population}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-left sm:text-right w-full sm:w-auto mt-2 sm:mt-0 pl-16 sm:pl-0">
                <div className="text-2xl sm:text-3xl font-bold text-black dark:text-white">{city.points.toLocaleString()}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{city.issues} issues resolved</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderNeighborhoodsTable = () => (
    <div className="space-y-4">
      {filterData(neighborhoodsData, searchQuery).map((neighborhood) => (
        <Card
          key={neighborhood.rank}
          className={`transition-all duration-300 hover:shadow-xl cursor-pointer border hover:border-blue-400 dark:hover:border-blue-600 rounded-xl ${getRankStyle(neighborhood.rank)}`}
        >
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-4 flex-1 min-w-0">
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-lg sm:text-xl font-bold shadow-md ${neighborhood.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-yellow-500 text-white' : neighborhood.rank === 2 ? 'bg-gradient-to-br from-gray-400 to-gray-500 text-white' : neighborhood.rank === 3 ? 'bg-gradient-to-br from-orange-400 to-orange-500 text-white' : 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white'}`}>
                    {getRankIcon(neighborhood.rank)}
                  </div>
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-black dark:text-white text-lg sm:text-xl truncate">{neighborhood.name}</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center mt-1 sm:mt-0">
                      <MapPin className="h-4 w-4 mr-1.5" />
                      <span>{neighborhood.city}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-left sm:text-right w-full sm:w-auto mt-2 sm:mt-0 pl-16 sm:pl-0">
                <div className="text-2xl sm:text-3xl font-bold text-black dark:text-white">{neighborhood.points.toLocaleString()}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{neighborhood.issues} issues resolved</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderMLAsTable = () => (
    <div className="space-y-4">
      {filterData(mlasData, searchQuery).map((mla) => (
        <Card
          key={mla.rank}
          className={`transition-all duration-300 hover:shadow-xl cursor-pointer border hover:border-blue-400 dark:hover:border-blue-600 rounded-xl ${getRankStyle(mla.rank)}`}
        >
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-4 flex-1 min-w-0">
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-lg sm:text-xl font-bold shadow-md ${mla.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-yellow-500 text-white' : mla.rank === 2 ? 'bg-gradient-to-br from-gray-400 to-gray-500 text-white' : mla.rank === 3 ? 'bg-gradient-to-br from-orange-400 to-orange-500 text-white' : 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white'}`}>
                    {getRankIcon(mla.rank)}
                  </div>
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-black dark:text-white text-lg sm:text-xl truncate">{mla.name}</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center mt-1 sm:mt-0">
                      <MapPin className="h-4 w-4 mr-1.5" />
                      <span className="truncate">{mla.constituency}</span>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-none mt-1 sm:mt-0">
                      {mla.party}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="text-left sm:text-right w-full sm:w-auto mt-2 sm:mt-0 pl-16 sm:pl-0">
                <div className="text-2xl sm:text-3xl font-bold text-black dark:text-white">{mla.points.toLocaleString()}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{mla.issues} issues resolved</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-4 shadow-lg">
            <Trophy className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-3">
            Leaderboard
          </h1>
          <p className="text-md sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            See who is making the biggest impact in civic engagement across the nation.
          </p>
        </div>

        <Card className="mb-8 shadow-lg border-0 rounded-xl bg-white dark:bg-gray-800">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="relative w-full lg:w-80">
                <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-11 h-11 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-black dark:text-white rounded-md w-full"
                />
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full lg:w-auto">
                <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-900/50 p-1 rounded-lg">
                  <TabsTrigger value="cities" className="flex items-center justify-center space-x-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-black dark:data-[state=active]:text-white data-[state=inactive]:text-gray-500 dark:data-[state=inactive]:text-gray-400 rounded-md px-3 py-1.5 text-sm font-medium transition-all">
                    <MapPin className="h-4 w-4" />
                    <span>Cities</span>
                  </TabsTrigger>
                  <TabsTrigger value="neighborhoods" className="flex items-center justify-center space-x-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-black dark:data-[state=active]:text-white data-[state=inactive]:text-gray-500 dark:data-[state=inactive]:text-gray-400 rounded-md px-3 py-1.5 text-sm font-medium transition-all">
                    <Users className="h-4 w-4" />
                    <span>Neighborhoods</span>
                  </TabsTrigger>
                  <TabsTrigger value="mlas" className="flex items-center justify-center space-x-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-black dark:data-[state=active]:text-white data-[state=inactive]:text-gray-500 dark:data-[state=inactive]:text-gray-400 rounded-md px-3 py-1.5 text-sm font-medium transition-all">
                    <Award className="h-4 w-4" />
                    <span>MLAs</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab}>
          <TabsContent value="cities">{renderCitiesTable()}</TabsContent>
          <TabsContent value="neighborhoods">{renderNeighborhoodsTable()}</TabsContent>
          <TabsContent value="mlas">{renderMLAsTable()}</TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
