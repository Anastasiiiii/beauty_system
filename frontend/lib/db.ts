import 'server-only';

export async function getProducts(): Promise<{
  products: any[];
  newOffset: number | null;
  totalProducts: number;
}> {

  return {
    products: [
      {
        id: 1,
        imageUrl: 'https://m.media-amazon.com/images/I/71TXKuUwFxL.jpg',
        name: 'Cool smartphone',
        status: 'active',
        price: '999.00',
        stock: 150,
        availableAt: new Date()
      }
    ],
    newOffset: null,
    totalProducts: 1
  };
}

export async function deleteProductById() {}
