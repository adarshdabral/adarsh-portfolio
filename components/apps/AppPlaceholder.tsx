import Ash from "@/components/os/Ash";

export default function AppPlaceholder({
  label,
  step,
}: {
  label: string;
  step: string;
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
      <Ash size={64} pose="thinking" />
      <p className="font-pixel text-xs text-neutral-500">{label}</p>
      <p className="max-w-xs text-sm text-neutral-400">
        This window is wired into the OS shell. Real content lands in{" "}
        {step}.
      </p>
    </div>
  );
}
