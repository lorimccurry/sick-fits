/* eslint-disable */
import { KeystoneContext } from '@keystone-next/types';
import { CartItemCreateInput } from '../.keystone/schema-types';
import { Session } from '../types';

async function addToCart(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartItemCreateInput> {
  console.log('ADDING TO CART');
  // query the current user to see if signed in
  const currentSession: Session = context.session;
  // query the current user's cart
  if (!currentSession.itemId) {
    throw new Error('You must be logged in to do this.');
  }
  const allCartItems = await context.lists.CartItem.findMany({
    where: { user: { id: currentSession.itemId }, product: { id: productId } },
    resolveFields: 'id, quantity'
  });
  const [existingCartItem] = allCartItems;
  if (existingCartItem) {
    console.log(
      `There are already ${existingCartItem.quantity}, increment by 1!`
    );
    // see if the item adding is already in the cart
    // if so increment quantity by 1
    return await context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      data: { quantity: existingCartItem.quantity + 1 },
      resolveFields: false
    });
  }

  // if not, then create a new cart item
  return await context.lists.CartItem.createOne({
    data: {
      product: {connect: {id: productId}},
      user: {connect: {id: currentSession.itemId}},
    },
    resolveFields: false
  })

}

export default addToCart;
