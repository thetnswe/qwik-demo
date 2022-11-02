import {component$, Slot, useClientEffect$, useStore, useStylesScoped$} from '@builder.io/qwik';
import { DocumentHead, useLocation } from '@builder.io/qwik-city';
import {Counter} from "./counter";

export default component$(() => {
    return (
        <>
            <p>Rendering Counter</p>
            <Counter />
        </>
    );
});

export const head: DocumentHead = {
    title: 'Counter',
};
