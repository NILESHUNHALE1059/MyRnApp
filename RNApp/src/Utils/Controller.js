

export const getDummyData = async () => {
    try {
        const request = await fetch('https://dummyapi.io/data/v1/user?limit=1', {
            method: 'GET',
            headers: {
                "app-id": "6131b891bbd725008c182755"
            }
        })
        const data = await request.json();
        return data
    }
    catch (error) { return error }
}