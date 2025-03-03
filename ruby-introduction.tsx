import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Code, BookOpen, Terminal, Server, Package, FileCode, Rocket } from "lucide-react"

export default function RubyGuide() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
        <Image 
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Asset%201%20%285%29-FHzRQYRt1YhSYBQDj6LMN4S5X7w4pm.png" 
          alt="Ruby Logo" 
          width={150} 
          height={150}
          className="rounded-lg"
        />
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Ruby Programming Guide</h1>
          <p className="text-xl text-muted-foreground">A comprehensive introduction to the elegant Ruby language</p>
        </div>
      </div>

      <Tabs defaultValue="introduction" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 mb-8">
          <TabsTrigger value="introduction">Introduction</TabsTrigger>
          <TabsTrigger value="installation">Installation</TabsTrigger>
          <TabsTrigger value="syntax">Syntax</TabsTrigger>
          <TabsTrigger value="objects">Objects</TabsTrigger>
          <TabsTrigger value="rails">Rails</TabsTrigger>
          <TabsTrigger value="gems">Gems</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="introduction">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Introduction to Ruby
              </CardTitle>
              <CardDescription>
                Learn about Ruby's philosophy and key features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-xl font-semibold">What is Ruby?</h3>
              <p>
                Ruby is a dynamic, open-source programming language with a focus on simplicity and productivity. 
                Created by Yukihiro "Matz" Matsumoto in Japan in the mid-1990s, Ruby was designed with an emphasis 
                on human-readable code and programmer happiness.
              </p>
              
              <h3 className="text-xl font-semibold">Key Features</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Object-Oriented:</strong> Everything in Ruby is an object, giving it a clean and consistent design.</li>
                <li><strong>Flexible:</strong> Ruby allows multiple programming paradigms including procedural, object-oriented, and functional.</li>
                <li><strong>Elegant Syntax:</strong> Ruby's syntax is natural to read and easy to write, minimizing the need for punctuation and boilerplate code.</li>
                <li><strong>Dynamic Typing:</strong> Variables in Ruby don't need explicit type declarations.</li>
                <li><strong>Garbage Collection:</strong> Ruby automatically manages memory allocation.</li>
                <li><strong>Rich Standard Library:</strong> Ruby comes with a comprehensive standard library out of the box.</li>
                <li><strong>Metaprogramming:</strong> Ruby excels at writing code that writes code, enabling powerful DSLs.</li>
              </ul>
              
              <h3 className="text-xl font-semibold">Ruby Philosophy</h3>
              <blockquote className="border-l-4 border-primary pl-4 italic">
                "Ruby is designed to make programmers happy." — Yukihiro Matsumoto
              </blockquote>
              <p>
                This philosophy, often referred to as "the principle of least surprise," means that Ruby 
                tries to behave in a way that minimizes confusion for experienced users.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Learn More About Ruby History
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="installation">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="h-5 w-5" />
                Installing Ruby
              </CardTitle>
              <CardDescription>
                Set up Ruby on your system with these simple steps
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-xl font-semibold">Installation Methods</h3>
              
              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">macOS</h4>
                  <p className="mb-2">macOS comes with Ruby pre-installed, but it's usually an older version. For development, use a version manager:</p>
                  <div className="bg-muted p-3 rounded-md font-mono text-sm overflow-x-auto">
                    # Install Homebrew first if you don't have it<br/>
                    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"<br/><br/>
                    # Install rbenv<br/>
                    brew install rbenv<br/><br/>
                    # Initialize rbenv<br/>
                    rbenv init<br/><br/>
                    # Install Ruby<br/>
                    rbenv install 3.2.2<br/>
                    rbenv global 3.2.2
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Windows</h4>
                  <p className="mb-2">For Windows, RubyInstaller is the easiest option:</p>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Download the installer from <a href="https://rubyinstaller.org/" className="text-primary hover:underline">RubyInstaller.org</a></li>
                    <li>Run the installer and follow the installation wizard</li>
                    <li>Make sure to check "Add Ruby executables to your PATH"</li>
                    <li>Choose to install the MSYS2 toolchain when prompted</li>
                  </ol>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Linux</h4>
                  <p className="mb-2">On Linux, use rbenv or RVM:</p>
                  <div className="bg-muted p-3 rounded-md font-mono text-sm overflow-x-auto">
                    # Install dependencies<br/>
                    sudo apt update<br/>
                    sudo apt install git curl libssl-dev libreadline-dev zlib1g-dev autoconf bison build-essential libyaml-dev libreadline-dev libncurses5-dev libffi-dev libgdbm-dev<br/><br/>
                    # Install rbenv<br/>
                    curl -fsSL https://github.com/rbenv/rbenv-installer/raw/HEAD/bin/rbenv-installer | bash<br/><br/>
                    # Add to path (add these lines to ~/.bashrc)<br/>
                    export PATH="$HOME/.rbenv/bin:$PATH"<br/>
                    eval "$(rbenv init -)"<br/><br/>
                    # Install Ruby<br/>
                    rbenv install 3.2.2<br/>
                    rbenv global 3.2.2
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mt-6">Verifying Installation</h3>
              <p>After installation, verify Ruby is correctly installed:</p>
              <div className="bg-muted p-3 rounded-md font-mono text-sm overflow-x-auto">
                ruby -v<br/>
                # Should output something like: ruby 3.2.2 (2023-03-30 revision e51014f9c0) [x86_64-darwin21]
              </div>
              
              <h3 className="text-xl font-semibold mt-6">Installing Bundler</h3>
              <p>Bundler is a dependency manager for Ruby. Install it with:</p>
              <div className="bg-muted p-3 rounded-md font-mono text-sm overflow-x-auto">
                gem install bundler<br/>
                bundler -v
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="syntax">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Ruby Syntax
              </CardTitle>
              <CardDescription>
                Learn the fundamentals of Ruby's elegant syntax
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold">Basic Syntax</h3>
                <div className="bg-muted p-3 rounded-md font-mono text-sm overflow-x-auto mt-2">
                  # This is a comment<br/><br/>
                  
                  # Variables<br/>
                  name = "Ruby"<br/>
                  age = 27<br/>
                  is_awesome = true<br/><br/>
                  
                  # String interpolation<br/>
                  puts "#{name} is #{age} years old"<br/><br/>
                  
                  # Conditional statements<br/>
                  if is_awesome<br/>
                  &nbsp;&nbsp;puts "Ruby is awesome!"<br/>
                  else<br/>
                  &nbsp;&nbsp;puts "Ruby is still awesome!"<br/>
                  end<br/><br/>
                  
                  # One-line conditionals<br/>
                  puts "Ruby rocks!" if is_awesome
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold">Methods</h3>
                <div className="bg-muted p-3 rounded-md font-mono text-sm overflow-x-auto mt-2">
                  # Defining methods<br/>
                  def greet(name = "World")<br/>
                  &nbsp;&nbsp;return "Hello, #{name}!"<br/>
                  end<br/><br/>
                  
                  # Calling methods<br/>
                  puts greet("Ruby")<br/><br/>
                  
                  # Methods with blocks<br/>
                  def repeat(n)<br/>
                  &nbsp;&nbsp;n.times { yield }<br/>
                  end<br/><br/>
                  
                  repeat(3) { puts "Ruby!" }
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold">Collections</h3>
                <div className="bg-muted p-3 rounded-md font-mono text-sm overflow-x-auto mt-2">
                  # Arrays<br/>
                  languages = ["Ruby", "Python", "JavaScript"]<br/>
                  languages << "Go"  # Append to array<br/>
                  puts languages[0]  # Access element (Ruby)<br/><br/>
                  
                  # Iterating over arrays<br/>
                  languages.each do |lang|<br/>
                  &nbsp;&nbsp;puts "I love #{lang}"<br/>
                  end<br/><br/>
                  
                  # Hashes (dictionaries)<br/>
                  person = {<br/>
                  &nbsp;&nbsp;"name" => "Matz",<br/>
                  &nbsp;&nbsp;"created" => "Ruby",<br/>
                  &nbsp;&nbsp;"year" => 1995<br/>
                  }<br/><br/>
                  
                  # Symbol syntax for hash keys (more common)<br/>
                  person = {<br/>
                  &nbsp;&nbsp;name: "Matz",<br/>
                  &nbsp;&nbsp;created: "Ruby",<br/>
                  &nbsp;&nbsp;year: 1995<br/>
                  }<br/><br/>
                  
                  puts person[:name]  # Access hash value
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold">Blocks, Procs, and Lambdas</h3>
                <div className="bg-muted p-3 rounded-md font-mono text-sm overflow-x-auto mt-2">
                  # Blocks (anonymous functions)<br/>
                  [1, 2, 3].each { |num| puts num * 2 }<br/><br/>
                  
                  # Multi-line blocks<br/>
                  [1, 2, 3].map do |num|<br/>
                  &nbsp;&nbsp;num * 3<br/>
                  end<br/><br/>
                  
                  # Procs<br/>
                  square = Proc.new { |x| x * x }<br/>
                  puts square.call(4)  # 16<br/><br/>
                  
                  # Lambdas<br/>
                  cube = ->(x) { x ** 3 }<br/>
                  puts cube.call(3)  # 27
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold">Classes and Objects</h3>
                <div className="bg-muted p-3 rounded-md font-mono text-sm overflow-x-auto mt-2">
                  # Defining a class<br/>
                  class Person<br/>
                  &nbsp;&nbsp;attr_accessor :name, :age  # Creates getter and setter methods<br/><br/>
                  
                  &nbsp;&nbsp;def initialize(name, age)<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;@name = name  # Instance variable<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;@age = age<br/>
                  &nbsp;&nbsp;end<br/><br/>
                  
                  &nbsp;&nbsp;def greet<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;"Hello, I'm #{@name}!"<br/>
                  &nbsp;&nbsp;end<br/><br/>
                  
                  &nbsp;&nbsp;def self.species  # Class method<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;"Homo sapiens"<br/>
                  &nbsp;&nbsp;end<br/>
                  end<br/><br/>
                  
                  # Creating objects<br/>
                  person = Person.new("Ruby", 27)<br/>
                  puts person.greet<br/>
                  puts Person.species
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="objects">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Object-Oriented Ruby
              </CardTitle>
              <CardDescription>
                Explore Ruby's powerful object-oriented programming features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold">Everything is an Object</h3>
                <p className="mt-2">
                  In Ruby, everything is an object, even primitive types like numbers and booleans. 
                  This means you can call methods on virtually anything:
                </p>
                <div className="bg-muted p-3 rounded-md font-mono text-sm overflow-x-auto mt-2">
                  # Integers are objects<br/>
                  puts 5.class          # Integer<br/>
                  puts 5.even?          # false<br/>
                  puts 5.methods.sort   # Lists all methods available on 5<br/><br/>
                  
                  # Strings are objects<br/>
                  puts "hello".class    # String<br/>
                  puts "hello".upcase   # HELLO<br/>
                  puts "hello".reverse  # olleh
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold">Classes and Inheritance</h3>
                <div className="bg-muted p-3 rounded-md font-mono text-sm overflow-x-auto mt-2">
                  # Parent class<br/>
                  class Animal<br/>
                  &nbsp;&nbsp;attr_reader :name<br/><br/>
                  
                  &nbsp;&nbsp;def initialize(name)<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;@name = name<br/>
                  &nbsp;&nbsp;end<br/><br/>
                  
                  &nbsp;&nbsp;def speak<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;"#{@name} makes a noise."<br/>
                  &nbsp;&nbsp;end<br/>
                  end<br/><br/>
                  
                  # Child class<br/>
                  class Dog < Animal<br/>
                  &nbsp;&nbsp;def speak<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;"#{@name} barks!"<br/>
                  &nbsp;&nbsp;end<br/>
                  end<br/><br/>
                  
                  # Another child class<br/>
                  class Cat < Animal<br/>
                  &nbsp;&nbsp;def speak<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;"#{@name} meows!"<br/>
                  &nbsp;&nbsp;end<br/><br/>
                  
                  &nbsp;&nbsp;def purr<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;"#{@name} purrs softly."<br/>
                  &nbsp;&nbsp;end<br/>
                  end<br/><br/>
                  
                  # Using the classes<br/>
                  animal = Animal.new("Generic animal")<br/>
                  dog = Dog.new("Rex")<br/>
                  cat = Cat.new("Whiskers")<br/><br/>
                  
                  puts animal.speak  # Generic animal makes a noise.<br/>
                  puts dog.speak     # Rex barks!<br/>
                  puts cat.speak     # Whiskers meows!<br/>
                  puts cat.purr      # Whiskers purrs softly.
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold">Modules and Mixins</h3>
                <p className="mt-2">
                  Ruby doesn't support multiple inheritance, but it offers modules as a way to share 
                  functionality across classes:
                </p>
                <div className="bg-muted p-3 rounded-md font-mono text-sm overflow-x-auto mt-2">
                  # Define a module<br/>
                  module Swimmable<br/>
                  &nbsp;&nbsp;def swim<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;"#{self.class} is swimming!"<br/>
                  &nbsp;&nbsp;end<br/>
                  end<br/><br/>
                  
                  module Flyable<br/>
                  &nbsp;&nbsp;def fly<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;"#{self.class} is flying high!"<br/>
                  &nbsp;&nbsp;end<br/>
                  end<br/><br/>
                  
                  # Include modules in classes<br/>
                  class Duck<br/>
                  &nbsp;&nbsp;include Swimmable<br/>
                  &nbsp;&nbsp;include Flyable<br/>
                  end<br/><br/>
                  
                  class Fish<br/>
                  &nbsp;&nbsp;include Swimmable<br/>
                  end<br/><br/>
                  
                  duck = Duck.new<br/>
                  fish = Fish.new<br/><br/>
                  
                  puts duck.swim  # Duck is swimming!<br/>
                  puts duck.fly   # Duck is flying high!<br/>
                  puts fish.swim  # Fish is swimming!
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold">Method Visibility</h3>
                <div className="bg-muted p-3 rounded-md font-mono text-sm overflow-x-auto mt-2">
                  class BankAccount<br/>
                  &nbsp;&nbsp;def initialize(owner, balance = 0)<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;@owner = owner<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;@balance = balance<br/>
                  &nbsp;&nbsp;end<br/><br/>
                  
                  &nbsp;&nbsp;# Public method - can be called from anywhere<br/>
                  &nbsp;&nbsp;def deposit(amount)<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;@balance += amount<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;log_transaction("deposit", amount)<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;"Deposited #{amount}. New balance: #{@balance}"<br/>
                  &nbsp;&nbsp;end<br/><br/>
                  
                  &nbsp;&nbsp;# Public method<br/>
                  &nbsp;&nbsp;def withdraw(amount)<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;if sufficient_funds?(amount)<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;@balance -= amount<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;log_transaction("withdrawal", amount)<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Withdrew #{amount}. New balance: #{@balance}"<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;else<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Insufficient funds!"<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;end<br/>
                  &nbsp;&nbsp;end<br/><br/>
                  
                  &nbsp;&nbsp;private<br/><br/>
                  
                  &nbsp;&nbsp;# Private method - can only be called within the class<br/>
                  &nbsp;&nbsp;def sufficient_funds?(amount)<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;@balance >= amount<br/>
                  &nbsp;&nbsp;end<br/><br/>
                  
                  &nbsp;&nbsp;# Private method<br/>
                  &nbsp;&nbsp;def log_transaction(type, amount)<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;puts "[LOG] #{type.capitalize} of #{amount} by #{@owner}"<br/>
                  &nbsp;&nbsp;end<br/>
                  end<br/><br/>
                  
                  account = BankAccount.new("Alice", 1000)<br/>
                  puts account.deposit(500)<br/>
                  puts account.withdraw(200)<br/>
                  # This would cause an error:<br/>
                  # account.sufficient_funds?(100)  # private method
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="rails">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                Ruby on Rails
              </CardTitle>
              <CardDescription>
                Introduction to the popular web framework built with Ruby
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-xl font-semibold">What is Ruby on Rails?</h3>
              <p>
                Ruby on Rails (or simply "Rails") is a web application framework written in Ruby. 
                It follows the Model-View-Controller (MVC) architectural pattern and emphasizes 
                Convention over Configuration (CoC) and Don't Repeat Yourself (DRY) principles.
              </p>
              
              <h3 className="text-xl font-semibold">Key Features of Rails</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Convention over Configuration:</strong> Rails makes assumptions about what you want to do and how you're going to do it, rather than requiring you to specify every little thing.</li>
                <li><strong>MVC Architecture:</strong> Rails enforces a clean separation between data (Model), presentation (View), and application logic (Controller).</li>
                <li><strong>Active Record:</strong> An ORM (Object-Relational Mapping) system that makes it easy to work with databases.</li>
                <li><strong>RESTful Routes:</strong> Rails encourages RESTful design for web applications.</li>
                <li><strong>Asset Pipeline:</strong> A framework to concatenate, minify, and process CSS, JavaScript, and image files.</li>
                <li><strong>Testing Framework:</strong> Built-in support for various testing methodologies.</li>
              </ul>
              
              <h3 className="text-xl font-semibold">Getting Started with Rails</h3>
              <div className="bg-muted p-3 rounded-md font-mono text-sm overflow-x-auto">
                # Install Rails<br/>
                gem install rails<br/><br/>
                
                # Create a new Rails application<br/>
                rails new myapp<br/><br/>
                
                # Change to the application directory<br/>
                cd myapp<br/><br/>
                
                # Start the Rails server<br/>
                rails server
              </div>
              
              <h3 className="text-xl font-semibold">Rails Directory Structure</h3>
              <div className="bg-muted p-3 rounded-md font-mono text-sm overflow-x-auto">
                myapp/<br/>
                ├── app/            # Application code<br/>
                │   ├── assets/     # CSS, JavaScript, images<br/>
                │   ├── controllers/ # Controller classes<br/>
                │   ├── models/     # Model classes<br/>
                │   └── views/      # View templates<br/>
                ├── config/         # Configuration files<br/>
                ├── db/             # Database files<br/>
                ├── Gemfile         # Gem dependencies<br/>
                ├── lib/            # Library modules<br/>
                ├── public/         # Static files<br/>
                ├── test/           # Test files<br/>
                └── vendor/         # Third-party code
              </div>
              
              <h3 className="text-xl font-semibold">Creating a Simple Rails App</h3>
              <div className="bg-muted p-3 rounded-md font-mono text-sm overflow-x-auto">
                # Generate a scaffold for a resource<br/>
                rails generate scaffold Post title:string content:text<br/><br/>
                
                # Run database migrations<br/>
                rails db:migrate<br/><br/>
                
                # Start the server<br/>
                rails server
              </div>
              <p>
                This creates a complete CRUD interface for a Post model with title and content attributes.
                Visit http://localhost:3000/posts to see it in action.
              </p>
              
              <h3 className="text-xl font-semibold">Popular Rails Gems</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Devise:</strong> Authentication solution</li>
                <li><strong>CanCanCan:</strong> Authorization library</li>
                <li><strong>Sidekiq:</strong> Background job processing</li>
                <li><strong>Kaminari:</strong> Pagination</li>
                <li><strong>RSpec-Rails:</strong> Testing framework</li>
                <li><strong>Pundit:</strong> Authorization</li>
                <li><strong>Paperclip/ActiveStorage:</strong> File attachments</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="gems">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Ruby Gems
              </CardTitle>
              <CardDescription>
                Understanding Ruby's package management system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-xl font-semibold">What are Ruby Gems?</h3>
              <p>
                RubyGems is Ruby's package manager. A gem is a packaged Ruby application or library that 
                can be installed and used in your Ruby projects. Gems can include code, documentation, 
                and gemspec (metadata).
              </p>
              
              <h3 className="text-xl font-semibold">Using Gems</h3>
              <div className="bg-muted p-3 rounded-md font-mono text-sm overflow-x-auto">
                # Installing a gem<br/>
                gem install nokogiri<br/><br/>
                
                # Using a gem in your code<br/>
                require 'nokogiri'<br/><br/>
                
                # List installed gems<br/>
                gem list<br/><br/>
                
                # Update a gem<br/>
                gem update nokogiri<br/><br/>
                
                # Uninstall a gem<br/>
                gem uninstall nokogiri
              </div>
              
              <h3 className="text-xl font-semibold">Bundler</h3>
              <p>
                Bundler is a tool that manages gem dependencies for Ruby projects. It ensures that the gems 
                you need are present in development, staging, and production.
              </p>
              <div className="bg-muted p-3 rounded-md font-mono text-sm overflow-x-auto">
                # Create a Gemfile<br/>
                bundle init<br/><br/>
                
                # Example Gemfile<br/>
                source 'https://rubygems.org'<br/><br/>
                
                gem 'rails', '~> 7.0.0'<br/>
                gem 'pg', '~> 1.1'<br/>
                gem 'puma', '~> 5.0'<br/><br/>
                
                group :development, :test do<br/>
                &nbsp;&nbsp;gem 'rspec-rails'<br/>
                &nbsp;&nbsp;gem 'pry-byebug'<br/>
                end<br/><br/>
                
                # Install gems specified in Gemfile<br/>
                bundle install<br/><br/>
                
                # Run a Ruby script with bundler<br/>
                bundle exec ruby my_script.rb<br/><br/>
                
                # Update all gems<br/>
                bundle update
              </div>
              
              <h3 className="text-xl font-semibold">Popular Ruby Gems</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium">General Purpose</h4>
                  <ul className="list-disc pl-6 space-y-1 mt-2">
                    <li><strong>nokogiri:</strong> HTML/XML parsing</li>
                    <li><strong>httparty:</strong> HTTP client</li>
                    <li><strong>dotenv:</strong> Environment variable management</li>
                    <li><strong>faker:</strong> Generate fake data</li>
                    <li><strong>pry:</strong> Enhanced REPL</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium">Web Development</h4>
                  <ul className="list-disc pl-6 space-y-1 mt-2">
                    <li><strong>rails:</strong> Web framework</li>
                    <li><strong>sinatra:</strong> Lightweight web framework</li>
                    <li><strong>devise:</strong> Authentication</li>
                    <li><strong>sidekiq:</strong> Background job processing</li>
                    <li><strong>webpacker:</strong> JavaScript bundling</li>
                  </ul>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold">Creating Your Own Gem</h3>
              <p>
                You can create your own gems to share code between projects or with the Ruby community:
              </p>
              <div className="bg-muted p-3 rounded-md font-mono text-sm overflow-x-auto">
                # Create a new gem skeleton<br/>
                bundle gem my_awesome_gem<br/><br/>
                
                # This creates a directory structure:<br/>
                my_awesome_gem/<br/>
                ├── .gitignore<br/>
                ├── Gemfile<br/>
                ├── LICENSE.txt<br/>
                ├── README.md<br/>
                ├── Rakefile<br/>
                ├── bin/<br/>
                ├── lib/<br/>
                │   ├── my_awesome_gem.rb<br/>
                │   └── my_awesome_gem/<br/>
                │       └── version.rb<br/>
                ├── my_awesome_gem.gemspec<br/>
                └── spec/
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCode className="h-5 w-5" />
                Learning Resources
              </CardTitle>
              <CardDescription>
                The best resources to continue your Ruby journey
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold">Official Documentation</h3>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li><a href="https://www.ruby-lang.org/" className="text-primary hover:underline">Ruby Official Website</a> - The official Ruby language website</li>
                  <li><a href="https://ruby-doc.org/" className="text-primary hover:underline">Ruby Documentation</a> - Comprehensive documentation for Ruby</li>
                  <li><a href="https://rubyonrails.org/" className="text-primary hover:underline">Ruby on Rails</a> - The official Rails website</li>
                  <li><a href="https://guides.rubyonrails.org/" className="text-primary hover:underline">Rails Guides</a> - Comprehensive guides for Rails development</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold">Books</h3>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li><strong>The Well-Grounded Rubyist</strong> by David A. Black - A thorough introduction to Ruby</li>
                  <li><strong>Practical Object-Oriented Design in Ruby</strong> by Sandi Metz - Learn OOP principles with Ruby</li>
                  <li><strong>Eloquent Ruby</strong> by Russ Olsen - Writing idiomatic Ruby code</li>
                  <li><strong>Agile Web Development with Rails</strong> - The definitive guide to Rails</li>
                  <li><strong>Metaprogramming Ruby</strong> by Paolo Perrotta - Advanced Ruby techniques</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold">Online Courses</h3>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li><a href="https://www.codecademy.com/learn/learn-ruby" className="text-primary hover:underline">Codecademy: Learn Ruby</a></li>
                  <li><a href="https://www.theodinproject.com/" className="text-primary hover:underline">The Odin Project</a> - Free full-stack curriculum including Ruby and Rails</li>
                  <li><a href="https://gorails.com/" className="text-primary hover:underline">GoRails</a> - Screencasts for Ruby on Rails developers</li>
                  <li><a href="https://www.railstutorial.org/" className="text-primary hover:underline">Ruby on Rails Tutorial</a> by Michael Hartl</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold">Community Resources</h3>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li><a href="https://www.reddit.com/r/ruby/" className="text-primary hover:underline">Ruby Subreddit</a></li>
                  <li><a href="https://www.reddit.com/r/rails/" className="text-primary hover:underline">Rails Subreddit</a></li>
                  <li><a href="https://rubyweekly.com/" className="text-primary hover:underline">Ruby Weekly</a> - A weekly newsletter about Ruby</li>
                  <li><a href="https://rubytogether.org/" className="text-primary hover:underline">Ruby Together</a> - Supporting Ruby infrastructure</li>
                  <li><a href="https://confreaks.tv/" className="text-primary hover:underline">Confreaks</a> - Videos from Ruby conferences</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold">Practice and Challenges</h3>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li><a href="https://exercism.io/tracks/ruby" className="text-primary hover:underline">Exercism Ruby Track</a> - Coding exercises with mentorship</li>
                  <li><a href="https://www.codewars.com/?language=ruby" className="text-primary hover:underline">Codewars</a> - Improve your skills by solving challenges</li>
                  <li><a href="https://www.hackerrank.com/domains/ruby" className="text-primary hover:underline">HackerRank Ruby</a> - Ruby programming challenges</li>
                </ul>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Rocket className="h-5 w-5" />
                  Next Steps
                </h3>
                <p className="mt-2">
                  Ready to take your Ruby skills to the next level? Here are some suggested paths:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Build a small web application with Ruby on Rails</li>
                  <li>Contribute to an open-source Ruby project</li>
                  <li>Create and publish your own Ruby gem</li>
                  <li>Explore Ruby's metaprogramming capabilities</li>
                  <li>Learn about Ruby's concurrency models</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

