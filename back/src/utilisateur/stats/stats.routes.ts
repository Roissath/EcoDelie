/**
 * Routes du module Stats pour EcoDeli - Mission 2 Data Mining
 *
 * Ce fichier définit toutes les routes disponibles pour l'API Stats
 * Utilisé par l'application Java et le frontend pour récupérer les données
 */

export const STATS_ROUTES = {
  // Routes principales
  BASE: "/stats",

  // Dashboard et vues d'ensemble
  DASHBOARD: "/stats/dashboard",
  HEALTH: "/stats/health",
  TEST: "/stats/test",

  // Statistiques par catégorie
  UTILISATEURS: "/stats/utilisateurs",
  LIVRAISONS: "/stats/livraisons",
  FINANCIER: "/stats/financier",
  PRESTATIONS: "/stats/prestations",
  PERFORMANCE: "/stats/performance",

  // Data Mining et exports (Mission 2)
  EXPORT_DATAMINING: "/stats/export/datamining",
  RAPPORT_COMPLET: "/stats/rapport/complet",

  // Top 5 requis pour Mission 2
  TOP_CLIENTS_FIDELES: "/stats/top/clients-fideles",
  TOP_PRESTATIONS_DEMANDEES: "/stats/top/prestations-demandees",
  TOP_LIVREURS: "/stats/top/livreurs",
  TOP_COMMERCANTS: "/stats/top/commercants",

  // Analyses détaillées
  ANALYSE_CA: "/stats/analyse/chiffre-affaires",
  ANALYSE_CROISSANCE: "/stats/analyse/croissance",
  ANALYSE_SATISFACTION: "/stats/analyse/satisfaction",
  ANALYSE_GEOGRAPHIQUE: "/stats/analyse/geographique",

  // Données pour diagrammes (Mission 2 - Application Java)
  DIAGRAMMES_UTILISATEURS: "/stats/diagrammes/utilisateurs",
  DIAGRAMMES_PRESTATIONS: "/stats/diagrammes/prestations",
  DIAGRAMMES_LIVRAISONS: "/stats/diagrammes/livraisons",
  DIAGRAMMES_FINANCIER: "/stats/diagrammes/financier",

  // Filtres et périodes
  PERIODE_MENSUELLE: "/stats/periode/mensuelle",
  PERIODE_ANNUELLE: "/stats/periode/annuelle",
  PERIODE_PERSONNALISEE: "/stats/periode/personnalisee",

  // KPIs et indicateurs
  KPIS_PRINCIPAUX: "/stats/kpis/principaux",
  INDICATEURS_PERFORMANCE: "/stats/indicateurs/performance",
  INDICATEURS_QUALITE: "/stats/indicateurs/qualite",

  // Exports spécialisés
  EXPORT_CSV: "/stats/export/csv",
  EXPORT_EXCEL: "/stats/export/excel",
  EXPORT_PDF: "/stats/export/pdf",
} as const

// Types pour TypeScript
export type StatsRoute = (typeof STATS_ROUTES)[keyof typeof STATS_ROUTES]

// Documentation des paramètres pour chaque route
export const STATS_ROUTES_PARAMS = {
  // Paramètres communs
  COMMON: {
    dateDebut: "Date de début (YYYY-MM-DD)",
    dateFin: "Date de fin (YYYY-MM-DD)",
    periode: "Période (jour|semaine|mois|annee)",
    format: "Format de sortie (json|csv|excel|pdf)",
    limite: "Nombre maximum de résultats",
  },

  // Paramètres spécifiques par route
  DASHBOARD: {
    type: "Type de dashboard (admin|client|livreur|commercant)",
    utilisateurId: "ID utilisateur pour dashboard personnalisé",
  },

  UTILISATEURS: {
    type: "Type utilisateur (client|livreur|commercant|prestataire)",
    statut: "Statut (actif|inactif|suspendu)",
    ville: "Filtrer par ville",
  },

  LIVRAISONS: {
    statut: "Statut livraison (en_cours|livree|annulee)",
    type: "Type livraison (express|standard|programmee)",
    livreurId: "ID du livreur",
  },

  FINANCIER: {
    typeCA: "Type CA (commissions|abonnements|prestations)",
    devise: "Devise (EUR|USD)",
    tva: "Inclure TVA (true|false)",
  },

  PRESTATIONS: {
    typePrestation: "Type prestation (transport|courses|garde)",
    prestataireId: "ID du prestataire",
    note: "Note minimum (1-5)",
  },
} as const

// Exemples d'utilisation des routes
export const STATS_ROUTES_EXAMPLES = {
  // Dashboard principal
  DASHBOARD_ADMIN: "/stats/dashboard?type=admin&periode=mois",
  DASHBOARD_CLIENT: "/stats/dashboard?type=client&utilisateurId=123",

  // Top 5 pour Mission 2
  TOP_CLIENTS: "/stats/top/clients-fideles?limite=5&periode=annee",
  TOP_PRESTATIONS: "/stats/top/prestations-demandees?limite=5&dateDebut=2024-01-01",

  // Export data mining
  EXPORT_COMPLET: "/stats/export/datamining?format=json&periode=annee",
  RAPPORT_PDF: "/stats/rapport/complet?format=pdf&dateDebut=2024-01-01&dateFin=2024-12-31",

  // Analyses spécifiques
  ANALYSE_CA_MENSUEL: "/stats/analyse/chiffre-affaires?periode=mois&typeCA=commissions",
  SATISFACTION_PRESTATIONS: "/stats/analyse/satisfaction?type=prestations&note=4",

  // Diagrammes pour Java
  DIAGRAMMES_USERS: "/stats/diagrammes/utilisateurs?format=json&periode=annee",
  DIAGRAMMES_PRESTA: "/stats/diagrammes/prestations?format=json&limite=10",
} as const
