import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Hero Section */}
      <section className="px-6 py-20 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div className="space-y-6">
              <h1 className="text-5xl font-bold sm:text-6xl">
                Take Control of Your Finances
              </h1>
              <p className="text-xl text-slate-300">
                Personal Finance makes it simple to manage your money. Track income and expenses, organize by categories, and watch your finances grow.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/register"
                  className="inline-block rounded-lg bg-emerald-600 px-8 py-3 text-center font-semibold text-white transition hover:bg-emerald-500"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/login"
                  className="inline-block rounded-lg border-2 border-emerald-600 px-8 py-3 text-center font-semibold text-emerald-600 transition hover:bg-emerald-600/10"
                >
                  Sign In
                </Link>
              </div>
            </div>
            <div className="hidden md:flex md:justify-center md:items-center">
              <svg
                className="w-80 h-80"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Piggy Bank */}
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="url(#gradient)"
                  opacity="0.1"
                />
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>

                {/* Piggy Bank Body */}
                <ellipse cx="100" cy="90" rx="45" ry="50" fill="#10b981" />

                {/* Piggy Bank Head */}
                <circle cx="135" cy="75" r="15" fill="#10b981" />

                {/* Snout */}
                <circle cx="148" cy="73" r="6" fill="#10b981" />

                {/* Ear */}
                <ellipse
                  cx="100"
                  cy="35"
                  rx="8"
                  ry="12"
                  fill="#10b981"
                  transform="rotate(-20 100 35)"
                />

                {/* Legs */}
                <rect x="80" y="130" width="8" height="25" fill="#10b981" />
                <rect x="115" y="130" width="8" height="25" fill="#10b981" />

                {/* Coin slot on top */}
                <rect x="95" y="30" width="10" height="3" fill="#059669" />

                {/* Coins falling */}
                <g opacity="0.8">
                  <circle cx="60" cy="50" r="8" fill="#fbbf24" />
                  <circle cx="55" cy="50" r="7" fill="#f59e0b" />
                  <text x="58" y="54" fontSize="6" fill="#92400e" fontWeight="bold">
                    $
                  </text>
                </g>

                <g opacity="0.6">
                  <circle cx="70" cy="80" r="7" fill="#fbbf24" />
                  <circle cx="65" cy="80" r="6" fill="#f59e0b" />
                  <text x="67" y="84" fontSize="5" fill="#92400e" fontWeight="bold">
                    $
                  </text>
                </g>

                {/* Arrow up indicating growth */}
                <g opacity="0.9">
                  <line
                    x1="150"
                    y1="120"
                    x2="150"
                    y2="60"
                    stroke="#06b6d4"
                    strokeWidth="3"
                  />
                  <polygon
                    points="150,50 145,62 155,62"
                    fill="#06b6d4"
                  />
                </g>

                {/* Chart bars */}
                <g opacity="0.7">
                  <rect x="35" y="145" width="8" height="30" fill="#10b981" />
                  <rect x="48" y="135" width="8" height="40" fill="#10b981" />
                  <rect x="61" y="125" width="8" height="50" fill="#10b981" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-slate-700 bg-slate-800/50 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-4xl font-bold mb-16">
            Simple Features, Powerful Results
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-xl bg-slate-700/50 p-6 backdrop-blur-sm ring-1 ring-slate-600">
              <div className="mb-4 inline-flex rounded-lg bg-emerald-500/20 p-3 text-emerald-400">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Transactions</h3>
              <p className="text-slate-300">
                Record all your income and expenses with descriptions, amounts, and categories for complete visibility.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-xl bg-slate-700/50 p-6 backdrop-blur-sm ring-1 ring-slate-600">
              <div className="mb-4 inline-flex rounded-lg bg-cyan-500/20 p-3 text-cyan-400">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Categories</h3>
              <p className="text-slate-300">
                Organize expenses and income with flexible categories that adapt to your financial needs.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-xl bg-slate-700/50 p-6 backdrop-blur-sm ring-1 ring-slate-600">
              <div className="mb-4 inline-flex rounded-lg bg-blue-500/20 p-3 text-blue-400">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">View Reports</h3>
              <p className="text-slate-300">
                Get detailed insights into your spending patterns with totals by person and category.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-slate-700 px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Manage Your Money Better?
          </h2>
          <p className="mb-8 text-xl text-slate-300">
            Join thousands of people taking control of their finances with Personal Finance.
          </p>
          <Link
            to="/register"
            className="inline-block rounded-lg bg-emerald-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-emerald-500"
          >
            Create Your Free Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900 px-6 py-8">
        <div className="mx-auto max-w-6xl text-center text-slate-400">
          <p>&copy; 2026 Personal Finance. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
