/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './resources/**/*.blade.php',
        './resources/**/*.jsx',
        './resources/**/*.js',
    ],
    theme: {
        extend: {
            colors: {
                'burgundy': {
                    DEFAULT: '#65000B',
                    dark: '#4a0008',
                    light: '#8b0010',
                },
                'light-beige': '#F8F6F5',
                'soft-gold': '#D4B892',
                'mid-gray': '#6E6E6E',
            },
            fontFamily: {
                sans: ['Poppins', 'sans-serif'], // Ubah dari Inter ke Poppins
                serif: ['Poppins', 'sans-serif'], // Ubah dari Playfair Display ke Poppins
            },
        },
    },
    plugins: [],
}
