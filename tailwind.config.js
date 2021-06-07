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
            maxHeight: {
                90: "90%",
            },
            fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
            },
            fontSize: {
                xxs: ['10.4px', ' 1.063rem'],
            },        
        },
        colors,
    },

    variants: {
        extend: {
            opacity: ['disabled'],
            pointerEvents: ['hover', 'disabled'],
            boxShadow: ['active'],
            backgroundColor: ['active', 'disabled', 'even'],

        },
    },
    plugins: [
        require('tailwindcss-ripple')()
    ]
};
