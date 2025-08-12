"use client"

import { useState } from "react"
import { Camera, Upload, MapPin, AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function ReportPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    photo: null as File | null,
    photoPreview: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const categories = [
    { value: "pothole", label: "Pothole", icon: "🕳️" },
    { value: "garbage", label: "Garbage", icon: "🗑️" },
    { value: "streetlight", label: "Streetlight", icon: "💡" },
    { value: "water", label: "Water Issue", icon: "💧" },
    { value: "road", label: "Road Damage", icon: "🛣️" },
    { value: "traffic", label: "Traffic Signal", icon: "🚦" },
    { value: "other", label: "Other", icon: "📋" }
  ]

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        photo: file,
        photoPreview: URL.createObjectURL(file)
      }))
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        title: "",
        description: "",
        category: "",
        location: "",
        photo: null,
        photoPreview: ""
      })
    }, 3000)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-4">
        <Card className="w-full max-w-md text-center border-0 shadow-lg bg-white dark:bg-gray-800">
          <CardContent className="pt-8 pb-8">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-2">Issue Reported Successfully!</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Thank you for helping improve your city. We'll review your report and take action soon.
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Report ID: #{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Status: Under Review</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-4">
            <Camera className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-3">
            Report a Civic Issue
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-md mx-auto">
            Help us improve your city by reporting issues that need attention. Your contribution makes a difference!
          </p>
        </div>

        {/* Form Card */}
        <Card className="shadow-lg border-0 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl text-black dark:text-white">Issue Details</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Fill in the details below to report the civic issue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium text-black dark:text-white">
                  Issue Title *
                </label>
                <Input
                  id="title"
                  placeholder="Brief description of the issue"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                  className="h-12 text-base bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-black dark:text-white"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium text-black dark:text-white">
                  Category *
                </label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  required
                >
                  <SelectTrigger className="h-12 text-base bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-black dark:text-white">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value} className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">{category.icon}</span>
                          <span>{category.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Photo Upload */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-black dark:text-white">
                  Photo Evidence *
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors duration-200">
                  {formData.photoPreview ? (
                    <div className="space-y-4">
                      <img
                        src={formData.photoPreview}
                        alt="Preview"
                        className="w-full max-w-xs mx-auto rounded-lg shadow-md"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setFormData(prev => ({ ...prev, photo: null, photoPreview: "" }))}
                        className="text-red-600 hover:text-red-700 border-gray-200 dark:border-gray-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        Remove Photo
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="mx-auto h-12 w-12 text-gray-600 dark:text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <span className="font-medium text-black dark:text-white">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                        id="photo-upload"
                        required
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('photo-upload')?.click()}
                        className="bg-blue-500 hover:bg-blue-600 text-white border-blue-500 hover:border-blue-600"
                      >
                        <Camera className="mr-2 h-4 w-4" />
                        Choose Photo
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium text-black dark:text-white">
                  Detailed Description *
                </label>
                <Textarea
                  id="description"
                  placeholder="Provide detailed information about the issue, including when you noticed it and any relevant context..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  required
                  rows={4}
                  className="text-base resize-none bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-black dark:text-white"
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label htmlFor="location" className="text-sm font-medium text-black dark:text-white">
                  Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-600 dark:text-gray-400" />
                  <Input
                    id="location"
                    placeholder="Street address, landmark, or area description"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    required
                    className="h-12 text-base pl-10 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-black dark:text-white"
                  />
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-black dark:text-white">
                  Map Location
                </label>
                <div className="w-full h-48 bg-gray-100 dark:bg-gray-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center">
                  <div className="text-center text-gray-600 dark:text-gray-400">
                    <MapPin className="mx-auto h-8 w-8 mb-2" />
                    <p className="text-sm">Map integration coming soon</p>
                    <p className="text-xs">For now, please use the address field above</p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmit}
                className="w-full h-12 text-lg bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:transform-none disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Submitting Report...
                  </>
                ) : (
                  <>
                    <AlertCircle className="mr-2 h-5 w-5" />
                    Submit Report
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Additional Information Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500/10 to-indigo-100 dark:from-blue-500/20 dark:to-indigo-900/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <AlertCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-black dark:text-white mb-2">Quick Response</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Your report will be reviewed within 24 hours</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500/10 to-emerald-100 dark:from-green-500/20 dark:to-emerald-900/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-black dark:text-white mb-2">Track Progress</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Get updates on your report status via email</p>
            </CardContent>
          </Card>
        </div>

        {/* Tips */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Make sure to provide clear photos and detailed descriptions for faster resolution</span>
          </div>
        </div>
      </div>
    </div>
  )
}