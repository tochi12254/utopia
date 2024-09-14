/** @type {import('next').NextConfig} */
const nextConfig = {
    // webpack: (config) => {
    //     config.externals.push({
    //         "utf-8-validator": "commonjs utf-8-validate",
    //         bufferUtil: "commonjs bufferutil"
    //     });

    //     return config;
    // },
    images: {
        domains: [
            "utfs.io"
        ]
    }
};

export default nextConfig;
