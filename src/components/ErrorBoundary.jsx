import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#fef2f2', color: '#991b1b', height: '100vh' }}>
                    <h1>Something went wrong.</h1>
                    <details style={{ whiteSpace: 'pre-wrap', marginTop: '1rem', textAlign: 'left', maxWidth: '800px', margin: '1rem auto', padding: '1rem', background: '#fff', border: '1px solid #fecaca', borderRadius: '8px' }}>
                        <summary>Details</summary>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo && this.state.errorInfo.componentStack}
                    </details>
                    <button onClick={() => window.location.reload()} style={{ marginTop: '2rem', padding: '0.5rem 1rem', cursor: 'pointer' }}>Reload Page</button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
