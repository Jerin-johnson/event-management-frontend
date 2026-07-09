import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error Boundary:", error);
    console.error(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
            textAlign: "center",
            padding: "2rem",
          }}
        >
          <div>
            <h1>Something went wrong.</h1>
            <p>Please refresh the page and try again.</p>

            <button onClick={() => window.location.reload()}>Reload</button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
