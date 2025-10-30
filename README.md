# CMS Project - Contentstack Integration

A modern React application with full Contentstack CMS integration for dynamic content management.

## Features

- **Complete Contentstack Integration**: All pages fetch content from Contentstack CMS
- **Dynamic Content**: About, Career, Features, Pricing pages with real-time content updates
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS
- **Responsive Design**: Mobile-first approach with beautiful animations
- **Debug Tools**: Built-in testing and debugging utilities for Contentstack integration

## Contentstack Configuration

- **API Key**: `blt755dc6238a6bbc27`
- **Delivery Token**: `cs05eb74f9e80cece6d90fd6e3`
- **Environment**: `cmsproject`
- **Region**: `us`

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Contentstack Setup

1. Import the content types and entries from the `entries/` folder
2. Publish all entries to the `cmsproject` environment
3. Verify the integration using the test page at `/test-contentstack`

## Project Structure

- `src/pages/` - Main application pages with Contentstack integration
- `src/components/` - Reusable UI components
- `src/lib/` - Contentstack service and configuration
- `src/hooks/` - Custom React hooks for data fetching
- `entries/` - Sample Contentstack entries for import

## Technologies Used

- React 18
- TypeScript
- Tailwind CSS
- Contentstack SDK
- React Query
- React Router
