import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-center">

        <h1 className="text-6xl font-bold text-white">
          ♟ Chess Opening Trainer
        </h1>

        <p className="mt-6 text-xl text-gray-300">
          Practice against every opening and improve your opening repertoire.
        </p>

        <Link
          href="/setup"
          className="mt-10 inline-block rounded-xl bg-green-600 px-8 py-4 text-xl font-semibold text-white hover:bg-green-700 transition"
        >
          Start Practicing
        </Link>

      </div>
    </main>
  );
}