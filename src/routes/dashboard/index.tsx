import type { RequestHandler } from '@builder.io/qwik-city';
import {component$} from "@builder.io/qwik";
import SubComponent from '../../components/sub_component';

//Product model data
interface DashboardData {
    id: string;
    name: number;
    role: string;
}

export default component$(() => {
    return (
        <>
            <h2>Dashboard rendering sub-component!</h2>
            <SubComponent />
        </>
    );
});

export const onGet: RequestHandler<DashboardData> = async ({ request, response }) => {
    const isAuthorized = request.headers.get('cookie');
    if (!isAuthorized) {
        // User is not authorized!
        // throw the redirect response to
        // relocate the user to the log-in page
        throw response.redirect('/login');
    } else {
        // ...
    }
};