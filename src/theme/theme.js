// mobile/src/theme/theme.js

export const colors = {
  primary: '#0056D2',      // The main brand color for SAMVAD
  secondary: '#F0F4F8',    // For subtle backgrounds
  background: '#FFFFFF',   // Main app background
  surface: '#FAFAFA',      // Cards or elevated elements
  textPrimary: '#1A1A1A',  // Main text color
  textSecondary: '#666666',// Subtitles or disabled text
  success: '#28A745',      // For "Applied" or "Verified" statuses
  error: '#DC3545',        // For errors
  border: '#E0E0E0',       // Input borders
};

export const typography = {
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  body: {
    fontSize: 14,
    color: colors.textPrimary,
  },
  caption: {
    fontSize: 12,
    color: colors.textSecondary,
  },
};

export const spacing = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
};

export const theme = {
  colors,
  typography,
  spacing,
};