const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors')

module.exports = {
    purge: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
            },
            fontSize: {
                xxs: ['10.4px', ' 1.063rem'],
                // xxs: ['.65rem', ' 1.063rem'],
            },
            width: {
                '49': '49%',
                '375px': '375px',
                '350px': '350px',
                '410px': '410px',
            },
            screens: {
                'xl': '1281px',
            }            
        },
        colors,
    },

    variants: {
        extend: {
            opacity: ['disabled'],
            pointerEvents: ['hover'],
            boxShadow: ['active'],
            backgroundColor: ['active', 'disabled'],
        },
    },

    // plugins: [require('@tailwindcss/forms')],
};
