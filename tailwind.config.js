const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors')

module.exports = {
    purge: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.vue'
    ],

    theme: {
        ripple: theme => ({
            colors: theme('colors'),
            darken: 0.1
        }),
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
                '400px': '400px',
            },
            screens: {
                // 'xl': '1281px',
            },
            maxHeight: {
                '3/4': '75%',
                '5/6': '83.33333%'
            }            
        },
        colors,
    },

    variants: {
        extend: {
            opacity: ['disabled'],
            pointerEvents: ['hover', 'disabled'],
            boxShadow: ['active'],
            backgroundColor: ['active', 'disabled'],
        },
    },
    plugins: [
        require('tailwindcss-ripple')()
    ]

    // plugins: [require('@tailwindcss/forms')],
};
