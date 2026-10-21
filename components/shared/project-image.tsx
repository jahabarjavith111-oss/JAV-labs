import Image from "next/image";
import { ImageOff } from "lucide-react";

type ProjectImageProps = {
  /** Path under /public, e.g. "/images/projects/txnoryx.png". */
  src?: string;
  alt: string;
  /** Describes where to drop the file when no image exists yet. */
  slotHint?: string;
  className?: string;
};

/**
 * Project screenshot with an honest placeholder slot.
 * When `src` is undefined, a clearly labeled slot is shown instead of a fake image.
 */
export function ProjectImage({
  src,
  alt,
  slotHint,
  className = "",
}: ProjectImageProps) {
  if (src) {
    return (
      <div
        className={`relative overflow-hidden rounded-xl border border-line bg-elevated ${className}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`${alt} (screenshot slot — no image added yet)`}
      className={`flex aspect-video flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-line-2 bg-elevated p-6 text-center ${className}`}
    >
      <ImageOff className="h-6 w-6 text-fg-3" aria-hidden="true" />
      <p className="text-sm font-medium text-fg-2">Screenshot coming soon</p>
      {slotHint ? (
        <p className="max-w-xs text-xs leading-relaxed text-fg-3">
          {slotHint}
        </p>
      ) : null}
    </div>
  );
}
