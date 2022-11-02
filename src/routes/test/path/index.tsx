import { component$ } from '@builder.io/qwik';
import {useContent, useLocation} from "@builder.io/qwik-city";

// Navigating to http://localhost/test/path activates:
//     src/routes/test/path/index.tsx: This component will be used for rendering the page content.
//     src/routes/test/layout.tsx: This layout will be used to provide content around the src/routes/some/path/index.tsx. Internally the layout can use src/routes/some/menu.md to render the menus.
//     src/routes/test/menu.md: This file will be used to declare the menu structure which will be rendered by src/routes/some/layout.tsx.

export default component$(() => {
    const { menu } = useContent()    ;
    const { pathname } = useLocation();

    return (
        <div class="menu">
            {menu
                ? menu.items?.map((item) => (
                    <>
                        <h5>{item.text}</h5>
                        <ul>
                            {item.items?.map((item) => (
                                <li>
                                    <a
                                        href={item.href}
                                        class={{
                                            'is-active': pathname === item.href,
                                        }}
                                    >
                                        {item.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </>
                ))
                : null}
        </div>
    );
});