
import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [isLoading, setIsLoading] = useState(false);
    const [apiData, setApiData] = useState([]);
    const [serverError, setServerError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            //console.log("hello");
            try {
                const resp = await fetch(url);
                const data = await resp.json();

                setApiData([...data]);

                setIsLoading(false);
            } catch (error) {
                setServerError(error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { isLoading, apiData, serverError };
};

export { useFetch };