export default function Card({ product }) {

    const { title, price, description, image } = product;

    return (
        <div
            className="
            w-full
            text-text-inverse
            dark:bg-neutral-950/80
            text-white
            backdrop-blur-[1px]
            shadow-lg
            rounded-2xl
            overflow-hidden
            hover:shadow-black
            transition-shadow duration-700
            "
        >
            <img
                src={image}
                alt={title}
                className="w-full h-48 object-contain"
            />
                {/* Titulo de la Card */}
            <div className="p-5 space-y-3 ">
                <h2 className="text-h2 font-heading place-self-center">
                    {title}
                </h2>
                    {/* La descripcion */}
                <p className="text-body">
                    {description}
                </p>
                    {/* El precio */}
                <p className="text-h2 font-heading text-brand">
                    ${price.toLocaleString()}
                </p>
            </div>
        </div>
    );
}