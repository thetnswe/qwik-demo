import { component$, Slot } from '@builder.io/qwik';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';

export default component$(() => {
  return (
    <>
      <main>
          {/*  Render Header Component*/}
          <Header />

            <section>
              <Slot /> {/* <== This is where the route will be inserted */}
            </section>

      </main>

      {/*  Render Footer Component*/}
      <Footer />
    </>
  );
});
