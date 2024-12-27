export class CreateProductDto {
  readonly name: string;
  readonly sku: string;
  readonly quantity: number;
  readonly salon: string;
  readonly needsRestocking: boolean;
}
