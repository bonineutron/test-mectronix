import { Link } from 'react-router';

export function HomePage() {
   return (
      <div className='flex flex-col items-center justify-center min-h-[400px] bg-gradient-to-r from-pink-500 to-blue-500 text-white text-center p-6 rounded-md shadow-md'>
         <h1 className='text-5xl font-bold mb-4'>¡Bienvenido a nuestra tienda!</h1>

         <p className='text-lg md:text-2xl mb-6'>Descubre una gran variedad de productos de calidad a precios increíbles.</p>

         <Link
            to='/products'
            className='bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-lg text-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl'>
            Explorar productos
         </Link>
      </div>
   );
}
