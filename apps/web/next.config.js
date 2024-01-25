/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                pathname: '/public/**'
            }
        ]
    }
}
<<<<<<< HEAD
=======

>>>>>>> 0c6821693d08f5f0dd278a3ce29039803cb299c4
module.exports = nextConfig
