export const validateProduct = (name: string, price: number, categoryId: string, description: string) => {
  const errors: Record<string, string> = {};
  if (!name || !name.trim()) errors.name = 'Nom kiritilishi shart';
  if (price <= 0 || isNaN(price)) errors.price = "Narx 0 dan katta bo'lishi kerak";
  if (!categoryId) errors.categoryId = 'Kategoriya tanlanishi shart';
  if (!description || !description.trim()) errors.description = 'Tavsif kiritilishi shart';
  return Object.keys(errors).length > 0 ? errors : null;
};

export const validateCategory = (name: string) => {
  const errors: Record<string, string> = {};
  if (!name || !name.trim()) errors.name = 'Nom kiritilishi shart';
  return Object.keys(errors).length > 0 ? errors : null;
};
