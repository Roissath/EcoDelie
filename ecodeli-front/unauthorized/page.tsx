export default function UnauthorizedPage() {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <h1 className="text-4xl font-bold text-red-600">Accès refusé</h1>
          <p className="mt-4 text-gray-600">Vous n'avez pas les droits pour accéder à cette page.</p>
        </div>
      </div>
    )
  }
  