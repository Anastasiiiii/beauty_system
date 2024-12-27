import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductsTable } from './products-table';
import { getProducts } from '@/lib/requestLib';
import { auth } from '@/lib/auth';

export default async function InventoryPage() {
  const session = await auth();
  const token = session?.user?.token;

  const products = await getProducts(token);
  const count = products.length;

  // Фільтрування даних для вкладок
  const productsToOrder = products.filter(product => product.needsRestocking);
  const availableProducts = products.filter(product => product.quantity > 0);

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">Все</TabsTrigger>
          <TabsTrigger value="active">Потрібно замовити</TabsTrigger>
          <TabsTrigger value="draft">Наявні</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Завантажити
            </span>
          </Button>
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Додати
            </span>
          </Button>
        </div>
      </div>
      {/* Вкладка "Все" */}
      <TabsContent value="all">
        <ProductsTable
          products={products}
          offset={0}
          totalProducts={count}
        />
      </TabsContent>
      {/* Вкладка "Потрібно замовити" */}
      <TabsContent value="active">
        <ProductsTable
          products={productsToOrder}
          offset={0}
          totalProducts={productsToOrder.length}
        />
      </TabsContent>
      {/* Вкладка "Наявні" */}
      <TabsContent value="draft">
        <ProductsTable
          products={availableProducts}
          offset={0}
          totalProducts={availableProducts.length}
        />
      </TabsContent>
    </Tabs>
  );
}
