import { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Title, InventoryItemTeaser } from '../components';
import { InventoryItem, Items, RootTabScreenProps } from '../navigation/types';
import { colors } from '../theme/colors';

export default function InventoryScreen({
  navigation,
  route,
}: RootTabScreenProps<'Inventory'>) {
  const handleAddButtonPress = () => navigation.navigate('AddItem');

  const [valuables, setValuables] = useState<Items>([
    {
      id: 1,
      name: 'Cartier ring',
      purchasePrice: 5780,
      type: 'JEWELRY',
      description: 'Gift from my grandfather',
      photo: 'https://i.ibb.co/znXC7LQ/marcus-lewis-U63z-XX2f7ho-unsplash.jpg',
    },
    {
      id: 2,
      name: 'Guitar',
      purchasePrice: 850,
      type: 'MUSIC_INSTRUMENT',
      photo: 'https://i.ibb.co/4dfndL2/louis-hansel-M-d-J-Scwa-LE-unsplash.jpg',
    },
    {
      id: 3,
      name: 'Some ring (super rare)',
      purchasePrice: 1200,
      type: 'JEWELRY',
      description: 'Gift from my mother',
      photo: 'https://i.ibb.co/znXC7LQ/marcus-lewis-U63z-XX2f7ho-unsplash.jpg',
    },
    {
      id: 4,
      name: 'Guitar',
      purchasePrice: 850,
      type: 'MUSIC_INSTRUMENT',
      photo: 'https://i.ibb.co/4dfndL2/louis-hansel-M-d-J-Scwa-LE-unsplash.jpg',
    },
    {
      id: 5,
      name: 'Some ring',
      purchasePrice: 1200,
      type: 'JEWELRY',
      description: 'Gift from my mother',
      photo: 'https://i.ibb.co/znXC7LQ/marcus-lewis-U63z-XX2f7ho-unsplash.jpg',
    },
  ]);

  return (
    <View style={styles.container}>
      <Title onButtonPress={handleAddButtonPress}>{route.name}</Title>
      <FlatList
        numColumns={2}
        data={valuables}
        renderItem={(p) => <InventoryItemTeaser {...p} />}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.background,
  },
});
