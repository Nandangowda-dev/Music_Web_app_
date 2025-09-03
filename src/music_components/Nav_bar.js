import React, { useState } from "react";
import { useTheme } from "../Context/ThemeContext";
import { Link } from "react-router-dom";

export default function Nav_bar({
  logo = "MyMusic",
  onNavClick = () => {},
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("/");
  const [accordion, setAccordion] = useState(null); // track open accordion
  const { theme, toggleTheme } = useTheme(); // ✅ use context only

  const navItems = [
    {
      label: "Courses",
      href: "/courses",
      submenu: [
        "Hindustani Vocal",
        "Carnatic Vocal",
        "Playback Series",
        "Music For Children",
        "Hobby/Educational",
        "Professional",
        "Instrumental",
        "All Courses",
        "Gift A Course",
      ],
    },
    {
      label: "Academy",
      href: "/academy",
      submenu: [
        "Overview",
        "How it Works?",
        "Tour",
        "OM Book Artists",
        "Board of Advisors",
        "System Requirements",
        "Academic Policies",
        "FAQs",
        "Press & Events",
        "Calendar",
        "Careers",
      ],
    },
    {
      label: "Community",
      href: "/community",
      submenu: [
        "Events",
        "Shared Recordings",
        "Contests",
        "Articles",
        "Discussions",
        "Music Apps",
        "Guru Kripa Awards",
        "SMA Playhouse",
      ],
    },
    {
      label: "Special Programs",
      href: "/programs",
      submenu: ["10 for 10", "School", "Corporate", "Affiliate", "Teacher", "Social"],
    },
  ];

  function handleNavClick(href) {
    setActive(href);
    setOpen(false);
    onNavClick(href);
  }

  return (
    <header className="bg-white dark:bg-slate-900 shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("/");
              }}
              className="flex items-center gap-2"
              aria-label="Home"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold">
                MM
              </div>
              <span className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {logo}
              </span>
            </a>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex md:items-center md:gap-6">
            <ul className="flex items-center gap-4">
              {navItems.map((it) => (
                <li key={it.href} className="relative group">
                  <a
                    href={it.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(it.href);
                    }}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                      active === it.href
                        ? "bg-indigo-50 dark:bg-slate-700 text-indigo-600 dark:text-indigo-400"
                        : "text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700"
                    }`}
                  >
                    {it.label}
                  </a>

                  {/* Dropdown */}
                  {it.submenu && (
                    <div className="absolute hidden group-hover:block top-full left-0 w-56 bg-white dark:bg-slate-800 shadow-lg rounded-md mt-2 py-2 z-50">
                      {it.submenu.map((sub) => (
                        <a
                          key={sub}
                          href="#"
                          onClick={(e) => e.preventDefault()}
                          className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                        >
                          {sub}
                        </a>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* Login / Register */}
            <div>
              <a
                href="/login"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("/login");
                }}
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Login / Register
              </a>
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="ml-3 p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              {theme === "dark" ? "🌙" : "☀️"}
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              {theme === "dark" ? "🌙" : "☀️"}
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 dark:text-slate-200 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <span className="sr-only">Open menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div id="mobile-menu" className={`md:hidden ${open ? "block" : "hidden"} pb-4`}>
          {navItems.map((it, idx) => (
            <div key={it.href} className="border-b border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setAccordion(accordion === idx ? null : idx)}
                className={`w-full flex justify-between items-center px-4 py-2 text-base font-medium rounded-md transition ${
                  active === it.href
                    ? "bg-indigo-50 dark:bg-slate-700 text-indigo-600 dark:text-indigo-400"
                    : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
              >
                {it.label}
                <span>{accordion === idx ? "−" : "+"}</span>
              </button>
              {it.submenu && accordion === idx && (
                <div className="pl-6 pb-2 bg-slate-50 dark:bg-slate-800 rounded-md">
                  {it.submenu.map((sub) => (
                    <a
                      key={sub}
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="block px-2 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md"
                    >
                      {sub}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}

          <Link
            to={'/login'}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("/login");
            }}
            className="block mx-4 mt-4 text-center px-4 py-2 rounded-md bg-indigo-600 text-white font-medium"
          >
            Login / Register
          </Link>
        </div>
      </nav>
    </header>
  );
}
