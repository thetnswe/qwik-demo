import {
    component$,
    createContext,
    useContextProvider,
    Slot,
    useClientEffect$,
    useServerMount$,
    useStore,
    useWatch$
} from '@builder.io/qwik';
import Header from "~/components/header/header";
import Footer from "~/components/footer/footer";

//Define context
interface PageState {
    loading: true, data: null
}

export const StateContext = createContext<PageState>('State');

export default component$(() => {
    // const store = useStore({ loading: true });
    return (
        <>
            <h1>Hacker News from API <span><button className='btn btn-primary' onClick$={async () => alert('Hello World!')}>click me</button></span></h1>
            <HackerNews/>
        </>
    );
});

export const HackerNews = component$(() => {
    const store = useStore({ data: null, loading: true, bTimeOut: false });
    //Publish context to be able to use it in children
    // useContextProvider(
    //     StateContext,
    //     useStore<PageState>({
    //         loading: true, data: null
    //     })
    // );

    // useServerMount$(async () => {
    //     // // const response = await fetch('https://node-hnapi.herokuapp.com/news?page=0');
    //     // const response = await fetch('https://api.publicapis.org/entries');
    //     // store.loading = false;
    //     // store.data = await response.json();
    //     // console.log('Data Retrieved');
    //
    //     const timeout = setTimeout(async() => {
    //         console.log('Retrieving data');
    //         // const response = await fetch('https://api.publicapis.org/entries');
    //         // const response = await fetch('https://node-hnapi.herokuapp.com/news?page=0');
    //         store.loading = false;
    //         // store.data = await response.json();
    //
    //         // console.log('Data retrieved');
    //     }, 100);
    //         // cleanup(() => clearTimeout(timeout));
    //
    // });

    useClientEffect$(({ cleanup }) => {
        const timeout = setTimeout(async() => {
            // console.log('Retrieving data');
            // const response = await fetch('https://api.publicapis.org/entries');
            // const response = await fetch('https://node-hnapi.herokuapp.com/news?page=0');
            store.loading = false;
            store.bTimeOut = true;
            // store.data = await response.json();

            console.log('Data retrieved');
        }, 100);

        cleanup(() => clearTimeout(timeout));
    });

    useWatch$( async ({track}) => {
        // rerun this function  when `value` property changes.
        track(() => store.loading);

        if(store.bTimeOut){
            console.log('Loading data from server');
            const response = await fetch('https://api.publicapis.org/entries');
            // store.loading = false;
            store.data = await response.json();
        }
    });

    return (
        <>
            <Nav />
            <p>Showing data</p>
            {/*<Articles data={store.data} />*/}

            {store.loading ? <p>Loading ...</p> : <Articles data={store.data} />}

            {/*{store.loading ? <>Loading...</> : <Stories data={store.data} />}*/}
        </>
    );
});

export const Nav = component$(() => {
    return (
        <nav>
            <header class="header">
                <nav class="inner">
                    <a href="/">
                        <strong>HN</strong>
                    </a>
                    <a href="/?type=new">
                        <strong>New</strong>
                    </a>
                    <a href="/?type=show">
                        <strong>Show</strong>
                    </a>
                    <a href="/?type=ask">
                        <strong>Ask</strong>
                    </a>
                    <a href="/?type=job">
                        <strong>Jobs</strong>
                    </a>
                    <a
                        class="github"
                        href="http://github.com/builderio/qwik"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Built with Qwik
                    </a>
                </nav>
            </header>
        </nav>
    );
});

export const Articles = component$((props: { data: any }) => {
    const page = 1;
    const type = 'list';
    const stories = props.data.entries;
    console.log("Rendering articles");
    // console.log(typeof(stories));
    console.log(stories);
    return (
        <div class="news-view">
            <main class="news-list">
                {stories && (
                    <ul>
                        {stories.map((story: IStory) => (
                            <StoryPreview story={story} />
                        ))}
                    </ul>
                )}
            </main>
        </div>
    );
});

export const BackupStories = component$((props: { data: any }) => {
    const page = 1;
    const type = 'list';
    const stories = props.data;
    return (
        <div class="news-view">
            <div class="news-list-nav">
                {page > 1 ? (
                    <a class="page-link" href={`/?type=${type}&page=${page - 1}`} aria-label="Previous Page">
                        {'<'} previous
                    </a>
                ) : (
                    <span class="page-link disabled" aria-disabled="true">
            {'<'} previous
          </span>
                )}
                <span>page {page}</span>
                {stories && stories.length >= 29 ? (
                    <a class="page-link" href={`/?type=${type}&page=${page + 1}`} aria-label="Next Page">
                        more {'>'}
                    </a>
                ) : (
                    <span class="page-link disabled" aria-disabled="true">
            more {'>'}
          </span>
                )}
            </div>
            <main class="news-list">
                {stories && (
                    <ul>
                        {stories.map((story: IStory) => (
                            <StoryPreview story={story} />
                        ))}
                    </ul>
                )}
            </main>
        </div>
    );
});

export const StoryPreview = component$((props: { story: IStory }) => {
    return (
        <li class="news-item">
            <span class="score">{props.story.points}</span>
            <span class="title">
        {props.story.url && !props.story.url.startsWith('item?id=') ? (
            <>
                <a href={props.story.url} target="_blank" rel="noreferrer">
                    {props.story.title}
                </a>
                <span class="host"> ({props.story.domain})</span>
            </>
        ) : (
            <a href={`/item/${props.story.id}`}>{props.story.title}</a>
        )}
      </span>
            <br />
            <span class="meta">
        {props.story.type !== 'job' ? (
            <>
                by <a href={`/users/${props.story.user}`}>{props.story.user}</a> {props.story.time_ago}{' '}
                |{' '}
                <a href={`/stories/${props.story.id}`}>
                    {props.story.comments_count ? `${props.story.comments_count} comments` : 'discuss'}
                </a>
            </>
        ) : (
            <a href={`/stories/${props.story.id}`}>{props.story.time_ago}</a>
        )}
      </span>
            {props.story.type !== 'link' && (
                <>
                    {' '}
                    <span class="label">{props.story.type}</span>
                </>
            )}
        </li>
    );
});

export interface IComment {
    id: string;
    user: string;
    time_ago: string;
    content: string;
    comments: IComment[];
}

export interface IStory {
    id: string;
    title: string;
    points: string;
    user: string;
    time: string;
    time_ago: string;
    comments_count: number;
    type: string;
    url: string;
    domain: string;
    comments: IComment[];
}