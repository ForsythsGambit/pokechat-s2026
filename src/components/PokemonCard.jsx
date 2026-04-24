import React, { useEffect, useState } from 'react';
import { Card, Icon, Image, Input, List, Label, ListItem} from 'semantic-ui-react'
import '../App.scss';
import { POKE_API } from '../AppConfig';
import axios from 'axios';


const PokemonCard = ({pokemonID}) => {
    const [data, setData] = useState(null); // store the result here
    console.log(pokemonID)
	function getData()
	{
		axios.get(`${POKE_API}/pokemon/${pokemonID}`)
		.then( (response) => {setData(response.data); console.log(response.data); } )
		.catch((error) => (console.error(error)));
	}
	useEffect(getData, [pokemonID]);
    
    return (
        <Card>
			<Image src={data?.sprites?.front_default}></Image>
			<Card.Content>
				<Card.Header>{data?.name}</Card.Header>
				{
					data?.types.map((entry, index) => (
						<Label key={index}>{entry?.type?.name}</Label>
					))
			}
			<List divided>
				{
					data?.stats.map( (entry, index) => (
						<ListItem key={index}>
							<List.Content>{entry.stat.name}</List.Content>
							<List.Content floated='right'>{entry?.base_stat}</List.Content>
						</ListItem>
					)

					)
				}
			</List>
			</Card.Content>
			{/* <img src={data?.sprites?.front_default} alt={`Sprite of ${data?.name}`}></img>
			
			<h1> {data?.name} </h1>
			<ul>
				{
					data?.types.map((entry, index) => (
						<li key={index}>{entry?.type?.name}</li>
					))
				}
			</ul> */}
        </Card>
    );
}

export {PokemonCard};