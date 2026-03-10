// PM2 Ecosystem Config - Production
// Usage: pm2 start ecosystem.config.cjs
module.exports = {
    apps: [
        {
            name: 'indian-panorama-api',
            script: './backend/server.js',
            cwd: '/home/ubuntu/indianpanorama',
            env_production: {
                NODE_ENV: 'production',
            },
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '500M',
            error_file: './logs/api-error.log',
            out_file: './logs/api-out.log',
            log_date_format: 'YYYY-MM-DD HH:mm:ss',
        },
        {
            name: 'indian-panorama-web',
            script: 'npm',
            args: 'start',
            cwd: '/home/ubuntu/indianpanorama/frontend',
            env_production: {
                NODE_ENV: 'production',
                PORT: 3000,
            },
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '500M',
            error_file: './logs/web-error.log',
            out_file: './logs/web-out.log',
            log_date_format: 'YYYY-MM-DD HH:mm:ss',
        }
    ]
};
