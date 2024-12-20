import { useState, useEffect } from "react";

import { Alert, Box } from "@mui/material";

import Form from "../components/Form";
import Item from "../components/Item";

import { useApp, queryClient } from "../ThemedApp";
import { useQuery, useMutation } from "react-query";

const api = import.meta.env.VITE_API;

export default function Home() {
    const { showForm, setGlobalMsg } = useApp();
    const { isLoading, isError, error, data } = useQuery("posts", async () => {
        const res = await fetch(`${api}/content/posts`);
        return res.json();
    });

 /*   const [ data, setData ] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect( () => {
        const api = import.meta.env.VITE_API;

        fetch(`${api}/content/posts`).then( async res => {
            setData(await res.json());

            if(res.ok) {
                setData(await res.json());
                setLoading(false);
            } else {
                setError(true);
            }
        }).catch( () => {
            setError(true);
        });
    }, []);
*/
    const remove = useMutation(
        async id => {
            await fetch(`${api}/content/posts/${id}`, {
                method: "DELETE",
            });
        },
        {
            onMutate: id => {
                queryClient.cancelMutations("posts");
                queryClient.setQueryData("posts", old => old.filter(item => item.id !== id));
                setGlobalMsg("A post deleted");
            },
        }
    );
    
    const add = (content, name) => {
        const id = data[0].id + 1;
        setData([{ id, content, name }, ...data]);
        setGlobalMsg("An item added");
    };

    if(isError) {
        return (
            <Box>
                <Alert severity="warning">         
                    {error.message}
                </Alert>
            </Box>
        );
    }

    if(isLoading) {
        return(
            <Box sx={{ textAlign: "center"}}>
                Loading...
            </Box>
        );
    }

    return (
        <Box>
            { showForm && <Form add={add} />}

            {data.map(item => {
                return(
                    <Item key={item.id} item={item} remove={remove.mutate} /> 
                );
            })}
        </Box>
    );
}