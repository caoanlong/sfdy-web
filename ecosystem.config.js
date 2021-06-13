module.exports = {
    apps: [
        {
            name: 'sfdy',
            exec_mode: 'fork',
            instances: 'max', // Or a number of instances
            script: 'yarn',
            args: 'start'
        }
    ]
}