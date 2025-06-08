"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATS_ROUTES_EXAMPLES = exports.STATS_ROUTES_PARAMS = exports.STATS_ROUTES = void 0;
exports.STATS_ROUTES = {
    BASE: "/stats",
    DASHBOARD: "/stats/dashboard",
    HEALTH: "/stats/health",
    TEST: "/stats/test",
    UTILISATEURS: "/stats/utilisateurs",
    LIVRAISONS: "/stats/livraisons",
    FINANCIER: "/stats/financier",
    PRESTATIONS: "/stats/prestations",
    PERFORMANCE: "/stats/performance",
    EXPORT_DATAMINING: "/stats/export/datamining",
    RAPPORT_COMPLET: "/stats/rapport/complet",
    TOP_CLIENTS_FIDELES: "/stats/top/clients-fideles",
    TOP_PRESTATIONS_DEMANDEES: "/stats/top/prestations-demandees",
    TOP_LIVREURS: "/stats/top/livreurs",
    TOP_COMMERCANTS: "/stats/top/commercants",
    ANALYSE_CA: "/stats/analyse/chiffre-affaires",
    ANALYSE_CROISSANCE: "/stats/analyse/croissance",
    ANALYSE_SATISFACTION: "/stats/analyse/satisfaction",
    ANALYSE_GEOGRAPHIQUE: "/stats/analyse/geographique",
    DIAGRAMMES_UTILISATEURS: "/stats/diagrammes/utilisateurs",
    DIAGRAMMES_PRESTATIONS: "/stats/diagrammes/prestations",
    DIAGRAMMES_LIVRAISONS: "/stats/diagrammes/livraisons",
    DIAGRAMMES_FINANCIER: "/stats/diagrammes/financier",
    PERIODE_MENSUELLE: "/stats/periode/mensuelle",
    PERIODE_ANNUELLE: "/stats/periode/annuelle",
    PERIODE_PERSONNALISEE: "/stats/periode/personnalisee",
    KPIS_PRINCIPAUX: "/stats/kpis/principaux",
    INDICATEURS_PERFORMANCE: "/stats/indicateurs/performance",
    INDICATEURS_QUALITE: "/stats/indicateurs/qualite",
    EXPORT_CSV: "/stats/export/csv",
    EXPORT_EXCEL: "/stats/export/excel",
    EXPORT_PDF: "/stats/export/pdf",
};
exports.STATS_ROUTES_PARAMS = {
    COMMON: {
        dateDebut: "Date de début (YYYY-MM-DD)",
        dateFin: "Date de fin (YYYY-MM-DD)",
        periode: "Période (jour|semaine|mois|annee)",
        format: "Format de sortie (json|csv|excel|pdf)",
        limite: "Nombre maximum de résultats",
    },
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
};
exports.STATS_ROUTES_EXAMPLES = {
    DASHBOARD_ADMIN: "/stats/dashboard?type=admin&periode=mois",
    DASHBOARD_CLIENT: "/stats/dashboard?type=client&utilisateurId=123",
    TOP_CLIENTS: "/stats/top/clients-fideles?limite=5&periode=annee",
    TOP_PRESTATIONS: "/stats/top/prestations-demandees?limite=5&dateDebut=2024-01-01",
    EXPORT_COMPLET: "/stats/export/datamining?format=json&periode=annee",
    RAPPORT_PDF: "/stats/rapport/complet?format=pdf&dateDebut=2024-01-01&dateFin=2024-12-31",
    ANALYSE_CA_MENSUEL: "/stats/analyse/chiffre-affaires?periode=mois&typeCA=commissions",
    SATISFACTION_PRESTATIONS: "/stats/analyse/satisfaction?type=prestations&note=4",
    DIAGRAMMES_USERS: "/stats/diagrammes/utilisateurs?format=json&periode=annee",
    DIAGRAMMES_PRESTA: "/stats/diagrammes/prestations?format=json&limite=10",
};
//# sourceMappingURL=stats.routes.js.map