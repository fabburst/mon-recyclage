export default async function handler(req, res) {
  try {
    // CORRECTION ICI : Ajout de "-data" dans l'URL et limite à 500 points
    const response = await fetch('https://portail-api-data.montpellier3m.fr/wastecontainer?limit=500');
    
    if (!response.ok) {
      throw new Error(`Erreur API Montpellier (${response.status})`);
    }

    const data = await response.json();

    // Cache de 5 minutes pour la performance
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
    
    // On renvoie les données au front
    res.status(200).json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur', details: error.message });
  }
}
