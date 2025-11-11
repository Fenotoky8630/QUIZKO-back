import React, { useState, useMemo } from "react";
import { usePage } from "@inertiajs/react";

export default function PresenceList() {
  const { presences, stats, last_update } = usePage().props;
  const [selectedInterview, setSelectedInterview] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Extraire la liste unique des interviews
  const interviews = useMemo(() => {
    const uniqueInterviews = presences?.reduce((acc, presence) => {
      if (presence.interview_title && presence.interview_title !== 'Entretien non spécifié') {
        acc[presence.interview_title] = true;
      }
      return acc;
    }, {});

    return Object.keys(uniqueInterviews || {}).sort();
  }, [presences]);

  // Filtrer les présences
  const filteredPresences = useMemo(() => {
    if (!presences) return [];

    return presences.filter(presence => {
      // Filtre par interview
      const interviewMatch = selectedInterview === "all" || 
                            presence.interview_title === selectedInterview;
      
      // Filtre par statut
      const statusMatch = statusFilter === "all" || 
                         presence.status === statusFilter;

      return interviewMatch && statusMatch;
    });
  }, [presences, selectedInterview, statusFilter]);

  // Recalculer les statistiques pour les données filtrées
  const filteredStats = useMemo(() => {
    return {
      total: filteredPresences.length,
      present: filteredPresences.filter(p => p.status === 'present').length,
      absent: filteredPresences.filter(p => p.status === 'absent').length,
      unknown: filteredPresences.filter(p => !p.status || p.status === 'unknown').length,
    };
  }, [filteredPresences]);

  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case "present":
        return {
          color: "bg-green-100 text-green-800 border-green-200",
          icon: "✅",
          text: "Présent"
        };
      case "absent":
        return {
          color: "bg-red-100 text-red-800 border-red-200",
          icon: "❌", 
          text: "Absent"
        };
      case "pending":
        return {
          color: "bg-yellow-100 text-yellow-800 border-yellow-200",
          icon: "⏳",
          text: "En attente"
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800 border-gray-200",
          icon: "❓",
          text: "Non défini"
        };
    }
  };

  const formatScannedAt = (scannedAt, scannedAtFormatted) => {
    if (!scannedAt) {
      return (
        <span className="text-gray-400 italic">Non scanné</span>
      );
    }
    
    const displayDate = scannedAtFormatted || scannedAt;
    
    return (
      <div className="flex flex-col">
        <span className="text-gray-900 font-medium">{displayDate}</span>
        {scannedAtFormatted && scannedAt !== scannedAtFormatted && (
          <span className="text-xs text-gray-500 mt-1">({scannedAt})</span>
        )}
      </div>
    );
  };

  const resetFilters = () => {
    setSelectedInterview("all");
    setStatusFilter("all");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
       
       
       
        {/* Filtres */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Liste des Présences</h2>
            <button
              onClick={resetFilters}
              className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Réinitialiser les filtres
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Filtre par interview */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📊 Filtrer par entretien
              </label>
              <select
                value={selectedInterview}
                onChange={(e) => setSelectedInterview(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Tous les entretiens</option>
                {interviews.map((interview, index) => (
                  <option key={index} value={interview}>
                    {interview}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtre par statut */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🏷️ Filtrer par statut
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Tous les statuts</option>
                <option value="present">Présent</option>
                <option value="absent">Absent</option>
                <option value="pending">En attente</option>
              </select>
            </div>
          </div>

          {/* Indicateurs de filtres actifs */}
          {(selectedInterview !== "all" || statusFilter !== "all") && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                🔍 Filtres actifs: 
                {selectedInterview !== "all" && ` Entretien: "${selectedInterview}"`}
                {selectedInterview !== "all" && statusFilter !== "all" && " • "}
                {statusFilter !== "all" && ` Statut: "${statusFilter}"`}
                {" • "}
                {filteredStats.total} résultat(s) sur {stats?.total || 0}
              </p>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg mr-4">
                <span className="text-xl sm:text-2xl">👥</span>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Total</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-800">
                  {filteredStats.total || 0}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg mr-4">
                <span className="text-xl sm:text-2xl">✅</span>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Présents</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-800">
                  {filteredStats.present || 0}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-lg mr-4">
                <span className="text-xl sm:text-2xl">❌</span>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Absents</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-800">
                  {filteredStats.absent || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-gray-100 rounded-lg mr-4">
                <span className="text-xl sm:text-2xl">❓</span>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Non définis</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-800">
                  {filteredStats.unknown || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden border border-gray-200">
          {/* Table Header */}
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-indigo-600">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <h2 className="text-lg sm:text-xl font-semibold text-white">
                Détails des présences
                {(selectedInterview !== "all" || statusFilter !== "all") && (
                  <span className="text-blue-200 text-sm ml-2">
                    (filtré)
                  </span>
                )}
              </h2>
              <div className="flex items-center gap-2">
                <div className="bg-blue-500 px-3 py-1 rounded-full">
                  <span className="text-white text-sm font-medium">
                    {filteredStats.total || 0} enregistrement(s)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="py-3 px-4 sm:px-6 text-left font-semibold text-gray-700 text-xs sm:text-sm uppercase tracking-wider whitespace-nowrap">
                    Candidat
                  </th>
                  <th className="py-3 px-4 sm:px-6 text-left font-semibold text-gray-700 text-xs sm:text-sm uppercase tracking-wider whitespace-nowrap">
                    Entretien
                  </th>
                  <th className="py-3 px-4 sm:px-6 text-left font-semibold text-gray-700 text-xs sm:text-sm uppercase tracking-wider whitespace-nowrap">
                    Scanné le
                  </th>
                  <th className="py-3 px-4 sm:px-6 text-left font-semibold text-gray-700 text-xs sm:text-sm uppercase tracking-wider whitespace-nowrap">
                    Scanné par
                  </th>
                  <th className="py-3 px-4 sm:px-6 text-left font-semibold text-gray-700 text-xs sm:text-sm uppercase tracking-wider whitespace-nowrap">
                    Statut
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPresences && filteredPresences.length > 0 ? (
                  filteredPresences.map((p) => {
                    const statusConfig = getStatusConfig(p.status);
                    return (
                      <tr 
                        key={p.id} 
                        className="transition-all duration-200 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4 sm:px-6">
                          <div>
                            <p className="font-medium text-gray-900 text-sm sm:text-base">
                              {p.candidate_name}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              ID: {p.id}
                            </p>
                          </div>
                        </td>
                        <td className="py-3 px-4 sm:px-6">
                          <p className="text-gray-700 text-sm sm:text-base">
                            {p.interview_title}
                          </p>
                        </td>
                        <td className="py-3 px-4 sm:px-6">
                          {formatScannedAt(p.scanned_at, p.scanned_at_formatted)}
                        </td>
                        <td className="py-3 px-4 sm:px-6">
                          <span className="text-gray-700 text-sm sm:text-base">
                            {p.scanned_by}
                          </span>
                        </td>
                        <td className="py-3 px-4 sm:px-6">
                          <span className={`inline-flex items-center px-3 py-2 rounded-full text-xs font-medium border ${statusConfig.color}`}>
                            <span className="mr-2">{statusConfig.icon}</span>
                            {p.status_display || statusConfig.text}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td className="py-12 px-6 text-center" colSpan="5">
                      <div className="flex flex-col items-center justify-center py-8">
                        <div className="text-5xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Aucun résultat trouvé
                        </h3>
                        <p className="text-gray-500 max-w-md mb-4">
                          {selectedInterview !== "all" || statusFilter !== "all" 
                            ? "Aucune présence ne correspond aux filtres sélectionnés."
                            : "Aucune présence enregistrée pour le moment."
                          }
                        </p>
                        {(selectedInterview !== "all" || statusFilter !== "all") && (
                          <button
                            onClick={resetFilters}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Réinitialiser les filtres
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          {filteredPresences && filteredPresences.length > 0 && (
            <div className="px-4 sm:px-6 py-3 border-t border-gray-200 bg-gray-50">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs sm:text-sm text-gray-600">
                <div className="flex items-center gap-4">
                  <span>
                    Affichage de <strong>{filteredStats.total || 0}</strong> présence(s)
                    {filteredStats.total !== stats?.total && (
                      <span className="text-blue-600 ml-1">
                        (sur {stats?.total || 0} au total)
                      </span>
                    )}
                  </span>
                  <div className="hidden sm:flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Présent: {filteredStats.present || 0}</span>
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>Absent: {filteredStats.absent || 0}</span>
                  </div>
                </div>
                <span>Dernière mise à jour : {last_update}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}