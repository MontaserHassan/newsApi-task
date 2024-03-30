interface source {
    id: string,
    name: string,
    description: string,
    url: string,
    category: string,
    language: string,
    country: string
}


interface SourceInterface {
    status: string;
    sources: source[];
}



export default SourceInterface;