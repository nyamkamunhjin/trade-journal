import { useLoaderData } from '@remix-run/react';
import type { LoaderData } from './.loader';

export { loader } from './.loader';

export default function Index() {
    const data = useLoaderData<LoaderData>();
    return <div>{JSON.stringify(data)}</div>;
}
