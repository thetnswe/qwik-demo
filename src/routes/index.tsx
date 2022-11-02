import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  return (
      <div>
        <h1>
          Qwik Getting Started<span class="lightning">⚡️</span>
        </h1>

        <a class='btn btn-primary my-2' href='/counter'>
          Calculate
        </a>

        <Link class="mindblow" href="/flower">
          Blow my mind 🤯
        </Link>
      </div>
  );
});

export const head: DocumentHead = {
  title: 'Getting Started',
};