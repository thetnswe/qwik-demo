// File: src/routes/product/[skuId]/details/index.tsx
import { component$, Resource, useStore } from '@builder.io/qwik';
import type { RequestHandler } from '@builder.io/qwik-city';
import { useEndpoint } from "@builder.io/qwik-city";

//Product model data
interface ProductData {
    id: string;
    price: number;
    description: string;
}

// onGet function retrieves data and makes it available to the component using useEndpoint function.
export const onGet: RequestHandler<ProductData> = async ({ params }) => {
    // put your DB access here, we are hard coding a response for simplicity.
    return {
        id: params.id,
        price: 123.45,
        description: `Description for ${params.id}`,
    };
};

//The useEndpoint() function invokes onGet function directly on the server but using fetch() on the client.
//Resource is to allow the client to render different states of the useEndpoint() resource.
//On the server the <Resource> element will pause rendering until the Resource is resolved or rejected.
export default component$(() => {
    const productData = useEndpoint<ProductData>();
    return (
        <Resource
            value={productData}
            onPending={() => <div>Loading...</div>}
            onRejected={() => <div>Error</div>}
            onResolved={(product) => (
                <>
                    <h1>Product: {product.id}</h1>
                    <p>Price: {product.price}</p>
                    <p>{product.description}</p>
                </>
            )}
        />
    );
});