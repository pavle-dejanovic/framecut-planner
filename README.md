# 1D Cutting Optimizer

A modern, responsive web application for calculating optimal cutting plans for metal, aluminum, or any 1D stock bars. Minimize waste and maximize material efficiency with advanced bin-packing algorithms.

![Version](https://img.shields.io/badge/version-0.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![React](https://img.shields.io/badge/React-19.2-blue)

## ✨ Features

- 🎯 **Optimization Algorithms**: Choose between First-Fit Decreasing (FFD) and Best-Fit Decreasing (BFD) algorithms
- 📊 **Visual Bar Representation**: Interactive visualizations showing how each stock bar is cut
- 🔧 **Kerf Support**: Account for saw blade thickness in your calculations
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- 💾 **Export Functionality**: Export cutting plans as JSON for documentation or further processing
- 🎨 **Modern UI**: Beautiful, intuitive interface built with shadcn/ui components
- ⚡ **Fast Performance**: Efficient algorithms handle up to 1000+ pieces quickly
- 📈 **Detailed Metrics**: View bars used, total waste, and waste percentage

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (or npm/yarn)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd framecut-planner
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
pnpm build
```

The production build will be in the `dist/` directory.

### Preview Production Build

```bash
pnpm preview
```

## 📖 Usage Guide

### Basic Workflow

1. **Configure Stock Bars**
   - Enter the length of your stock bars (in mm)
   - Specify how many stock bars you have available

2. **Add Required Pieces**
   - Enter the length and quantity for each piece you need to cut
   - Click "Add" to add pieces to your list
   - You can edit or remove pieces at any time

3. **Set Saw Blade Kerf**
   - Enter the thickness of your saw blade (in mm)
   - This accounts for material lost during cutting

4. **Choose Algorithm**
   - **FFD (First-Fit Decreasing)**: Faster, good for most cases
   - **BFD (Best-Fit Decreasing)**: Slower but typically produces less waste

5. **Calculate**
   - Click "Calculate Optimal Plan" to generate the cutting plan
   - View the visual representation and waste statistics
   - Export the plan as JSON if needed

### Example Input

- **Stock Bar Length**: 6000 mm
- **Number of Stock Bars**: 10
- **Saw Blade Kerf**: 3 mm
- **Required Pieces**:
  - 1200 mm × 5 pieces
  - 800 mm × 3 pieces
  - 600 mm × 10 pieces

## 🔬 Algorithm Explanations

### First-Fit Decreasing (FFD)

**How it works:**
- Sorts all pieces by length in descending order (largest first)
- Places each piece into the first available bar that has enough space

**Best for:**
- Quick calculations with many similar-sized pieces
- Most real-world scenarios where speed is important

**Expected Results:**
- Fast execution time
- Typically uses 1-3% more material than optimal
- Excellent performance for most use cases

### Best-Fit Decreasing (BFD)

**How it works:**
- Sorts all pieces by length in descending order (largest first)
- Places each piece in the bar that results in the smallest remaining waste

**Best for:**
- When minimizing waste is critical
- Expensive materials where every millimeter counts

**Expected Results:**
- Slightly slower execution
- Typically 1-5% less waste than FFD
- Better material utilization for cost-sensitive projects

## 📁 Project Structure

```
framecut-planner/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui base components
│   │   ├── BarVisualization.tsx
│   │   └── RequiredPiecesInput.tsx
│   ├── logic/              # Core business logic
│   │   └── cutOptimizer.ts # Optimization algorithms
│   ├── pages/              # Page components
│   │   └── CutOptimizerPage.tsx
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts
│   ├── lib/                # Utility functions
│   │   └── utils.ts
│   ├── App.tsx
│   └── main.tsx
├── public/                 # Static assets
├── index.html
├── package.json
├── vite.config.ts
└── README.md
```

## 🛠️ Technologies

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Styling
- **shadcn/ui** - UI component library
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library

## 🎯 Key Features Explained

### Kerf Support
The saw blade kerf (cut thickness) is automatically accounted for when calculating cuts. The kerf is added between pieces on the same bar, ensuring accurate material usage calculations.

### Visual Bar Representation
Each bar in the cutting plan is visualized with:
- Color-coded segments showing each cut
- Waste areas highlighted in red
- Dimensions labeled for easy reference
- Percentage calculations for efficiency

### Export Functionality
Export your cutting plan as JSON including:
- Stock bar configuration
- All required pieces
- Complete cutting plan with all bars
- Algorithm used and kerf settings

## 🔧 Development

### Running Tests

The project includes Vitest configuration (currently not set up with tests, but ready for implementation).

### Code Style

The project uses ESLint for code quality. Run linting with:

```bash
pnpm lint
```

### Component Architecture

- **Clean Architecture**: Separation of logic, components, and pages
- **Type Safety**: Full TypeScript coverage
- **Reusable Components**: Modular, composable component structure
- **Pure Functions**: Optimization logic is completely pure and testable

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [shadcn/ui](https://ui.shadcn.com/) components
- Icons by [Lucide](https://lucide.dev/)
- Optimization algorithms based on classic bin-packing solutions

## 📝 Common Use Cases

### Manufacturing
Optimize material usage when cutting metal bars, aluminum extrusions, or steel beams for production runs.

### Construction
Plan cuts for lumber, pipes, or rebar to minimize waste on construction projects.

### Custom Fabrication
Calculate optimal cuts for custom metalwork, minimizing expensive material waste.

## 🔍 Tips for Best Results

1. **Use BFD for expensive materials** - The extra calculation time pays off with reduced waste
2. **Always include kerf** - Even small kerf values (1-3mm) add up over many cuts
3. **Check multiple stock lengths** - If you have flexibility, test different stock bar lengths
4. **Review the visualization** - The bar charts help identify optimization opportunities

## 📧 Support

For questions, issues, or feature requests, please open an issue on the repository.

---

Made with ❤️ for efficient material cutting
