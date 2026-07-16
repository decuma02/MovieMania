export default function SpinningAnimation() {
  return (
    <div
      className="spin-animate-overlay"
      role="status"
      aria-label="Loading movies, please wait…"
    >
      <div className="spin-animate" aria-hidden="true" />
    </div>
  );
}