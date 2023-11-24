import {View, Text} from 'react-native';
import React, {useState} from 'react';
import TinderCard from '../components/TinderCard';

const TinderSwipeDemo = () => {
  const initialData = [
    {
      id: 1,
      image: require('../images/image1.jpg'),
      title: 'Person 1',
      age: '25',
      location: 'Mumbai',
    },
    {
      id: 2,
      image: require('../images/image2.jpg'),
      title: 'Person 2',
      age: '30',
      location: 'New York',
    },
    {
      id: 3,
      image: require('../images/image3.jpg'),
      title: 'Person 3',
      age: '28',
      location: 'London',
    },
    {
      id: 4,
      image: require('../images/image4.jpg'),
      title: 'Person 4',
      age: '22',
      location: 'Tokyo',
    },
    {
      id: 5,
      image: require('../images/image5.jpg'),
      title: 'Person 5',
      age: '27',
      location: 'Sydney',
    },
    {
      id: 6,
      image: require('../images/image6.jpg'),
      title: 'Person 6',
      age: '31',
      location: 'Paris',
    },
  ];
  const [data, setData] = useState(initialData);

  return (
    <View>
      {data.map((item, index) => {
        return <TinderCard item={item} />;
      })}
    </View>
  );
};

export default TinderSwipeDemo;
