import { component$, Slot } from '@builder.io/qwik';
export default component$(() => {
  return (
    <>
      <main>
        <section>
          <Slot /> {/* <== This is where the route will be inserted */}
        </section>
      </main>
    </>
  );
});
