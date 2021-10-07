const defaultTheme = require('tailwindcss/defaultTheme')

const toRgba = (hexCode, opacity = 50) => {
  let hex = hexCode.replace('#', '');
  
  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }    
  
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r},${g},${b},${opacity / 100})`;
};

const flattenColorPalette = (obj, sep='-') => Object.assign(
  {}, 
  ...function _flatten(o, p='') { 
    return [].concat(...Object.keys(o)
      .map(k => 
        typeof o[k] === 'object' ?
          _flatten(o[k],k+sep) : 
          ({[p+k]: o[k]})
      )
    );
  }(obj)
);

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
    fontSize: {
      '2xs': '.55rem',
      '1xs': '.65rem',
      'xs': '.75rem',
      'sm': '.875rem',
      'tiny': '.875rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
    },
    keyframes: {
      wiggle: {
        '0%, 100%': {
          transform: 'rotate(-1deg)'
        },
        '50%': {
          transform: 'rotate(1deg)'
        }
      }
    },
    animation: {
      wiggle: 'wiggle 20s ease-in-out infinite'
    },
    zIndex: {
      '0': 0,
      '10': 10,
      '11': 11,
      '12': 12,
      '13': 13,
      '14': 14,
      '15': 15,
      '16': 16,
      '17': 17,
      '20': 20,
      '30': 30,
      '40': 40,
      '50': 50,
      '25': 25,
      '50': 50,
      '75': 75,
      '100': 100,
      'auto': 'auto',
    }
  },
  variants: {
    extend: {
      display: ['group-hover'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    function ({ addUtilities, theme }) {
      const utilities = {
        '.bg-stripes': {
          backgroundImage:
            'linear-gradient(45deg, var(--stripes-color) 12.50%, transparent 12.50%, transparent 50%, var(--stripes-color) 50%, var(--stripes-color) 62.50%, transparent 62.50%, transparent 100%)',
          backgroundSize: '5.66px 5.66px',
        },
      }

      const addColor = (name, color) =>
        (utilities[`.bg-stripes-${name}`] = { '--stripes-color': color })

      const colors = flattenColorPalette(theme('backgroundColor'))
      for (let name in colors) {
        try {
          const [r, g, b, a] = toRgba(colors[name])
          if (a !== undefined) {
            addColor(name, colors[name])
          } else {
            addColor(name, `rgba(${r}, ${g}, ${b}, 0.4)`)
          }
        } catch (_) {
          addColor(name, colors[name])
        }
      }

      addUtilities(utilities)
    },
  ],
}
