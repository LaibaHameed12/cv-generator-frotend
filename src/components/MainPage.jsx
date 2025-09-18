'use client';
import React from 'react';
import {
  FileText,
  Download,
  Edit,
  Share2,
  Star,
  Users,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Layout,
  Eye,
  Clock
} from 'lucide-react';
import Navbar from './common/Navbar';
import Footer from './common/Footer';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { isLoggedIn } from '@/redux/slices/auth/authSlice';

const MainPage = () => {

  const router = useRouter();
  const authenticated = useSelector(isLoggedIn);

  const handleStartBuilding = () => {
    if (authenticated) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }


  const features = [
    {
      icon: <Edit className="w-8 h-8" />,
      title: "Easy Editor",
      description: "Intuitive drag-and-drop interface to build your resume in minutes"
    },
    {
      icon: <Layout className="w-8 h-8" />,
      title: "Professional Templates",
      description: "Choose from dozens of ATS-friendly, recruiter-approved templates"
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: "Export Options",
      description: "Download as PDF, Word, or share with a custom link"
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Real-time Preview",
      description: "See changes instantly as you build your perfect resume"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "ATS Optimized",
      description: "All templates are optimized to pass Applicant Tracking Systems"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Quick Setup",
      description: "Get started in under 5 minutes with our guided setup process"
    }
  ];

  const stats = [
    { number: "500K+", label: "Resumes Created" },
    { number: "95%", label: "Success Rate" },
    { number: "50+", label: "Templates" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-gray-900"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <Sparkles className="w-6 h-6 text-yellow-400 mr-2" />
                <span className="text-yellow-400 font-medium">Professional Resume Builder</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Create Your
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent block">
                  Dream Resume
                </span>
                in Minutes
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Build professional, ATS-friendly resumes with our intuitive editor.
                Choose from premium templates and land your dream job faster.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button onClick={handleStartBuilding} className="cursor-pointer bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center">
                  Start Building Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
                <button className="cursor-pointer border border-gray-600 hover:border-gray-500 px-8 py-4 rounded-xl text-lg font-semibold transition-colors">
                  View Templates
                </button>
              </div>
            </div>

            {/* Hero Image/Preview */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl transform rotate-3 hover:rotate-1 transition-transform">
                <div className="bg-white rounded-lg p-6 text-gray-900">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <Users className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">John Developer</h3>
                      <p className="text-gray-600">Senior Software Engineer</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-4/5"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    <div className="mt-4">
                      <div className="h-2 bg-blue-200 rounded w-full mb-2"></div>
                      <div className="h-2 bg-blue-200 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-800/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="transform hover:scale-105 transition-transform">
                <div className="text-3xl lg:text-4xl font-bold text-blue-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Everything You Need to
              <span className="text-blue-400"> Stand Out</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our powerful resume builder comes packed with features to help you create
              professional resumes that get noticed by recruiters.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800 p-8 rounded-2xl hover:bg-gray-700 transition-colors group"
              >
                <div className="text-blue-400 mb-4 group-hover:text-blue-300 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Build Your Professional Resume?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of job seekers who have successfully landed their dream jobs
            with our professional resume builder.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={handleStartBuilding} className="cursor-pointer bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center">
              Create Your Resume Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button className="cursor-pointer border border-gray-600 hover:border-gray-500 px-8 py-4 rounded-xl text-lg font-semibold transition-colors flex items-center justify-center">
              <Star className="w-5 h-5 mr-2" />
              View Success Stories
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainPage;