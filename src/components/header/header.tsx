import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { QwikLogo } from '../icons/qwik';
import styles from './header.css?inline';

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <header>
      <div class="logo">
        <a href="/">
          <QwikLogo />
        </a>
      </div>
      <ul>
        <li>
          <a href="https://qwik.builder.io/docs/components/overview/" target="_blank">
            Docs
          </a>
        </li>
        <li>
          <a href="https://qwik.builder.io/examples/introduction/hello-world/" target="_blank">
            Examples
          </a>
        </li>
        <li>
          <a href="https://qwik.builder.io/tutorial/welcome/overview/" target="_blank">
            Tutorials
          </a>

          <a className='btn btn-primary' href='/contact'>Contact</a>
          <a className='btn btn-secondary' href='/about'>About</a>
          <a className='btn btn-secondary' href='/profile'>Profile</a>
          <a className='btn btn-danger' href='/settings'>Settings</a>
          <a className='btn btn-primary' href='/dashboard'>Dashboard</a>
          <a className='btn btn-secondary' href='/markdown'>Markdown</a>
          <a className='btn btn-secondary' href='/counter'>Counter</a>
          <a className='btn btn-secondary' href='/test/path'>Menu</a>
          <a className='btn btn-primary' href='/hacker_news'>Hacker News</a>
          <a className='btn btn-secondary' href='/auto_complete'>Auto Complete</a>

        </li>
      </ul>
    </header>
  );
});
