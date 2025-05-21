import Header from '@/components/Header';

export default function page() {
    return (
        <>
        <Header />
        <div className="space-y-4">
  <details
    className="group border-s-4 border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 [&_summary::-webkit-details-marker]:hidden"
    open
  >
    <summary className="flex items-center justify-between gap-1.5 text-gray-900 dark:text-white">
      <h2 className="text-lg font-medium">FAQs SMK AL-MASTURIYAH?</h2>

      <svg
        className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    </summary>

    <p className="pt-4 text-gray-900 dark:text-white">
SMK Al-Masturiyah Langkaplancar adalah sekolah menengah kejuruan swasta yang terletak di Kec. Langkaplancar, Kab. Pangandaran, Jawa Barat. Sekolah ini didirikan pada 25 Mei 2012 dengan Nomor SK Pendirian 01/PAN/YAM/2012. Status kepemilikan sekolah ini adalah yayasan. 

    </p>
  </details>
  <details
    className="group border-s-4 border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 [&_summary::-webkit-details-marker]:hidden"
    open
  >
    <summary className="flex items-center justify-between gap-1.5 text-gray-900 dark:text-white">
      <h2 className="text-lg font-medium">Berikut beberapa informasi umum tentang SMK Al-Masturiyah Langkaplancar:</h2>

      <svg
        className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    </summary>

<div className="flow-root">
  <dl
    className="-my-3 divide-y divide-gray-200 text-sm *:even:bg-gray-50 dark:divide-gray-700 dark:*:even:bg-gray-800"
  >
    <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
      <dt className="font-medium text-gray-900 dark:text-white">NISP</dt>

      <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">69787069</dd>
    </div>

    <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
      <dt className="font-medium text-gray-900 dark:text-white">Status</dt>

      <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">Swasta</dd>
    </div>

    <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
      <dt className="font-medium text-gray-900 dark:text-white">Jenjang</dt>

      <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">SMK</dd>
    </div>

    <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
      <dt className="font-medium text-gray-900 dark:text-white">Status Kepemilikan</dt>

      <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">Yayasan</dd>
    </div>

    <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
      <dt className="font-medium text-gray-900 dark:text-white">Tanggal SK Pendirian</dt>

      <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">
     2012-05-25
      </dd>
    </div>
  </dl>
</div>
  </details>
  </div>
        </>
    )
} 