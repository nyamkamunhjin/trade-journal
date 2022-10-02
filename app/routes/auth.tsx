import { Outlet } from '@remix-run/react';

export default function Auth() {
  return (
    <div
      className="w-full h-full flex bg-cover"
      style={{
        background:
          "url('https://s3.tradingview.com/timeline/hood_60154090.jpg')",
      }}
    >
      <div className="w-full h-full max-w-xl mr-auto p-4 bg-white rounded-r-3xl">
        <Outlet />
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  return <div className="error-container">I did a whoopsies.</div>;
}
