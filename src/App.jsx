import List from "./List";
import Item from "./Item";
import { useState } from "react";

export default function App() {
    const [ data, setData] = useState([
        { id: 1, content: "Hello, World!", name: "Alice"},
        { id: 2, content: "React is fun", name: "Bob" }
    ]);

    return (
        <div style={{ maxWidth: 600, margin: "20px auto" }}>
            <h1>
                YayCha
            </h1>
            <List>
                {
                    data.map(item => <Item key={item.id} content={item.content} name={item.name} />)
                }
            </List>
        </div>
    );
}
