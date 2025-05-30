// lib/auth.ts

export async function getUserProfile() {
  try {
    const res = await fetch('http://localhost:3001/auth/me', {
      credentials: 'include', // pour envoyer le cookie JWT
    });

    if (!res.ok) return null;

    const user = await res.json();
    return {
      id: user.id,
      email: user.email,
      type: user.type || user.role, // role = 'client', 'livreur', etc.
    };
  } catch (error) {
    console.error('Erreur lors de la récupération du profil utilisateur :', error);
    return null;
  }
}

export async function logout() {
  try {
    await fetch('http://localhost:3001/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
  } catch (error) {
    console.error('Erreur lors de la déconnexion :', error);
  }
}
