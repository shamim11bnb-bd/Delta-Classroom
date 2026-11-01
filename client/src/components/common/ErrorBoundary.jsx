import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="container" style={{ padding: "4rem 0" }}>
        <h1>কিছু একটা ভুল হয়েছে</h1>
        <p>পেজটি রিফ্রেশ করে আবার চেষ্টা করুন। সমস্যা থাকলে আমাদের জানান।</p>
        <button className="btn" onClick={() => window.location.reload()}>রিফ্রেশ করুন</button>
      </div>
    );
  }
}
