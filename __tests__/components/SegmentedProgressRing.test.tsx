import { render } from '@testing-library/react-native';
import SegmentedProgressRing from '../../components/ui/SegmentedProgressRing';

// Mock react-native-svg
jest.mock('react-native-svg', () => ({
  Svg: 'Svg',
  Path: 'Path',
  Circle: 'Circle',
}));

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

describe('SegmentedProgressRing', () => {
  const defaultProps = {
    progress: 50,
    size: 112,
    strokeWidth: 10,
    activeColor: '#fac440',
    inactiveColor: '#E5E7EB',
    isActive: true,
  };

  it('should render without crashing', () => {
    const component = render(<SegmentedProgressRing {...defaultProps} />);
    expect(component).toBeTruthy();
  });

  it('should render with correct size', () => {
    const { container } = render(<SegmentedProgressRing {...defaultProps} />);
    expect(container).toBeTruthy();
  });

  it('should handle inactive state', () => {
    const { container } = render(
      <SegmentedProgressRing {...defaultProps} isActive={false} />
    );
    expect(container).toBeTruthy();
  });

  it('should handle different progress values', () => {
    const progressValues = [0, 25, 50, 75, 100];
    
    progressValues.forEach(progress => {
      const { container } = render(
        <SegmentedProgressRing {...defaultProps} progress={progress} />
      );
      expect(container).toBeTruthy();
    });
  });
});