export default async function handler(req, res) {
  try {
    // --- CHANGEMENT ICI ---
    // Ancienne URL (qui donne 404) : https://portail-api.montpellier3m.fr/wastecontainer?limit=500
    // Nouvelle URL (Standard FIWARE) :
    const url = 'https://portail-api.montpellier3m.fr/ngsi-ld/v1/entities?type=WasteContainer&limit=100';
    
    const response = await fetch(url);

    if (!response.ok) {
      // On inclut l'URL dans l'erreur pour mieux comprendre si ça recasse
      throw new Error(`Erreur API (${response.status}) sur ${url}`);
    }

    const data = await response.json();

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
    res.status(200).json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ 
        error: 'Impossible de récupérer les données', 
        details: error.message 
    });
  }
}
