'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { addProduct } from '@/lib/requestLib';

export function AddProductForm({ salons, token,}: { salons:string[]; token: string;}) {
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [quantity, setQuantity] = useState('');
  const [salon, setSalon] = useState('');
  const [needsRestocking, setNeedsRestocking] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (parseInt(quantity, 10) < 0) {
      alert('Кількість не може бути меншою за 0');
      return;
    }

    const newProduct = {
      name,
      sku,
      quantity: parseInt(quantity, 10),
      salon,
      needsRestocking,
    };

    const success = await addProduct(token, newProduct);

    if (success) {
      setIsFormVisible(false);
      router.refresh();
    } else {
      console.error('Failed to add product');
    }
  }

   // Умова для відображення форми
   if (!isFormVisible) {
    return null; // Якщо форма не має бути видимою, повертаємо null
  } 

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg w-96">           
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Назва</label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="sku" className="block text-sm font-medium text-gray-700">Артикул</label>
        <Input id="sku" value={sku} onChange={(e) => setSku(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Кількість</label>
        <Input
          id="quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
          min="0" 
        />
      </div>
      <div>
        <label htmlFor="salon" className="block text-sm font-medium text-gray-700">Салон</label>
        <select
          id="salon"
          value={salon}
          onChange={(e) => setSalon(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        >
          <option value="" disabled>Оберіть салон</option>
          {salons.map((salonName, index) => (
            <option key={index} value={salonName}>{salonName}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="needsRestocking" className="block text-sm font-medium text-gray-700">
          <input
            type="checkbox"
            checked={needsRestocking}
            onChange={(e) => setNeedsRestocking(e.target.checked)}
          />{' '}
          Потрібно замовити
        </label>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={() => setIsFormVisible(false)}>
          Закрити
        </Button>
        <Button type="submit">Додати</Button>
      </div>
      </div>
      </div>
    </form>
  );
}
