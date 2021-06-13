module.exports = {
    apps: [
        {
            name: 'sfdy',
            exec_mode: 'cluster',
            instances: 'max', // Or a number of instances
            script: 'yarn --name "sfdy" -- run start',
            args: 'start'
        }
    ]
}