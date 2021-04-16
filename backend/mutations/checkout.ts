import { products } from '../seed-data/data';
import { CartItem } from '../schemas/CartItem';
import {
  CartItemCreateInput,
  OrderCreateInput,
} from '../.keystone/schema-types';
/* eslint-disable */
import { KeystoneContext } from '@keystone-next/types';
import stripeConfig from '../lib/stripe';


type CheckoutArguments = {
  token: string;
}

const graphql = String.raw;

async function checkout(
  root: any,
  { token }: CheckoutArguments,
  context: KeystoneContext
): Promise<OrderCreateInput> {
  // make sure they're signed in
  const userId = context.session.itemId;
  if(!userId) throw new Error('Sorry, you must me signed in to create an order.');

  // query the current user
  const user = await context.lists.User.findOne({
    where: {id: userId},
    resolveFields: graphql`
      id
      name
      email
      cart {
        id
        quantity
        product {
          name
          price
          description
          id
          photo {
            id
            image {
              id
              publicUrlTransformed
            }
          }
        }
      }
    `
  })
  console.log({user});
  console.dir(user, {depth: null});

  // calc the total price for the order
  const cartItems = user.cart.filter(cartItem => cartItem.product); // filters out the items that don't have an associated product
  const amount = cartItems.reduce(function(tally: number, cartItem: CartItemCreateInput) {
    return tally + cartItem.product.price;
  }, 0);
  console.log({amount});

  // create charge with the stripe lib
  const charge = await stripeConfig.paymentIntents.create({
    amount,
    currency: 'USD',
    confirm: true,
    payment_method: token
  }).catch(err => {
    console.log(err);
    throw new Error(err.message);
  });

  console.log({charge});

  // convert cart items to order items
  const orderItems = cartItems.map(cartItem => {
    const orderItem = {
      name: cartItem.product.name,
      description: cartItem.product.description,
      price: cartItem.product.price,
      quantity: cartItem.quantity,
      photo: {connect: {id: cartItem.product.photo.id}},
    }
    return orderItem;
  })

  // create order and return it
  const order = await context.lists.Order.createOne({
    data: {
      total: charge.amount,
      charge: charge.id,
      items: {create: orderItems},
      user: {connect: {id: userId }}
    }
  });

  // clean up any old cart items and return order
  const cartItemIds = user.cart.map(cartItem  => cartItem.id)
  await context.lists.CartItem.deleteMany({
    ids: cartItemIds
  });
  return order;
}

export default checkout;
