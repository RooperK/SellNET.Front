export class CategoryModel {
  id: number;
  name: string;
  subCategories?: CategoryModel[];
}
