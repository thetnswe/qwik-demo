// File: src/components/counter/counter.tsx
import { component$, useStore } from '@builder.io/qwik';

export const Counter = component$(() => {
    const store = useStore({ count: 0 });

    return (
        <button class="btn btn-danger" type="button" onClick$={() => store.count++}>
            Increment {store.count}
        </button>
    );
});