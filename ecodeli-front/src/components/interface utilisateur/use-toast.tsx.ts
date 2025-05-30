"use client"

type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

export const toast = ({ title, description, variant = "default" }: ToastProps) => {
  // Implémentation simple pour le développement
  const message = title ? `${title}: ${description}` : description

  if (variant === "destructive") {
    console.error(message)
    alert(`❌ ${message}`)
  } else {
    console.log(message)
    alert(`✅ ${message}`)
  }
}

export const useToast = () => {
  return { toast }
}
