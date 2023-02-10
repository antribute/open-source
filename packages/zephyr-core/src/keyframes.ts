export const keyframes = {
  // Dropdown menu
  'scale-in': {
    '0%': { opacity: '0', transform: 'scale(0)' },
    '100%': { opacity: '100', transform: 'scale(1)' },
  },
  'slide-down': {
    '0%': { opacity: '0', transform: 'translateY(-10px)' },
    '100%': { opacity: '100', transform: 'translateY(0)' },
  },
  'slide-up': {
    '0%': { opacity: '0', transform: 'translateY(10px)' },
    '100%': { opacity: '100', transform: 'translateY(0)' },
  },
  // Navigation menu
  'enter-from-right': {
    '0%': { transform: 'translateX(200px)', opacity: '0' },
    '100%': { transform: 'translateX(0)', opacity: '100' },
  },
  'enter-from-left': {
    '0%': { transform: 'translateX(-200px)', opacity: '0' },
    '100%': { transform: 'translateX(0)', opacity: '100' },
  },
  'exit-to-right': {
    '0%': { transform: 'translateX(0)', opacity: '100' },
    '100%': { transform: 'translateX(200px)', opacity: '0' },
  },
  'exit-to-left': {
    '0%': { transform: 'translateX(0)', opacity: '100' },
    '100%': { transform: 'translateX(-200px)', opacity: '0' },
  },
  'scale-in-content': {
    '0%': { transform: 'rotateX(-30deg) scale(0.9)', opacity: '0' },
    '100%': { transform: 'rotateX(0deg) scale(1)', opacity: '100' },
  },
  'scale-out-content': {
    '0%': { transform: 'rotateX(0deg) scale(1)', opacity: '100' },
    '100%': { transform: 'rotateX(-10deg) scale(0.95)', opacity: '0' },
  },
  'fade-in': {
    '0%': { opacity: '0' },
    '100%': { opacity: '100' },
  },
  'fade-out': {
    '0%': { opacity: '100' },
    '100%': { opacity: '0' },
  },
};
