
import React, { useEffect, useRef, useState } from 'react';
import { Card, Icon, Image, Input, List, Label} from 'semantic-ui-react'
import axios from 'axios';
import {CHAT_API} from '../AppConfig';
import { compileString } from 'sass';

// HANDLES INTERACTIONS WITH THE LLM (/backend)
const ChatForm = ({setSearchResults})=>{
	const [query, setQuery] = useState('');
    const chat = ()=>{
		if (!query)
			return;
		axios.get(`${CHAT_API}/chat/hello`, {params: {query}})
		.then( (response) => {setQuery(response.data); console.log(response.data); } )
		.catch((error) => (console.error(error)));
    }


    return (
    <div className='chat'>
        <Input fluid 
			icon={<Icon name='send' inverted circular link />}
			placeholder='Ask me a Pokemon Question...'
			onChange={(msg) => setQuery(msg.target.value)}
			onKeyPress={(e) => e.key === 'Enter' && chat()}
        />
        <Label pointing='above' message="strongest pokemon limit 1"> Strongest Pokemon </Label>
        <Label pointing='above' message="weakest pokemon limit 1"> Weakest Pokemon </Label>
        <Label pointing='above' message="starter pokemon limit 3"> Starter Pokemon </Label>
    </div>
    );
}

export {ChatForm};
