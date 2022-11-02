import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './footer.css?inline';

export default component$(() => {
  useStylesScoped$(styles);
  return (
    <footer>
      <a href="https://joydash.com" target="_blank">
        Made with ♡ by JoyDash Co. Ltd
      </a>
    </footer>
  );
});
