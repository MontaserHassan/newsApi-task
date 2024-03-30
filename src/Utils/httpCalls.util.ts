///////////////////////////////// get all sources /////////////////////////////////


const fetchAllSources = async () => {
    const response = await fetch(`${process.env.SOURCES_API_URL}?&apiKey=${process.env.API_KEY}`);
    const data = await response.json();
    return data;
};


///////////////////////////////// fetch subscribed sources /////////////////////////////////


const fetchSubscribedSources = async (subscribedSources: Array<String>) => {
    const data = [];
    for (const source of subscribedSources) {
        const url = `${process.env.SUBSCRIBED_API_URL}?q=${source}&apiKey=${process.env.API_KEY}`
        const response = await fetch(url);
        const sourceData = await response.json();
        data.push(sourceData);
    };
    return data;
};



export default {
    fetchAllSources,
    fetchSubscribedSources,
};