//Nested layout where this page will have different layout than main layout
import { component$, Slot } from '@builder.io/qwik';

// File: src/routes/about/layout.tsx
export default component$(() => {
    return (
        <section>
            <Slot /> {/* <== Child layout/route inserted here */}
        </section>
    );
});