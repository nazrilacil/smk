import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="id">
      <Head>
        {/* Meta umum */}
        <meta name="description" content="Daftar sekarang untuk masuk SMK Contoh terbaik!" />

        {/* Open Graph Meta */}
        <meta property="og:title" content="SMK AL-MASTURIYAH" />
        <meta property="og:description" content="Sekolah Menengah Kejuruan (SMK) adalah bentuk satuan pendidikan formal yang fokus pada pendidikan kejuruan di tingkat menengah, yang bertujuan untuk mempersiapkan siswa agar memiliki keterampilan dan pengetahuan khusus untuk bekerja di bidang tertentu. SMK berbeda dari SMA yang lebih berfokus pada pengetahuan umum dan mempersiapkan siswa untuk melanjutkan ke pendidikan tinggi." />
        <meta property="og:image" content="https://nama-project.vercel.app/og-image.jpg" />
        <meta property="og:url" content="https://nama-project.vercel.app" />
        <meta property="og:type" content="website" />

        {/* Twitter Meta (opsional) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SMK AL-MASTURIYAH" />
        <meta name="twitter:description" content="Sekolah Menengah Kejuruan (SMK) adalah bentuk satuan pendidikan formal yang fokus pada pendidikan kejuruan di tingkat menengah, yang bertujuan untuk mempersiapkan siswa agar memiliki keterampilan dan pengetahuan khusus untuk bekerja di bidang tertentu. SMK berbeda dari SMA yang lebih berfokus pada pengetahuan umum dan mempersiapkan siswa untuk melanjutkan ke pendidikan tinggi." />
        <meta name="twitter:image" content="https://smk-al-masturiyah.vercel.app/og-image.jpg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}