import React, { useContext } from 'react';
import { useParams } from 'react-router';

import Card from '../../shared/components/UIElements/Card';
import PlaceItem from './PlaceItem';
import Button from '../../shared/components/FormElements/Button';

import { AuthContext } from '../../shared/context/Auth-context';

import './PlaceList.css';

const PlaceList = (props) => {
	const uid = useParams().uid;
	const auth = useContext(AuthContext);

	console.log('uid', uid);
	console.log('auth', auth.userId);

  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
					{uid === auth.userId && (
						<>
							<h2>No places found. May be create one?</h2>
							<Button to="/places/new">Share place</Button>
						</>
					)}
					<h2>This user have no places yet.</h2>
        </Card>
      </div>
    )
  }

  return (
    <ul className="place-list">
      {props.items.map(place =>
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.imageUrl}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
        />)}
    </ul>
  )
};

export default PlaceList;