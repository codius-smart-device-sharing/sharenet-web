// Export default url config -- ideally would be dependentent on env variables

// Set the exported config based on the current env here
const allConfigs: any = 
{
    LOCAL: 
    {
        apiUrl: 'http://localhost:8000',
        moneydUrl: 'http://localhost:8081'
    },
    DEV:
    {
        apiUrl: 'https://70es1m90b3.execute-api.us-east-2.amazonaws.com/dev',
        //apiUrl: 'https://8k3zb9t689.execute-api.us-east-2.amazonaws.com/dev',
        moneydUrl: 'http://localhost:8081'
    },
    PROD:
    {
        apiUrl: '',
        moneydUrl: ''
    }
};

let config: any = allConfigs['DEV'];

export default config;