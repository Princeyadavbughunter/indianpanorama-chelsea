// PM2 Ecosystem Config - Production
// Usage: pm2 start ecosystem.config.cjs
module.exports = {
    apps: [
        {
            name: 'indian-panorama-api',
            script: 'server.js',
            cwd: '/var/www/indianpanorama/backend',
            exec_mode: 'fork',
            env_production: {
                NODE_ENV: 'production',
            },
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '500M',
            error_file: '/var/www/indianpanorama/logs/api-error.log',
            out_file: '/var/www/indianpanorama/logs/api-out.log',
            log_date_format: 'YYYY-MM-DD HH:mm:ss',
        },
        {
            name: 'indian-panorama-web',
            script: './node_modules/next/dist/bin/next',
            args: 'start',
            cwd: '/var/www/indianpanorama/frontend',
            exec_mode: 'fork',
            env_production: {
                NODE_ENV: 'production',
                PORT: 3000,
            },
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '500M',
            error_file: '/var/www/indianpanorama/logs/web-error.log',
            out_file: '/var/www/indianpanorama/logs/web-out.log',
            log_date_format: 'YYYY-MM-DD HH:mm:ss',
        }
    ]
};
