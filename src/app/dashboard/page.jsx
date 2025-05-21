export default function DashboardHome() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Selamat datang di Dashboard</h1>
      <p className="text-gray-400">Silakan pilih menu di samping untuk mengelola konten website.</p>
      <article
  className="flex items-end justify-between rounded-lg border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-gray-900"
>
  <div className="flex items-center gap-4">
    <span
      className="hidden rounded-full bg-gray-100 p-2 text-gray-600 sm:block dark:bg-gray-800 dark:text-gray-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="size-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    </span>

    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400">Profit+</p>

      <p className="text-2xl font-medium text-gray-900 dark:text-white">$240.94</p>
    </div>
  </div>

  <div
    className="inline-flex gap-2 rounded-sm bg-green-100 p-1 text-green-600 dark:bg-green-700 dark:text-green-50"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="size-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
      />
    </svg>

    <span className="text-xs font-medium"> 67.81% </span>
  </div>
</article>

<article
  className="flex items-end justify-between rounded-lg border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-gray-900"
>
  <div className="flex items-center gap-4">
    <span
      className="hidden rounded-full bg-gray-100 p-2 text-gray-600 sm:block dark:bg-gray-800 dark:text-gray-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="size-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    </span>

    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400">-Profit</p>

      <p className="text-2xl font-medium text-gray-900 dark:text-white">$240.94</p>
    </div>
  </div>

  <div
    className="inline-flex gap-2 rounded-sm bg-red-100 p-1 text-red-600 dark:bg-red-700 dark:text-red-50"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="size-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
      />
    </svg>

    <span className="text-xs font-medium"> 67.81% </span>
  </div>
</article>
    </div>
  )
}