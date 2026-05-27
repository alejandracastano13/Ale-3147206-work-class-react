import {Card} from "@/shared"; // 👈 sin llaves
import { products } from "../../../../data/products/products";

export default function HomePage() {

    return (
        <div className="mt-4 mx-auto max-w-7xl">
            {/* Hero */}
            {/* Carrusel */}
            {/* Título */}
            <h2 className="text-h2 place-self-center mb-12">
                Products

            </h2>

            {/* Cards */}
            <div
                className="
                grid
                gap-4
                mx-6
                sm:grid-cols-2
                sm:mx-12
                lg:grid-cols-3
                xl:grid-cols-4
                justify-center
                "
            >
                {/* Integracion que nos permite tarer los elemnetos de los productos */}
                {products.map((product) => (
                    <Card
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </div>
    );
}