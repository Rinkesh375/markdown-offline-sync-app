import type { SyncStatusBadgeProps } from "@/types/SyncStatusBadge";

export default function SyncStatusBadge({
  synced,
  syncing,
  error,
}: SyncStatusBadgeProps) {
  if (error) return <span className="text-red-500">Error</span>;
  if (syncing) return <span className="text-yellow-500">Syncing...</span>;
  return (
    <span className={synced ? "text-green-500" : "text-gray-400"}>
      {synced ? "Synced" : "Unsynced"}
    </span>
  );
}
