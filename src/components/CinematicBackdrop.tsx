type CinematicBackdropProps = {
  tone?: "hero" | "forest" | "paper" | "sage";
};

export function CinematicBackdrop({ tone = "forest" }: CinematicBackdropProps) {
  return (
    <div className={`cinematic-backdrop cinematic-${tone}`} aria-hidden="true">
      <span className="cinematic-horizon" />
      <span className="cinematic-field-lines" />
      <span className="cinematic-light-sweep" />
      <span className="cinematic-grain" />
    </div>
  );
}
