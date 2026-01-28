export default function Home() {
    return (
        <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
            <h1>Conexta Backend API</h1>
            <p>Status: Running</p>
            <p>Endpoints:</p>
            <ul>
                <li><a href="/api/status">/api/status</a></li>
            </ul>
        </div>
    );
}
