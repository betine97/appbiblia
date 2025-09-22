# Implementation Plan

- [x] 1. Create utility functions for progress calculation and image selection


  - Implement `calculateProgressSegments` function to determine which segments should be active based on progress percentage
  - Create `getModuleImage` function to return correct image path based on module ID
  - Write unit tests for both utility functions
  - _Requirements: 1.3, 1.4, 1.5, 1.6, 5.1, 5.2_

- [x] 2. Create SegmentedProgressRing component


  - Build new component to render 4 progress segments with proper spacing
  - Implement SVG-based segments with 85° active arc and 5° spacing between segments
  - Add props interface for size, colors, progress, and active state
  - _Requirements: 1.1, 1.2, 3.1, 3.2_

- [x] 3. Implement individual progress segment animation


  - Create AnimatedProgressSegment component for single segment rendering
  - Add smooth fill animation for each segment based on progress state
  - Implement proper rotation positioning for each of the 4 segments (0°, 90°, 180°, 270°)
  - _Requirements: 1.3, 1.4, 1.5, 1.6, 2.4_

- [x] 4. Add pulsation animation system

  - Implement continuous pulse animation for active modules only
  - Create smooth scale animation that increases to 1.15x and returns to 1x
  - Ensure pulsation only affects the progress ring, not the inner content
  - Add proper cleanup when component unmounts
  - _Requirements: 2.1, 2.2, 2.3, 3.3_

- [x] 5. Update ModuleCircle component integration


  - Replace existing SVG progress circle with new SegmentedProgressRing component
  - Update component to use new image selection logic
  - Adjust inner circle sizing to maintain proper margin from progress ring
  - Ensure locked state styling works with new progress system
  - _Requirements: 3.1, 3.2, 5.1, 5.2, 5.3, 5.4_

- [x] 6. Adjust module positioning and layout


  - Increase top padding of modules grid from 30 to 60 pixels
  - Verify module spacing and alignment remains consistent
  - Test scroll behavior with new positioning
  - Ensure responsive behavior on different screen sizes
  - _Requirements: 4.1, 4.2, 4.3_

- [x] 7. Add image assets and optimize loading


  - Ensure m2.png image asset is available in assets/images directory
  - Implement proper image loading error handling and fallbacks
  - Optimize image sizes for performance
  - Test image loading on different devices and network conditions
  - _Requirements: 5.1, 5.2, 5.3_

- [x] 8. Write comprehensive tests for new components



  - Create unit tests for SegmentedProgressRing component with different progress values
  - Test animation behavior and cleanup
  - Verify correct image selection for different module IDs
  - Add integration tests for ModuleCircle with new progress system
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 2.1, 2.2, 2.3, 5.1, 5.2_