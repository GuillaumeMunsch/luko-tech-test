import {
  StyleSheet,
  ListRenderItemInfo,
  Pressable,
  View,
  Text,
  Image,
} from 'react-native';
import { colors } from '../theme/colors';
import { InventoryItem } from '../navigation/types';

export default function InventoryItemTeaser(
  props: ListRenderItemInfo<InventoryItem>
) {
  const { item } = props;
  return (
    <View style={styles.pressableWrapper}>
      <View style={styles.container}>
        {item.photo && (
          <Image style={styles.image} source={{ uri: item.photo }} />
        )}
        <View style={styles.textsContainer}>
          <Text numberOfLines={2} style={styles.text}>
            {item.name}
          </Text>
          <Text style={styles.price}>{`€${item.purchasePrice}`}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pressableWrapper: {
    flex: 0.5,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 50,
  },
  container: {
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: 'white',
    margin: 12,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    height: 158,
    width: '100%',
  },
  textsContainer: {
    height: 80,
    marginVertical: 15,
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  text: {
    color: colors.textBlack,
    fontSize: 19,
    lineHeight: 26,
  },
  price: {
    color: colors.textGrey,
    fontSize: 15,
    lineHeight: 20,
  },
});
