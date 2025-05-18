export const applyOffers = (cart) => {
  // Find Coca-Cola in cart
  const cocaCola = cart.find((item) => item.name === 'Coca-Cola');
  const freeCoke = {
    id: 'offer-coke',
    name: 'Free Coca-Cola (Offer)',
    price: '£0.00',
    quantity: 0,
    isOffer: true,
  };

  // Find Croissants in cart
  const croissants = cart.find((item) => item.name === 'Croissants');
  const freeCoffee = {
    id: 'offer-coffee',
    name: 'Free Coffee (Offer)',
    price: '£0.00',
    quantity: 0,
    isOffer: true,
  };

  // Calculate free items
  if (cocaCola && cocaCola.quantity >= 6) {
    freeCoke.quantity = Math.floor(cocaCola.quantity / 6);
  }

  if (croissants && croissants.quantity >= 3) {
    freeCoffee.quantity = Math.floor(croissants.quantity / 3);
  }

  // Filter out existing offers and add new ones
  const cartWithoutOffers = cart.filter((item) => !item.isOffer);
  const newCart = [...cartWithoutOffers];

  if (freeCoke.quantity > 0) {
    newCart.push(freeCoke);
  }

  if (freeCoffee.quantity > 0) {
    newCart.push(freeCoffee);
  }

  return newCart;
};

export const calculateTotals = (cart) => {
  const subtotal = cart.reduce((sum, item) => {
    if (item.isOffer) return sum;
    const price = parseFloat(item.price.replace('£', ''));
    return sum + price * item.quantity;
  }, 0);

  const discount = cart.reduce((sum, item) => {
    if (!item.isOffer) return sum;
    const originalPrice = item.name.includes('Coca-Cola')
      ? 0.99
      : item.name.includes('Coffee')
      ? 0.65
      : 0;
    return sum + originalPrice * item.quantity;
  }, 0);

  const total = subtotal - discount;

  return {
    subtotal: subtotal.toFixed(2),
    discount: discount.toFixed(2),
    total: total.toFixed(2),
  };
};