import { CartItemType } from './../components/User';
export default function calcTotalPrice(cart: [CartItemType]): number {
  return cart.reduce((tally, cartItem) => {
    if (!cartItem.product) return tally; //products can be deleted but they could still be in cart

    return tally + cartItem.quantity * cartItem.product.price;
  }, 0);
}
