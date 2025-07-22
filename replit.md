# Maritime CO2 Emissions Calculator

## Overview

This is a client-side web application for calculating CO2 emissions from maritime shipping routes. The application provides an interactive calculator that allows users to select different baseline routes and analyze emission data across various voyage segments including ballast, laden, and loading/discharging operations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Single-page application** built with vanilla HTML, CSS, and JavaScript
- **Client-side only** - no backend server required
- **Responsive design** using Tailwind CSS framework
- **Dark mode support** with theme toggle functionality
- **jQuery** for DOM manipulation and event handling

### Styling Framework
- **Tailwind CSS** via CDN for utility-first styling
- **Font Awesome** for icons
- **Custom CSS** for maritime-themed colors and animations
- **CSS custom properties** for theme-aware color management

## Key Components

### 1. Route Data Management
- **Baseline data structure** containing predefined shipping routes (Narvik Route, Seven Island Baseline)
- **Route-specific parameters** including speed, consumption, and voyage legs
- **Emission factors** for different fuel types (LFO, MGO, HFO)

### 2. User Interface Components
- **Header with branding** and theme toggle
- **Route selection interface** (referenced but not implemented in current files)
- **Data visualization tables** for emission calculations
- **Responsive layout** that adapts to different screen sizes

### 3. Calculation Engine
- **Client-side calculations** for CO2 emissions
- **Multiple fuel type support** (Light Fuel Oil, Marine Gas Oil, Heavy Fuel Oil)
- **Emission factor application** with different rates per fuel type
- **Well-to-Wake (WTW) calculations** included in baseline data

## Data Flow

1. **Static Data Loading**: Baseline route data is loaded from JavaScript constants
2. **User Route Selection**: User chooses from predefined baseline routes
3. **Real-time Calculations**: Emissions are calculated based on:
   - Distance and speed for each voyage leg
   - Fuel consumption rates by vessel state (ballast/laden/port operations)
   - Fuel-specific emission factors
4. **Results Display**: Calculated emissions are presented in tabular format with breakdown by voyage segment

## External Dependencies

### CDN-hosted Libraries
- **Tailwind CSS**: Utility-first CSS framework for styling
- **jQuery 3.6.0**: DOM manipulation and event handling
- **Font Awesome 6.0.0**: Icon library for UI elements

### No Backend Dependencies
- Application runs entirely in the browser
- No database or server-side processing required
- All calculations performed client-side

## Deployment Strategy

### Static Hosting Ready
- **Files can be served directly** from any web server or CDN
- **No build process required** - files are ready to deploy as-is
- **Suitable for**: GitHub Pages, Netlify, Vercel, or any static hosting service

### Browser Compatibility
- **Modern browsers**: Requires JavaScript ES6+ support
- **Responsive design**: Works on desktop, tablet, and mobile devices
- **Progressive enhancement**: Core functionality available without advanced features

### Performance Considerations
- **Lightweight**: Minimal JavaScript footprint
- **CDN dependencies**: External libraries loaded from reliable CDNs
- **Client-side only**: No server latency for calculations

## Technical Decisions

### Why Client-Side Only?
- **Simplicity**: No server infrastructure needed
- **Cost-effective**: Can be hosted for free on static hosting platforms
- **Fast calculations**: No network latency for emission calculations
- **Offline capable**: Could work offline once loaded (with service worker)

### Why Tailwind CSS?
- **Rapid development**: Utility classes speed up UI development
- **Consistent design**: Built-in design system prevents style inconsistencies
- **Dark mode**: Built-in dark mode support matches application requirements
- **Responsive**: Mobile-first responsive design out of the box

### Data Structure Design
- **Nested objects**: Baseline data organized hierarchically for easy access
- **Predefined routes**: Common shipping routes pre-calculated for accuracy
- **Flexible emission factors**: Separate emission factors allow for easy updates