import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-blue-100 to-purple-100">
      <h1 className="text-3xl font-bold mb-4">Witaj w TerapAI</h1>
      <p className="mb-8 text-center">W porządku jest nie być w porządku.</p>
      <div className="flex gap-6">
        <Link href="/chat?persona=lumi&lang=pl">
          <button className="bg-blue-400 px-6 py-3 rounded-xl text-white shadow">Porozmawiaj z Lumi (PL)</button>
        </Link>
        <Link href="/chat?persona=neo&lang=pl">
          <button className="bg-purple-400 px-6 py-3 rounded-xl text-white shadow">Porozmawiaj z Neo (PL)</button>
        </Link>
      </div>
      <div className="mt-6 flex gap-6">
        <Link href="/chat?persona=lumi&lang=en">
          <button className="bg-blue-400 px-6 py-3 rounded-xl text-white shadow">Talk to Lumi (EN)</button>
        </Link>
        <Link href="/chat?persona=neo&lang=en">
          <button className="bg-purple-400 px-6 py-3 rounded-xl text-white shadow">Talk to Neo (EN)</button>
        </Link>
      </div>
    </div>
  );
}
