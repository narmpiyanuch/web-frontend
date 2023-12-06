export default function Loading({ isLoading }) {
  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-white z-50 transition-opacity ${
        isLoading ? "opacity-30" : "opacity-0"
      }`}
    >
      <span className="loading loading-dots loading-lg bg-orange-100"></span>
    </div>
  );
}
