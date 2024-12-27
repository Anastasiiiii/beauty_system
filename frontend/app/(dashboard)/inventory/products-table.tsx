'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Product } from './product';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ProductsTable({
  products,
  offset,
  totalProducts
}: {
  products: any[];
  offset: number;
  totalProducts: number;
}) {
  const router = useRouter();
  const productsPerPage = 5;

  function prevPage() {
    router.back();
  }

  function nextPage() {
    router.push(`/?offset=${offset}`, { scroll: false });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Інвентар</CardTitle>
        <CardDescription>
          Інвентаризація наявних засобів у салонах.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Назва</TableHead>
              <TableHead className="hidden md:table-cell">Артикул</TableHead>
              <TableHead className="hidden md:table-cell">
                Кількість
              </TableHead>
              <TableHead className="hidden md:table-cell">Салон</TableHead>
              <TableHead className="hidden md:table-cell">Потреба у замовленні</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableHead>{product.name}</TableHead>
                <TableHead className="hidden md:table-cell">{product.sku}</TableHead>
                <TableHead className="hidden md:table-cell">{product.quantity}</TableHead>
                <TableHead className="hidden md:table-cell">{product.salon}</TableHead>
                <TableHead className="hidden md:table-cell">
                  {product.needsRestocking ? "Так" : "Ні"}
                </TableHead>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
  );
}
