import React, { useEffect, useState } from 'react';
import { Card, Icon, Image, Input, List, Label, ListItem} from 'semantic-ui-react'
import '../App.scss';
import { POKE_API } from '../AppConfig';
import axios from 'axios';

const typeColors = {
    fire: 'orange',
    water: 'blue',
    grass: 'green',
    electric: 'yellow',
    psychic: 'pink',
    ice: 'teal',
    dragon: 'purple',
    dark: 'black',
    fairy: 'pink',
    normal: 'grey',
    fighting: 'brown',
    flying: 'blue',
    poison: 'purple',
    ground: 'brown',
    rock: 'grey',
    bug: 'olive',
    ghost: 'purple',
    steel: 'grey',
};

const PokemonCard = ({pokemonID}) => {
    const [data, setData] = useState(null); // store the result here
	const sprites = ['front_default', 'back_default', 'front_shiny', 'back_shiny']
		.filter(key => data?.sprites?.[key]);
	const [spriteIndex, setSpriteIndex] = useState(0);
    console.log(pokemonID)

	const handleClick = () => {
		setSpriteIndex((prev) => (prev + 1) % sprites.length);
	};

	function getData()
	{
		axios.get(`${POKE_API}/pokemon/${pokemonID}`)
		.then( (response) => {setData(response.data); console.log(response.data); } )
		.catch((error) => (console.error(error)));
	}
	useEffect(getData, [pokemonID]);
    
    return (
        <Card>
			<Image src={data?.sprites?.[sprites[spriteIndex]]} onClick={handleClick}></Image>
			<Card.Content>
				<Card.Header>{data?.name}</Card.Header>
				{
					data?.types.map((entry, index) => (
						<Label key={index} color={typeColors[entry?.type?.name]}>{entry?.type?.name}</Label>
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
        </Card>
    );
}

export {PokemonCard};