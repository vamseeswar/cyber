
import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
 
import Page from '../src/app/page'
 
vi.mock('lucide-react', () => ({
    Video: () => <div data-testid="video-icon" />,
    ShieldAlert: () => <div data-testid="shield-alert-icon" />,
    FlaskConical: () => <div data-testid="flask-conical-icon" />,
    Settings: () => <div data-testid="settings-icon" />,
}));
vi.mock('recharts', async () => {
    const OriginalModule = await vi.importActual('recharts');
    return {
        ...OriginalModule,
        ResponsiveContainer: ({ children }) => <div className="responsive-container">{children}</div>,
        BarChart: ({ children }) => <div className="bar-chart">{children}</div>,
        Bar: () => <div className="bar" />,
        XAxis: () => <div className="x-axis" />,
        YAxis: () => <div className="y-axis" />,
        CartesianGrid: () => <div className="cartesian-grid" />,
        Tooltip: () => <div className="tooltip" />,
        Legend: () => <div className="legend" />,
    };
});

test('Dashboard page renders cards and chart', () => {
  render(<Page />)
 
  // Check for card titles
  expect(screen.getByText('Total Sessions')).toBeDefined()
  expect(screen.getByText('Live Alerts')).toBeDefined()
  expect(screen.getByText('Data Exfiltrated')).toBeDefined()
  expect(screen.getByText('Active Experiments')).toBeDefined()

  // Check for the chart title
  expect(screen.getByText('Data Exfiltration Overview')).toBeDefined()
})
