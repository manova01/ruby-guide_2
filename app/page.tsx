import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, MessageSquare, Settings, Star, PenToolIcon as Tool, Shield } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Rudzz Logo" width={40} height={40} className="rounded-md" />
            <span className="text-2xl font-bold bg-gradient-to-r from-green-500 via-blue-500 to-orange-500 bg-clip-text text-transparent">
              Rudzz
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary">
              Home
            </Link>
            <Link href="/services" className="text-sm font-medium hover:text-primary">
              Services
            </Link>
            <Link href="/providers" className="text-sm font-medium hover:text-primary">
              Find Providers
            </Link>
            <Link href="/blog" className="text-sm font-medium hover:text-primary">
              Blog
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary">
              About
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
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-50 to-blue-50">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Find Trusted Automotive Services Near You
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Connect with qualified automotive service providers in your area. Get quotes, book appointments, and solve
              your car problems with ease.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Find a Service Provider
              </Button>
              <Button size="lg" variant="outline">
                Register as a Provider
              </Button>
            </div>
            <div className="relative mx-auto max-w-4xl rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/placeholder.svg?height=600&width=1200"
                alt="Rudzz Platform"
                width={1200}
                height={600}
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How Rudzz Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-none shadow-md">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <Search className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle>Search</CardTitle>
                  <CardDescription>Find automotive services based on your location and needs</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p>
                    Use our advanced search to filter by service type, ratings, and distance to find the perfect match
                    for your automotive needs.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <MessageSquare className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle>Connect</CardTitle>
                  <CardDescription>Message providers directly through our platform</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p>
                    Communicate with service providers, discuss your needs, get quotes, and schedule appointments all in
                    one place.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-orange-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <Star className="h-8 w-8 text-orange-600" />
                  </div>
                  <CardTitle>Review</CardTitle>
                  <CardDescription>Share your experience with the community</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p>
                    After your service is complete, leave a review to help other users find quality service providers in
                    their area.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Oil Change", icon: <Tool className="h-10 w-10 text-green-600" /> },
                { title: "Brake Repair", icon: <Tool className="h-10 w-10 text-blue-600" /> },
                { title: "Tire Services", icon: <Tool className="h-10 w-10 text-orange-600" /> },
                { title: "Engine Repair", icon: <Tool className="h-10 w-10 text-green-600" /> },
                { title: "Diagnostics", icon: <Settings className="h-10 w-10 text-blue-600" /> },
                { title: "Body Work", icon: <Tool className="h-10 w-10 text-orange-600" /> },
                { title: "Electrical", icon: <Tool className="h-10 w-10 text-green-600" /> },
                { title: "Detailing", icon: <Tool className="h-10 w-10 text-blue-600" /> },
              ].map((service, index) => (
                <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center pb-2">
                    <div className="mx-auto mb-4">{service.icon}</div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </CardHeader>
                  <CardFooter className="pt-0 justify-center">
                    <Button variant="ghost" size="sm">
                      Find Providers
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Join Our Network of Service Providers</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Are you an automotive service provider? Join our platform to connect with customers in your area, grow
                  your business, and manage your services efficiently.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "Increase your visibility to potential customers",
                    "Manage appointments and customer communications",
                    "Build your reputation with verified reviews",
                    "Access analytics to grow your business",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-2 mt-1 bg-green-100 rounded-full p-1">
                        <Shield className="h-4 w-4 text-green-600" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button className="bg-blue-600 hover:bg-blue-700">Register as a Provider</Button>
              </div>
              <div className="relative rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Service Provider"
                  width={800}
                  height={600}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-green-100 via-blue-100 to-orange-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of users who have found reliable automotive services through Rudzz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Sign Up Now
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image src="/logo.svg" alt="Rudzz Logo" width={32} height={32} className="rounded-md" />
                <span className="text-xl font-bold text-white">Rudzz</span>
              </div>
              <p className="text-gray-400 mb-4">Connecting customers with trusted automotive service providers.</p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Oil Change
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Brake Repair
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Tire Services
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Engine Repair
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Diagnostics
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Data Processing
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Rudzz. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

