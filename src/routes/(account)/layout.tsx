//Nested layout where this page will have different layout than main layout
//Also Grouped layout where (account) doesn't have to put in the url
import { component$, Slot } from '@builder.io/qwik';

export default component$(() => {
    return (
        <section>
            <Slot /> {/* <== Child layout/route inserted here */}
        </section>
    );
});