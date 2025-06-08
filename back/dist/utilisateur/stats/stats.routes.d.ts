export declare const STATS_ROUTES: {
    readonly BASE: "/stats";
    readonly DASHBOARD: "/stats/dashboard";
    readonly HEALTH: "/stats/health";
    readonly TEST: "/stats/test";
    readonly UTILISATEURS: "/stats/utilisateurs";
    readonly LIVRAISONS: "/stats/livraisons";
    readonly FINANCIER: "/stats/financier";
    readonly PRESTATIONS: "/stats/prestations";
    readonly PERFORMANCE: "/stats/performance";
    readonly EXPORT_DATAMINING: "/stats/export/datamining";
    readonly RAPPORT_COMPLET: "/stats/rapport/complet";
    readonly TOP_CLIENTS_FIDELES: "/stats/top/clients-fideles";
    readonly TOP_PRESTATIONS_DEMANDEES: "/stats/top/prestations-demandees";
    readonly TOP_LIVREURS: "/stats/top/livreurs";
    readonly TOP_COMMERCANTS: "/stats/top/commercants";
    readonly ANALYSE_CA: "/stats/analyse/chiffre-affaires";
    readonly ANALYSE_CROISSANCE: "/stats/analyse/croissance";
    readonly ANALYSE_SATISFACTION: "/stats/analyse/satisfaction";
    readonly ANALYSE_GEOGRAPHIQUE: "/stats/analyse/geographique";
    readonly DIAGRAMMES_UTILISATEURS: "/stats/diagrammes/utilisateurs";
    readonly DIAGRAMMES_PRESTATIONS: "/stats/diagrammes/prestations";
    readonly DIAGRAMMES_LIVRAISONS: "/stats/diagrammes/livraisons";
    readonly DIAGRAMMES_FINANCIER: "/stats/diagrammes/financier";
    readonly PERIODE_MENSUELLE: "/stats/periode/mensuelle";
    readonly PERIODE_ANNUELLE: "/stats/periode/annuelle";
    readonly PERIODE_PERSONNALISEE: "/stats/periode/personnalisee";
    readonly KPIS_PRINCIPAUX: "/stats/kpis/principaux";
    readonly INDICATEURS_PERFORMANCE: "/stats/indicateurs/performance";
    readonly INDICATEURS_QUALITE: "/stats/indicateurs/qualite";
    readonly EXPORT_CSV: "/stats/export/csv";
    readonly EXPORT_EXCEL: "/stats/export/excel";
    readonly EXPORT_PDF: "/stats/export/pdf";
};
export type StatsRoute = (typeof STATS_ROUTES)[keyof typeof STATS_ROUTES];
export declare const STATS_ROUTES_PARAMS: {
    readonly COMMON: {
        readonly dateDebut: "Date de début (YYYY-MM-DD)";
        readonly dateFin: "Date de fin (YYYY-MM-DD)";
        readonly periode: "Période (jour|semaine|mois|annee)";
        readonly format: "Format de sortie (json|csv|excel|pdf)";
        readonly limite: "Nombre maximum de résultats";
    };
    readonly DASHBOARD: {
        readonly type: "Type de dashboard (admin|client|livreur|commercant)";
        readonly utilisateurId: "ID utilisateur pour dashboard personnalisé";
    };
    readonly UTILISATEURS: {
        readonly type: "Type utilisateur (client|livreur|commercant|prestataire)";
        readonly statut: "Statut (actif|inactif|suspendu)";
        readonly ville: "Filtrer par ville";
    };
    readonly LIVRAISONS: {
        readonly statut: "Statut livraison (en_cours|livree|annulee)";
        readonly type: "Type livraison (express|standard|programmee)";
        readonly livreurId: "ID du livreur";
    };
    readonly FINANCIER: {
        readonly typeCA: "Type CA (commissions|abonnements|prestations)";
        readonly devise: "Devise (EUR|USD)";
        readonly tva: "Inclure TVA (true|false)";
    };
    readonly PRESTATIONS: {
        readonly typePrestation: "Type prestation (transport|courses|garde)";
        readonly prestataireId: "ID du prestataire";
        readonly note: "Note minimum (1-5)";
    };
};
export declare const STATS_ROUTES_EXAMPLES: {
    readonly DASHBOARD_ADMIN: "/stats/dashboard?type=admin&periode=mois";
    readonly DASHBOARD_CLIENT: "/stats/dashboard?type=client&utilisateurId=123";
    readonly TOP_CLIENTS: "/stats/top/clients-fideles?limite=5&periode=annee";
    readonly TOP_PRESTATIONS: "/stats/top/prestations-demandees?limite=5&dateDebut=2024-01-01";
    readonly EXPORT_COMPLET: "/stats/export/datamining?format=json&periode=annee";
    readonly RAPPORT_PDF: "/stats/rapport/complet?format=pdf&dateDebut=2024-01-01&dateFin=2024-12-31";
    readonly ANALYSE_CA_MENSUEL: "/stats/analyse/chiffre-affaires?periode=mois&typeCA=commissions";
    readonly SATISFACTION_PRESTATIONS: "/stats/analyse/satisfaction?type=prestations&note=4";
    readonly DIAGRAMMES_USERS: "/stats/diagrammes/utilisateurs?format=json&periode=annee";
    readonly DIAGRAMMES_PRESTA: "/stats/diagrammes/prestations?format=json&limite=10";
};
