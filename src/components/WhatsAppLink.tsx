import { ArrowIcon } from "./ArrowIcon";

type WhatsAppLinkProps = {
  className?: string;
  compact?: boolean;
  label?: string;
  message: string;
};

export function WhatsAppLink({
  className = "",
  compact = false,
  label = compact ? "WhatsApp" : "Chat on WhatsApp",
  message,
}: WhatsAppLinkProps) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");
  const encodedMessage = encodeURIComponent(message);
  const href = number
    ? `https://wa.me/${number}?text=${encodedMessage}`
    : `https://wa.me/?text=${encodedMessage}`;

  return (
    <a
      className={`whatsapp-link${compact ? " compact" : ""}${className ? ` ${className}` : ""}`}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {label}
      {!compact ? <ArrowIcon /> : null}
    </a>
  );
}
