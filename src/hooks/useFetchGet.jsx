import { useEffect, useState } from "react";
import axios from "axios";

function useFetchGet(url){

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(()=>{

        const fetch = async()=>{

            try {
                setLoading(true);
                const response = await axios.get(url);

                setData(response.data);
                
            } catch (error) {
                setError(error);
            } finally { 
                setLoading(false);
            }
        }

        fetch()
    },[url]);

    return [data, loading, error];

}
export default useFetchGet;