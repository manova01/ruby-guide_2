"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Star, MessageSquare, Phone, Clock, Filter } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

// Mock data for service providers
const mockProviders = [
  {
    id: 1,
    name: "AutoFix Masters",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4.8,
    reviews: 124,
    distance: 2.3,
    address: "123 Main St, Anytown, USA",
    services: ["Oil Change", "Brake Repair", "Engine Diagnostics"],
    description:
      "Professional auto repair shop with certified mechanics. We specialize in all types of repairs and maintenance services.",
  },
  {
    id: 2,
    name: "Quick Tire & Lube",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4.5,
    reviews: 89,
    distance: 3.7,
    address: "456 Oak Ave, Anytown, USA",
    services: ["Tire Replacement", "Oil Change", "Wheel Alignment"],
    description: "Fast and reliable tire services and oil changes. No appointment necessary for most services.",
  },
  {
    id: 3,
    name: "Elite Auto Care",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4.9,
    reviews: 210,
    distance: 5.1,
    address: "789 Pine Rd, Anytown, USA",
    services: ["Full Service Maintenance", "Electrical Systems", "AC Repair"],
    description:
      "Luxury vehicle specialists with state-of-the-art diagnostic equipment. Servicing all makes and models.",
  },
  {
    id: 4,
    name: "Budget Brakes & Mufflers",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4.2,
    reviews: 67,
    distance: 4.8,
    address: "321 Elm St, Anytown, USA",
    services: ["Brake Service", "Exhaust Systems", "Suspension Repair"],
    description: "Affordable brake and exhaust services with quality parts and workmanship guaranteed.",
  },
  {
    id: 5,
    name: "Precision Auto Body",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4.7,
    reviews: 153,
    distance: 6.2,
    address: "555 Maple Dr, Anytown, USA",
    services: ["Collision Repair", "Paint Services", "Dent Removal"],
    description: "Expert body work and paint services. We work with all insurance companies and offer free estimates.",
  },
]

// Service categories
const serviceCategories = [
  "Oil Change",
  "Brake Repair",
  "Tire Services",
  "Engine Repair",
  "Transmission",
  "Electrical",
  "AC & Heating",
  "Body Work",
  "Detailing",
]

export default function ProvidersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [maxDistance, setMaxDistance] = useState([10])
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [minRating, setMinRating] = useState("0")

  // Filter providers based on search criteria
  const filteredProviders = mockProviders.filter((provider) => {
    // Filter by search query
    const matchesSearch =
      provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.services.some((service) => service.toLowerCase().includes(searchQuery.toLowerCase()))

    // Filter by distance
    const matchesDistance = provider.distance <= maxDistance[0]

    // Filter by services
    const matchesServices =
      selectedServices.length === 0 || selectedServices.some((service) => provider.services.includes(service))

    // Filter by rating
    const matchesRating = provider.rating >= Number.parseFloat(minRating)

    return matchesSearch && matchesDistance && matchesServices && matchesRating
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Rudzz Logo" width={32} height={32} className="rounded-md" />
            <span className="text-xl font-bold bg-gradient-to-r from-green-500 via-blue-500 to-orange-500 bg-clip-text text-transparent">
              Rudzz
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary">
              Home
            </Link>
            <Link href="/services" className="text-sm font-medium hover:text-primary">
              Services
            </Link>
            <Link href="/providers" className="text-sm font-medium text-primary">
              Find Providers
            </Link>
            <Link href="/blog" className="text-sm font-medium hover:text-primary">
              Blog
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline" size="sm">
                Log In
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Desktop */}
          <div className="hidden md:block w-64 space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="search">Search</Label>
                  <Input
                    id="search"
                    placeholder="Search providers or services"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Distance (miles): {maxDistance[0]}</Label>
                  <Slider defaultValue={[10]} max={50} step={1} value={maxDistance} onValueChange={setMaxDistance} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rating">Minimum Rating</Label>
                  <Select value={minRating} onValueChange={setMinRating}>
                    <SelectTrigger id="rating">
                      <SelectValue placeholder="Any Rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Any Rating</SelectItem>
                      <SelectItem value="3">3+ Stars</SelectItem>
                      <SelectItem value="4">4+ Stars</SelectItem>
                      <SelectItem value="4.5">4.5+ Stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Services</Label>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                    {serviceCategories.map((service) => (
                      <div key={service} className="flex items-center space-x-2">
                        <Checkbox
                          id={`service-${service}`}
                          checked={selectedServices.includes(service)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedServices([...selectedServices, service])
                            } else {
                              setSelectedServices(selectedServices.filter((s) => s !== service))
                            }
                          }}
                        />
                        <Label htmlFor={`service-${service}`} className="text-sm">
                          {service}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters - Mobile */}
          <div className="md:hidden mb-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>Narrow down your search results</SheetDescription>
                </SheetHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="mobile-search">Search</Label>
                    <Input
                      id="mobile-search"
                      placeholder="Search providers or services"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Distance (miles): {maxDistance[0]}</Label>
                    <Slider defaultValue={[10]} max={50} step={1} value={maxDistance} onValueChange={setMaxDistance} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mobile-rating">Minimum Rating</Label>
                    <Select value={minRating} onValueChange={setMinRating}>
                      <SelectTrigger id="mobile-rating">
                        <SelectValue placeholder="Any Rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Any Rating</SelectItem>
                        <SelectItem value="3">3+ Stars</SelectItem>
                        <SelectItem value="4">4+ Stars</SelectItem>
                        <SelectItem value="4.5">4.5+ Stars</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Services</Label>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                      {serviceCategories.map((service) => (
                        <div key={service} className="flex items-center space-x-2">
                          <Checkbox
                            id={`mobile-service-${service}`}
                            checked={selectedServices.includes(service)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedServices([...selectedServices, service])
                              } else {
                                setSelectedServices(selectedServices.filter((s) => s !== service))
                              }
                            }}
                          />
                          <Label htmlFor={`mobile-service-${service}`} className="text-sm">
                            {service}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Results */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Service Providers</h1>
              <div className="text-sm text-muted-foreground">{filteredProviders.length} results</div>
            </div>

            {filteredProviders.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No providers found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search query</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProviders.map((provider) => (
                  <Card key={provider.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/4 p-4 flex items-center justify-center">
                        <Image
                          src={provider.image || "/placeholder.svg"}
                          alt={provider.name}
                          width={100}
                          height={100}
                          className="rounded-full"
                        />
                      </div>
                      <div className="md:w-3/4 p-4">
                        <div className="flex flex-col md:flex-row justify-between mb-2">
                          <h2 className="text-xl font-bold">{provider.name}</h2>
                          <div className="flex items-center gap-1 text-amber-500">
                            <Star className="fill-current h-4 w-4" />
                            <span>{provider.rating}</span>
                            <span className="text-muted-foreground text-sm">({provider.reviews} reviews)</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground mb-2">
                          <MapPin className="h-4 w-4" />
                          <span>
                            {provider.address} • {provider.distance} miles away
                          </span>
                        </div>
                        <div className="mb-4">
                          <p>{provider.description}</p>
                        </div>
                        <div className="mb-4">
                          <div className="text-sm font-medium mb-2">Services:</div>
                          <div className="flex flex-wrap gap-2">
                            {provider.services.map((service) => (
                              <span key={service} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Message
                          </Button>
                          <Button size="sm" variant="outline">
                            <Phone className="h-4 w-4 mr-2" />
                            Call
                          </Button>
                          <Button size="sm" variant="outline">
                            <Clock className="h-4 w-4 mr-2" />
                            Book
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

