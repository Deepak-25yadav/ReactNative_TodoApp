import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Animated,
  PanResponder,
  TouchableOpacity,
  Image,
} from 'react-native';

import TinderCard from '../components/TinderCard';
import DemoData from './DemoData';

// Main component for the Tinder swipe demo
const TinderSwipeDemo = () => {
  // State to manage the data for Tinder cards
  const [data, setData] = useState(DemoData);

  // Reset data if it becomes empty
  useEffect(() => {
    if (!data.length) {
      // If there is no data, reset it to the initial dataset
      setData(DemoData);
    }
  }, [data]);

  // Animated values for tracking swipe gestures
  const swipe = useRef(new Animated.ValueXY()).current;

  // Animated value for rotating the top card during swipe
  const rotate = useRef(new Animated.Value(0)).current;

  // PanResponder for handling swipe gestures
  const panResponder = PanResponder.create({
    // Allow the component to become the responder for the touch start
    onMoveShouldSetPanResponder: () => true,
    // Update the swipe value as the user moves their finger
    onPanResponderMove: (_, {dx, dy}) => {
      // Update swipe values based on gesture movement
      swipe.setValue({x: dx, y: dy});
    },
    // Handle the release of the swipe gesture
    onPanResponderRelease: (_, {dx, dy}) => {
      // Determine the direction of the swipe (left or right)
      const direction = Math.sign(dx);

      // Check if the swipe distance is significant for an action
      const isActionActive = Math.abs(dx) > 200;

      if (isActionActive) {
        // If a significant action, animate the card off the screen
        Animated.timing(swipe, {
          toValue: {x: 500 * dx, y: dy},
          useNativeDriver: true,
          duration: 500,
        }).start(removeCard);
      } else {
        // If no significant action, spring back to the original position
        Animated.spring(swipe, {
          toValue: {x: 0, y: 0},
          useNativeDriver: true,
          friction: 5,
        }).start();
      }
    },
  });

  // Callback to remove the top card after a successful swipe
  const removeCard = useCallback(() => {
    // Update the data by removing the first card
    setData(prevData => prevData.slice(1));
    // Reset swipe values for the next card
    swipe.setValue({x: 0, y: 0});
  }, [swipe]);

  // Callback to handle user selection (left or right)
  const handleSelection = useCallback(
    direction => {
      // Animate the top card off the screen based on the user's selection
      Animated.timing(swipe, {
        toValue: {x: direction * 500, y: 0},
        useNativeDriver: true,
        duration: 500,
      }).start(removeCard);
    },
    [removeCard],
  );

  // Render the Tinder cards and control buttons
  return (
    <View style={{flex: 1}}>
      {/* Render Tinder cards */}
      {data
        .map((item, index) => {
          // Check if it is the first card in the stack
          const isFirst = index === 0;
          // Get PanResponder handlers for the first card
          const dragHandlers = isFirst ? panResponder.panHandlers : {};
          // Render TinderCard component with appropriate props
          return (
            <TinderCard
              key={item.id}
              item={item}
              rotate={rotate}
              isFirst={isFirst}
              swipe={swipe}
              {...dragHandlers}
            />
          );
        })
        .reverse()}

      {/* Control buttons at the bottom */}
      <View
        style={{
          width: '100%',
          position: 'absolute',
          height: 100,
          bottom: 0,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        {/* Button to reject (cancel) */}
        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
            backgroundColor: '#fff',
            elevation: 5,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            // Handle rejection by animating the card to the left
            handleSelection(-1);
          }}>
          <Image
            source={require('../images/cancel.png')}
            style={{width: 34, height: 34}}
          />
        </TouchableOpacity>

        {/* Button to like (heart) */}
        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
            backgroundColor: '#fff',
            elevation: 5,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            // Handle liking by animating the card to the right
            handleSelection(1);
          }}>
          <Image
            source={require('../images/heart.png')}
            style={{width: 40, height: 40, tintColor: '#00FFC8'}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TinderSwipeDemo;
