import {View, Text, Image, Dimensions, Animated} from 'react-native';
import React, {useCallback, useRef} from 'react';
import TinderChoice from './TinderChoice';

// Destructure the height and width from the Dimensions module
const {height, width} = Dimensions.get('window');

// TinderCard component representing an individual card in the Tinder swipe demo
const TinderCard = ({item, isFirst, swipe, ...rest}) => {
  // Interpolate the rotation based on swipe gesture values
  const rotate = swipe.x.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: ['-8deg', '0deg', '8deg'],
  });

  // Interpolate opacity for the "Like" choice based on swipe gesture values
  const likeOpacity = swipe.x.interpolate({
    inputRange: [10, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  // Interpolate opacity for the "Nope" choice based on swipe gesture values
  const nopeOpacity = swipe.x.interpolate({
    inputRange: [-100, -10],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  // Callback function to render the "Like" and "Nope" choices when the card is the first in the stack
  const tinderSelection = useCallback(() => {
    return (
      <>
        {/* Animated view for "Nope" choice */}
        <Animated.View
          style={{
            position: 'absolute',
            top: 60,
            right: 20,
            opacity: nopeOpacity,
            transform: [{rotate: '30deg'}],
          }}>
          <TinderChoice type={'Nope'} />
        </Animated.View>

        {/* Animated view for "Like" choice */}
        <Animated.View
          style={{
            position: 'absolute',
            top: 60,
            left: 20,
            opacity: likeOpacity,
            transform: [{rotate: '-30deg'}],
          }}>
          <TinderChoice type={'Like'} />
        </Animated.View>
      </>
    );
  }, [nopeOpacity, likeOpacity]);

  // Render the TinderCard component
  return (
    <Animated.View
      style={[
        // Style for the main container of the card
        {
          width: width - 20,
          height: height - 150,
          alignSelf: 'center',
          position: 'absolute',
          top: 40,
          borderRadius: 10,
        },
        // Apply additional transformations if it is the first card in the stack
        isFirst && {
          transform: [...swipe.getTranslateTransform(), {rotate: rotate}],
        },
      ]}
      {...rest}>
      {/* Image element displaying the card's image */}
      <Image
        source={item.image}
        style={{width: '100%', height: '100%', borderRadius: 10}}
      />

      {/* Container for text information */}
      <View>
        {/* Text displaying the title and age of the card */}
        <Text
          style={{
            position: 'absolute',
            bottom: 35,
            left: 20,
            color: '#fff',
            fontSize: 40,
            fontWeight: 'bold',
          }}>
          {item.title}{' '}
          <Text style={{color: 'aqua', fontSize: 30, fontWeight: '400'}}>
            {item.age}
          </Text>
        </Text>

        {/* Text displaying the location of the card */}
        <Text
          style={{
            position: 'absolute',
            bottom: 3,
            left: 22,
            color: 'pink',
            fontSize: 30,
          }}>
          {item.location}
        </Text>
      </View>

      {/* Render "Like" and "Nope" choices for the first card in the stack */}
      {isFirst && tinderSelection()}
    </Animated.View>
  );
};

// Export the TinderCard component as the default export of this module
export default TinderCard;
