export default function fetcher(url: string, data = {}) {
    return fetch(`${window.location.origin}/api/${url}`, {
        method: data ? 'POST' : 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}