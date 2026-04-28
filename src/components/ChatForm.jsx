
import React, { useEffect, useRef, useState } from 'react';
import { Card, Icon, Image, Input, List, Label, Dimmer, Loader} from 'semantic-ui-react'
import axios from 'axios';
import {CHAT_API} from '../AppConfig';
import { compileString } from 'sass';



// HANDLES INTERACTIONS WITH THE LLM (/backend)
const ChatForm = ({setSearchResults})=>{
	const [query, setQuery] = useState('');
	const [loading, setLoading] = useState(false);
	const inputRef = useRef(null);
    const chat = ()=>{
		if (!query)
			return;
		setLoading(true);
		console.log(`Query: ${query}`)
		axios.get(`${CHAT_API}/chat/query`, {params: {query}})
		.then( (response) => {
			console.log(`Reponse: ${JSON.stringify(response)}`);
			if (!response?.data?.error){
				setSearchResults(response.data.map( (entry) => (entry.id) ) ); 
			} else {
				alert("Encountered an error processing your request!")
			}
			setQuery("");
		} )
		.catch((error) => (console.error(error)))
		.finally(() => (setLoading(false)));
		
    }


    return (
    <div className='chat'>
        <Dimmer active={loading}>
			<Loader> Searching the pokedex... </Loader>
		</Dimmer>
		<Input fluid 
			icon={<Icon name='send' inverted circular link onClick={chat} />}
			placeholder='Ask me a Pokemon Question...'
			value = { query ? query : ""}
			onChange={(msg) => setQuery(msg.target.value)}
			onKeyDown={(e) => e.key === 'Enter' && chat()}
			disabled={loading}
			ref={inputRef}
        />
        <Label pointing='above' message="strongest pokemon" onClick={() => {setQuery("Strongest pokemon");inputRef.current.focus();}}> Strongest Pokemon </Label>
        <Label pointing='above' message="weakest pokemon" onClick={() => {setQuery("weakest pokemon");inputRef.current.focus();}}> Weakest Pokemon </Label>
        <Label pointing='above' message="starter pokemon" onClick={() => {setQuery("starter pokemon");inputRef.current.focus();}}> Starter Pokemon </Label>
    </div>
    );
}

export {ChatForm};
