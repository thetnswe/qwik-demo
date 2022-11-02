import { component$, Slot } from '@builder.io/qwik';
import Header from '../components/header/header';
// import Footer from '../components/footer/footer';

export default component$(() => {
    return (
        <>
            <main>
                <Header />
                <section>
                    <Slot /> {/* <== This is where the route will be inserted */}
                </section>
            </main>

            {/*Just testing narrowed layout doesn't contact footer*/}
            {/*<Footer />*/}
        </>
    );
});
