import React from 'react';
import {Image, View} from 'react-native';

const TinderCard = ({item}) => {
  return (
    <View>
      <Image source={item.image} />
    </View>
  );
};

export default TinderCard;
