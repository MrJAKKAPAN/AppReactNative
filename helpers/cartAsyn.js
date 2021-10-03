import * as SecureStore from "expo-secure-store";
import { remove, find, uniq, filter } from "lodash";

export const getCart = async () => {
  const cartString = await SecureStore.getItemAsync("cart");
  if (cartString) {
    try {
      const cart = cartString
        ? JSON.parse(cartString)
        : { items: [], count: 0 };
      return cart;
    } catch (err) {
      return { items: [], count: 0 };
    }
  } else {
    return { items: [], count: 0 };
  }
};

export const addItem = async (itemIdGroup = []) => {
  let cart = await getCart();
  cart.items = remove(cart.items, (item) => {
    return itemIdGroup.reduce((res, itemId) => {
      const itemIdSlice = itemId.slice(-6)
      const itemSlice = item.slice(-6)
      return res && itemSlice !== itemIdSlice;
    }, true);
  });
  cart.items = uniq(cart.items);
  cart.items.push(...itemIdGroup);
  cart.count = cart.items.length;
  await SecureStore.setItemAsync("cart",  JSON.stringify(cart));

  return cart;
};



export const removeItem = async (itemIdGroup = []) => {
  try {
    let cart = await getCart();
    if (cart.items) {
      cart.items = remove(cart.items, (item) => {
        return itemIdGroup.reduce((res, itemId) => {
            const itemIdSlice = itemId.slice(-6)
            const itemSlice = item.slice(-6)
          return res && itemSlice !== itemIdSlice;
        }, true);
      });
      cart.items = uniq(cart.items);
      cart.count = cart.items.length;
      await SecureStore.setItemAsync("cart", JSON.stringify(cart));
      return cart;
    }
    return { items: [], count: 0 };
  } catch (error) {}
};

 // const cart = getCart();
  // cart.items = remove(cart.items, (item) => {
  //   return item !== itemId;
  // });
  // cart.items = uniq(cart.items);
  // cart.count = cart.items.length;
  // localStorage.setItem("cart", JSON.stringify(cart));
  // return cart;


export const clearCart = () => {
  // SecureStore.deleteItemAsync("cartID")
  SecureStore.deleteItemAsync("cart");
  // .catch(error => console.log('Could not delete cart func  clearCart', error))
};
