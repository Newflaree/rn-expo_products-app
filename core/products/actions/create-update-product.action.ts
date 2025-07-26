import { API_URL, productsApi } from '../../api/productsApi';
import type { Product } from '../interfaces/product.interface';


export const createUpdateProduct = async ( product: Partial<Product> ) => {
  product.stock = isNaN( Number( product.stock ) ) ? 0 : Number( product.stock );
  product.price = isNaN( Number( product.price ) ) ? 0 : Number( product.price );

  if ( product.id && product.id !== 'new' ) {
    return updateProduct( product );
  }

  return createProduct( product );
}

const prepareImages = async ( images: string[] ): Promise<string[]> => {
  const fileImages = images.filter( (image) => image.includes( 'file' ) );
  const currentImages = images.filter( (image) => !image.includes( 'file' ) );

  if ( fileImages.length ) {
    const uploadPromises = fileImages.map( uploadImage );
    const uploadedImages = await Promise.all( uploadPromises );
    currentImages.push( ...uploadedImages );
  }

  return currentImages.map( img => img.split( '/' ).pop()! );
}

const uploadImage = async ( image: string ): Promise<string> => {
  const formData = new FormData() as any;
  formData.append( 'file', {
    uri: image,
    type: 'image/jpeg',
    name: image.split( '/' ).pop()
  });

  const { data } = await productsApi.post<{ image: string }>(
    '/files/product',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  );

  return data.image;
}

const updateProduct = async ( product: Partial<Product> ) => {
  const { id, images = [], user, ...rest } = product;

  try {
    const checkedImages = await prepareImages( images )

    const { data } = await productsApi.patch<Product>( `/products/${ id }`, {
      // TODO: images
      ...rest,
      images: checkedImages
    });

    return data;
  } catch ( error ) {
    throw new Error( 'Updating product failing' );
  }
}

const createProduct = async ( product: Partial<Product> ) => {
  const { id,images = [], user, ...rest } = product;

  try {
    const checkedImages = await prepareImages( images )

    const { data } = await productsApi.post<Product>( `/products`, {
      // TODO: images
      ...rest,
      images: checkedImages
    });

    console.log( data );

    return data;
  } catch ( error ) {
    throw new Error( 'Updating product failing' );
  }
}
