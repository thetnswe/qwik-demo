import {component$, useClientEffect$, useStore, useWatch$} from '@builder.io/qwik';

export default component$(() => {
    console.log('Rendering auto complete!');
    return (
        <div>
            This example features an auto-complete component with a debounce of 150 ms.
            <br />
            The function `debouncedGetPeople` needs to be exported because it is used in `useWatch$`.
            <br />
            <br />
            Go ahead, search for Star Wars characters such as "Luke Skywalker", it uses the{' '}
            <a href="https://swapi.dev/" class='a-text-link text-blue-900'>Star Wars API</a>
            <AutoComplete></AutoComplete>
            {/*<Clock></Clock>*/}
        </div>
    );
});

interface IState {
    searchInput: string;
    searchResults: string[];
    selectedValue: string;
}

export const AutoComplete = component$(() => {
    const state = useStore<IState>({
        searchInput: '',
        searchResults: [],
        selectedValue: '',
    });

    useWatch$(async ({ track }) => {
        const searchInput = track(() => state.searchInput);

        console.log('Watching search input');
        if (!searchInput) {
            state.searchResults = [];
            return;
        }

        const controller = new AbortController();
        state.searchResults = await debouncedGetPeople(state.searchInput, controller);

        return () => {
            controller.abort();
        };
    });

    return (
        <div>
            <input class='form-control'
                type="text"
                onInput$={(ev) => (state.searchInput = (ev.target as HTMLInputElement).value)}
            />
            <SuggestionsListComponent state={state}></SuggestionsListComponent>
        </div>
    );
});

export const Clock = component$(() => {
    const store = useStore({
       time: '',
    });

    useClientEffect$(
        () => {
            const update = () => {
              store.time = String(new Date())  ;
            };
            update();
            const id = setInterval(update, 1000);
            return () => clearInterval(id);
        },
    );

    return (
        <div>
            Current time is {store.time}
        </div>
    );
});


export const SuggestionsListComponent = (props: { state: IState }) => {
    const searchResults = props.state.searchResults;
    return searchResults?.length ? (
        <ul>
            {searchResults.map((suggestion) => {
                return <li onClick$={() => (props.state.selectedValue = suggestion)}>{suggestion}</li>;
            })}
        </ul>
    ) : (
        <div class="no-results">
            <em>No suggestions, you re on your own!</em>
        </div>
    );
};

const getPeople = (searchInput: string, controller?: AbortController): Promise<string[]> =>
    fetch(`https://swapi.dev/api/people/?search=${searchInput}`, {
        signal: controller?.signal,
    })
        .then((response) => {
            return response.json();
        })
        .then((parsedResponse) => {
            return parsedResponse.results.map((people: { name: string }) => people.name);
        });

// export const Clock = component$(() => {
//
// });


function debounce<F extends (...args: any[]) => any>(fn: F, delay = 500) {
    let timeoutId: ReturnType<typeof setTimeout>;

    return (...args: Parameters<F>): Promise<ReturnType<F>> => {
        return new Promise((resolve) => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                resolve(fn(...args));
            }, delay);
        });
    };
}

export const debouncedGetPeople = debounce(getPeople, 150);
