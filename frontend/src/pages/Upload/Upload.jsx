import UploadForm from "../../components/UploadForm/UploadForm";

function Upload() {
  return (
    <div className="mx-auto max-w-5xl py-4">
      <div className="mb-8 rounded-[2rem] border border-white/10 bg-gradient-to-br from-green-500/20 via-zinc-950/70 to-black/40 p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-green-400">Artist workspace</p>
        <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Share your next release</h1>
        <p className="mt-3 max-w-2xl text-sm text-zinc-400 sm:text-base">
          Upload audio tracks to PulseBeat and make them available instantly to your listeners.
        </p>
      </div>
      <UploadForm />
    </div>
  );
}

export default Upload;