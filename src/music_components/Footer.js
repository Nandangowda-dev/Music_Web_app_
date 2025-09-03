// src/components/Footer.js
import React from "react";
import { Facebook, Twitter, Instagram, Youtube, Music } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-slate-900 text-gray-700 dark:text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Music className="text-indigo-500" size={28} />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              MyMusic
            </h2>
          </div>
          <p className="text-sm">
            Bringing music closer to your heart. Learn, practice and share your passion for music anytime, anywhere.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/courses" className="hover:text-indigo-500">Courses</a></li>
            <li><a href="/community" className="hover:text-indigo-500">Community</a></li>
            <li><a href="/events" className="hover:text-indigo-500">Events</a></li>
            <li><a href="/contact" className="hover:text-indigo-500">Contact</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-semibold mb-3">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/blog" className="hover:text-indigo-500">Blog</a></li>
            <li><a href="/faqs" className="hover:text-indigo-500">FAQs</a></li>
            <li><a href="/support" className="hover:text-indigo-500">Support</a></li>
            <li><a href="/privacy" className="hover:text-indigo-500">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Newsletter + Social */}
        <div>
          <h3 className="font-semibold mb-3">Stay Connected</h3>
          <form className="flex items-center mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 text-sm rounded-l-md border border-gray-300 dark:border-gray-700 dark:bg-slate-800 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 text-sm"
            >
              Subscribe
            </button>
          </form>
          <div className="flex gap-4">
            <a href="#"><Facebook size={20} className="hover:text-indigo-500" /></a>
            <a href="#"><Twitter size={20} className="hover:text-indigo-500" /></a>
            <a href="#"><Instagram size={20} className="hover:text-indigo-500" /></a>
            <a href="#"><Youtube size={20} className="hover:text-indigo-500" /></a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="border-t border-gray-300 dark:border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} MyMusic. All rights reserved.
      </div>
    </footer>
  );
}
