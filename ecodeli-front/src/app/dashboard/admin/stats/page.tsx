'use client';

import { useEffect, useState } from 'react';
import {
  PieChart, Pie, Cell,
  BarChart, Bar,
  XAxis, YAxis, Tooltip,
  ResponsiveContainer,
  LineChart, Line, CartesianGrid
} from 'recharts';
// @ts-ignore
import jsPDF from 'jspdf';
// @ts-ignore
import autoTable from 'jspdf-autotable';
import Link from 'next/link';

const COLORS = ['#0070C0', '#00C49F', '#FFBB28', '#FF8042', '#A020F0', '#FF6666'];

export default function StatistiquesPage() {
  const [stats, setStats] = useState<any>(null);
  const [filtreType, setFiltreType] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');

  useEffect(() => {
    const query = new URLSearchParams();
    if (filtreType) query.append('type', filtreType);
    if (dateDebut) query.append('from', dateDebut);
    if (dateFin) query.append('to', dateFin);

fetch(`http://localhost:3001/stats/dashboard?${query.toString()}`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => setStats(data));
  }, [filtreType, dateDebut, dateFin]);

  const exportPDF = () => {
    if (!stats) return;
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Statistiques globales EcoDeli', 14, 22);
 
    const rows = [
      ['Total Annonces', stats.totalAnnonces],
      ['Total Prestataires', stats.totalPrestataires],
      ['Total Produits', stats.totalProduits],
      ['Total Livraisons', stats.totalLivraisons],
      ['Total Colis', stats.totalColis],
      ['Total Stockages', stats.totalStokages],
      ['Total Commandes', stats.totalCommandes],
      ['Total Documents', stats.totalDocuments],
      ['Total Notifications', stats.totalNotifications]
    ];

    autoTable(doc, {
      startY: 30,
      head: [['Indicateur', 'Valeur']],
      body: rows
    });

    doc.save('stats-ecodeli.pdf');
  };

  if (!stats) return <p className="text-center p-10 text-white">Chargement des statistiques...</p>;

  return (
    <div className="min-h-screen bg-[#0F172A] text-white px-6 py-10 space-y-12">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-blue-400">Statistiques globales EcoDeli</h1>
        <div className="flex items-center gap-4">
          <Link href="/dashboard/admin/datamining" className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white">En savoir plus</Link>
          <button onClick={exportPDF} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white">Exporter PDF</button>
        </div>
      </div>

      {/* Filtres dynamiques */}
      <div className="flex flex-wrap gap-4 items-center justify-start mb-10">
        <label className="text-white">Type :</label>
        <select value={filtreType} onChange={(e) => setFiltreType(e.target.value)} className="text-black p-2 rounded">
          <option value="">Tous</option>
          <option value="client">Client</option>
          <option value="livreur">Livreur</option>
          <option value="prestataire">Prestataire</option>
          <option value="commercant">Commerçant</option>
        </select>

        <label className="text-white">Du :</label>
        <input type="date" value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} className="text-black p-2 rounded" />

        <label className="text-white">Au :</label>
        <input type="date" value={dateFin} onChange={(e) => setDateFin(e.target.value)} className="text-black p-2 rounded" />
      </div>

      {/* Statistiques globales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Annonces publiées" value={stats.totalAnnonces} />
        <StatCard title="Prestataires enregistrés" value={stats.totalPrestataires} />
        <StatCard title="Produits en vente" value={stats.totalProduits} />
        <StatCard title="Livraisons" value={stats.totalLivraisons} />
        <StatCard title="Colis" value={stats.totalColis} />
        <StatCard title="Stockages" value={stats.totalStokages} />
        <StatCard title="Commandes" value={stats.totalCommandes} />
        <StatCard title="Documents soumis" value={stats.totalDocuments} />
        <StatCard title="Notifications envoyées" value={stats.totalNotifications} />
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <div className="bg-white text-black p-4 rounded-xl shadow-xl">
          <h2 className="text-lg font-bold mb-4">Répartition des utilisateurs</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={stats.utilisateursParType || []} dataKey="total" nameKey="type" outerRadius={100} label>
                {(stats.utilisateursParType || []).map((_: any, index: number) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white text-black p-4 rounded-xl shadow-xl">
          <h2 className="text-lg font-bold mb-4">Top 5 utilisateurs actifs</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.topUtilisateurs || []}>
              <XAxis dataKey="nom" stroke="#333" />
              <YAxis stroke="#333" />
              <Tooltip />
              <Bar dataKey="nbConnexions" fill="#0070C0" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white text-black p-4 rounded-xl shadow-xl col-span-1 md:col-span-2">
          <h2 className="text-lg font-bold mb-4">Évolution des inscriptions</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.timelineInscriptions || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mois" stroke="#333" />
              <YAxis stroke="#333" />
              <Tooltip />
              <Line type="monotone" dataKey="total" stroke="#FF8042" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string, value: number }) {
  return (
    <div className="bg-white text-black rounded-xl shadow-lg p-5 text-center">
      <h3 className="text-md font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-3xl font-bold text-blue-700">{value}</p>
    </div>
  );
}
