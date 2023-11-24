import {
  View,
  Text,
  Animated,
  PanResponder,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import TinderCard from '../components/TinderCard';

const TinderSwipeDemo = () => {
  const DemoData = [
    {
      image: require('../images/image5.jpg'),
      id: 1,
      title: 'Hulk',
      age: 35,
      location: 'New York',
    },
    {
      image: require('../images/image4.png'),
      id: 2,
      title: 'Ironman',
      age: 40,
      location: 'California',
    },
    {
      image: require('../images/image3.png'),
      id: 3,
      title: 'Thor',
      age: 1000,
      location: 'Asgard',
    },
    {
      image: require('../images/image2.jpg'),
      id: 4,
      title: 'Superman',
      age: 35,
      location: 'Metropolis',
    },
    {
      image: require('../images/image1.jpg'),
      id: 5,
      title: 'Groot',
      age: 5,
      location: 'Guardians of the Galaxy',
    },
    {
      image: require('../images/image6.jpg'),
      id: 6,
      title: 'Black Panther',
      age: 35,
      location: 'Wakanda',
    },
    {
      image: require('../images/image7.jpg'),
      id: 7,
      title: 'Dr Strange',
      age: 45,
      location: 'New York',
    },
    {
      image: require('../images/image8.jpg'),
      id: 8,
      title: 'Black Widow',
      age: 35,
      location: 'Russia',
    },
  ];

  const [data, setData] = useState(DemoData);
  useEffect(() => {
    if (!data.length) {
      setData(DemoData);
    }
  }, [data]);
  const swipe = useRef(new Animated.ValueXY()).current;
  const rotate = useRef(new Animated.Value(0)).current;

  const panResponser = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, {dx, dy}) => {
      // console.log('dx:' + dx + ' dy:' + dy);
      swipe.setValue({x: dx, y: dy});
    },

    onPanResponderRelease: (_, {dx, dy}) => {
      // console.log('released:' + 'dx:' + dx + ' dy:' + dy);
      let direction = Math.sign(dx);
      let isActionActive = Math.abs(dx) > 200;
      if (isActionActive) {
        Animated.timing(swipe, {
          toValue: {x: 500 * dx, y: dy},
          useNativeDriver: true,
          duration: 500,
        }).start(removeCard);
      } else {
        Animated.spring(swipe, {
          toValue: {x: 0, y: 0},
          useNativeDriver: true,
          friction: 5,
        }).start();
      }
    },
  });
  const removeCard = useCallback(() => {
    setData(prepState => prepState.slice(1));
    swipe.setValue({x: 0, y: 0});
  }, [swipe]);

  const handelSelection = useCallback(
    direction => {
      Animated.timing(swipe, {
        toValue: {x: direction * 500, y: 0},
        useNativeDriver: true,
        duration: 500,
      }).start(removeCard);
    },
    [removeCard],
  );
  return (
    <View style={{flex: 1}}>
      {data
        .map((item, index) => {
          let isFirst = index === 0;
          let dragHanlders = isFirst ? panResponser.panHandlers : {};
          return (
            <TinderCard
              key={item.id}
              item={item}
              rotate={rotate}
              isFirst={isFirst}
              swipe={swipe}
              {...dragHanlders}
            />
          );
        })
        .reverse()}

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
            handelSelection(-1);
          }}>
          <Image
            source={require('../images/cancel.png')}
            style={{width: 34, height: 34}}
          />
        </TouchableOpacity>
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
            handelSelection(1);
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
